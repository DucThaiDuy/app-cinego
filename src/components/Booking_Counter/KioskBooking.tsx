// KioskBooking.tsx
import { useMemo, useState, useCallback, useEffect } from "react";

import "./KioskBooking.scss";
import type { MovieResponse } from "../../api/types/model/movie.model";
import { adminmovieService } from "../../api/service/movie.service";
import type { User } from "../../api/types/model/User.model";
import { adminUserService } from "../../api/service/user.service";
import { adminBookingService } from "../../api/service/booking.service";
import { adminShowTimeService } from "../../api/service/showTime.service";
import { adminHallService } from "../../api/service/hall.service";
import type { BookingRequest } from "../../api/types/request/BookingRequest";
import type { ShowTimeResponse } from "../../api/types/response/ShowTimeResponse";
import type { HallResponse } from "../../api/types/response/HallResponse";
import { BookingStatus } from "../../api/types/enum/BookingStatus";
import { PaymentMethod } from "../../api/types/enum/PaymentMethod";
import { BookingConfirmModal } from "./BookingConfirmModal";

type Seat = {
  id: number;
  row: string;
  number: number;
  status: "available" | "booked" | "selected";
  price: number;
};

// type Movie = {
//   id: number;
//   title: string;
//   poster: string;
//   duration: number;
//   screen: string;
// };

export default function KioskBooking() {
  const [movies, setMovies] = useState<MovieResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<MovieResponse | null>(
    null,
  );

  // const [selectedMovie, setSelectedMovie] = useState<Movie>(movieList[0]);
  const [showtimes, setShowtimes] = useState<ShowTimeResponse[]>([]);
  const [availableDates, setAvailableDates] = useState<
    Array<{ date: string; display: string }>
  >([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedShowtime, setSelectedShowtime] =
    useState<ShowTimeResponse | null>(null);
  const [hall, setHall] = useState<HallResponse | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  // NEW STATES FOR CONFIRM MODAL
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<User | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Load movies
  const loadMovies = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminmovieService.fetchMovies({
        page: currentPage,
        limit: itemsPerPage,
      });

      if (!data) return;

      setMovies(data.items);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err: any) {
      console.error("Load movies error:", err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  // Load showtimes by movie ID
  const loadShowtimes = useCallback(async (movieId: number) => {
    console.log("loadShowtimes called with movieId:", movieId);
    try {
      console.log("Making API call to getByMovieId...");
      const data = await adminShowTimeService.getByMovieId(movieId, {
        page: 1,
        limit: 100,
      });

      console.log("API ShowTimes Response:", data); // Debug

      if (!data || !data.items) {
        console.warn("No showtimes data returned");
        return;
      }

      console.log("Setting showtimes:", data.items);
      setShowtimes(data.items);

      // Extract unique dates from showtimes
      const dateSet = new Set<string>();
      const datesWithDisplay: Array<{ date: string; display: string }> = [];

      data.items.forEach((showtime: ShowTimeResponse) => {
        const sDate = showtime.date;
        if (sDate && !dateSet.has(sDate)) {
          dateSet.add(sDate);
          const date = new Date(sDate + "T00:00:00");
          datesWithDisplay.push({
            date: sDate,
            display: date.toLocaleDateString("vi-VN", {
              weekday: "short",
              day: "numeric",
              month: "numeric",
            }),
          });
        }
      });

      // Sort dates
      datesWithDisplay.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      setAvailableDates(datesWithDisplay);

      // Set first available date as default
      if (datesWithDisplay.length > 0) {
        setSelectedDate(datesWithDisplay[0].date);
        const firstShowtime = data.items.find(
          (st: ShowTimeResponse) => st.date === datesWithDisplay[0].date,
        );
        setSelectedShowtime(firstShowtime || null);
      }
    } catch (err: any) {
      console.error("Load showtimes error:", err.message);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    if (movies.length > 0 && !selectedMovie) {
      setSelectedMovie(movies[0]);
    }
  }, [movies, selectedMovie]);

  // Load showtimes when selected movie changes
  useEffect(() => {
    if (selectedMovie?.id) {
      loadShowtimes(Number(selectedMovie.id));
      setSelectedSeats([]);
    }
  }, [selectedMovie, loadShowtimes]);

  // Load seats when selected showtime changes
  useEffect(() => {
    const loadSeatsAndLayout = async () => {
      const hId = selectedShowtime?.hallId;
      const sId = selectedShowtime?.id;

      if (!sId || !hId) {
        console.warn("Missing showtimeId or hallId:", { sId, hId, selectedShowtime });
        return;
      }

      console.log(`Fetching Hall ${hId} and Seats for Showtime ${sId}...`);
      try {
        const [hallData, availabilityData] = await Promise.all([
          adminHallService.getById(hId),
          adminShowTimeService.getSeats(sId),
        ]);

        console.log("Hall Data:", hallData);
        console.log("Availability Data:", availabilityData);

        setHall(hallData);

        // Merge Hall Layout with Availability using pure camelCase
        const mappedSeats: Seat[] = availabilityData.map((s) => {
          return {
            id: s.id,
            row: s.rowName,
            number: s.seatNumber,
            status: s.isBooked ? "booked" : "available",
            price: s.basePrice,
          };
        });

        setSeats(mappedSeats);
      } catch (err) {
        console.error("Load seats/layout error:", err);
      }
    };

    loadSeatsAndLayout();
    setSelectedSeats([]);
  }, [selectedShowtime]);

  const availableSeats = useMemo(
    () => seats.filter((s) => s.status === "available").length,
    [seats],
  );
  const bookedSeats = useMemo(
    () => seats.filter((s) => s.status === "booked").length,
    [seats],
  );
  const totalSeats = seats.length;

  const formattedSeats = useMemo(() => {
    const rows = Array.from(new Set(seats.map((s) => s.row))).sort();
    return rows.map((row) => ({
      row,
      rowSeats: seats
        .filter((seat) => seat.row === row)
        .sort((a, b) => a.number - b.number),
    }));
  }, [seats]);

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;
    if (seat.status === "selected") {
      setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id));
      setSeats((prev) =>
        prev.map((s) => (s.id === seat.id ? { ...s, status: "available" } : s)),
      );
    } else {
      setSelectedSeats((prev) => [...prev, { ...seat, status: "selected" }]);
      setSeats((prev) =>
        prev.map((s) => (s.id === seat.id ? { ...s, status: "selected" } : s)),
      );
    }
  };

  const totalPrice = useMemo(
    () => selectedSeats.reduce((sum, s) => sum + s.price, 0),
    [selectedSeats],
  );

  const clearSelection = () => {
    setSelectedSeats([]);
    setSeats((prev) =>
      prev.map((seat) =>
        seat.status === "selected" ? { ...seat, status: "available" } : seat,
      ),
    );
  };
  const confirmBooking = () => {
    if (!selectedSeats.length) return;
    setShowConfirmModal(true);
  };

  const handleFinalizeBooking = async (
    customer: User | null,
    paymentMethodModal: "cash" | "vnpay" | "card",
    printTicket: boolean,
    emailTicket: boolean,
    emailAddress: string,
    comboPrice: number,
  ) => {
    if (!selectedSeats.length || !selectedMovie) return;

    // Nếu khách đưa tiền hoặc không chọn khách, mình vẫn có thể bán vé vãng lai. Nhưng theo logic hiện tại, đòi hỏi phải có user.
    if (!customer) {
      alert("Vui lòng chọn khách hàng!");
      return;
    }

    setBookingLoading(true);
    try {
      // Use actual showtime ID from API instead of mock
      const showtimeId = selectedShowtime?.id;
      if (!showtimeId) {
        alert("Vui lòng chọn suất chiếu!");
        setBookingLoading(false);
        return;
      }

      // Xử lý payment method theo enum
      const pmEnum =
        paymentMethodModal === "vnpay"
          ? PaymentMethod.VNPAY
          : paymentMethodModal === "card"
            ? PaymentMethod.BANK_TRANSFER
            : PaymentMethod.CASH;

      const discountAmt =
        customer.totalPoints && customer.totalPoints > 0
          ? (totalPrice + comboPrice) * 0.1
          : 0;

      const bookingData: BookingRequest = {
        userId: customer.id!,
        showtimeId: showtimeId,
        ticketPrice: totalPrice,
        comboPrice: comboPrice,
        discountAmount: discountAmt,
        pointsUsed: 0,
        totalAmount: totalPrice + comboPrice - discountAmt,
        status: BookingStatus.PAID,
        paymentMethod: pmEnum,
        seats: selectedSeats.map((s) => ({
          seatId: s.id,
          price: s.price,
        })),
      };

      const result = await adminBookingService.add(bookingData);

      alert(
        `Bán vé thành công! Mã booking: ${result.bookingCode || "SUCCESS"}\nKhách: ${customer.fullName}\n${selectedSeats.length} ghế - ${totalPrice.toLocaleString()}đ\nTiền đồ ăn: ${comboPrice.toLocaleString()}đ\n\nIn vé: ${printTicket ? "Có" : "Không"} | Email: ${emailTicket ? emailAddress : "Không"}`,
      );

      clearSelection();
      setSelectedCustomer(null);
      setShowConfirmModal(false);
    } catch (error: any) {
      console.error("Lỗi tạo booking:", error);
      const apiErrorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
      alert(
        "Lỗi khi xác nhận bán vé: " +
          (apiErrorMessage || "Kiểm tra Console / Network")
      );
      if (error.response?.data) {
        console.log("Chi tiết lỗi từ Server:", error.response.data);
      }
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="kiosk-booking">
      <header className="top-navbar">
        <div className="brand">CineGo</div>
        <div className="search-box">
          <input placeholder="Tìm phim..." />
        </div>
        <div className="pos-title">Bán vé tại quầy</div>
        <div className="clock">{new Date().toLocaleTimeString()}</div>
      </header>

      <div className="layout-grid">
        <aside className="left-panel">
          <h3>Đang chiếu</h3>
          <div className="movie-list">
            {movies.map((movie) => (
              <button
                key={movie.id}
                className={
                  selectedMovie?.id === movie.id
                    ? "movie-item active"
                    : "movie-item"
                }
                onClick={() => {
                  console.log("Movie clicked:", movie);
                  console.log("Movie id:", movie.id);
                  setSelectedMovie(movie);
                }}
              >
                <img src={movie.posterUrl} alt={movie.title} />
                <span>{movie.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="center-panel">
          <div className="movie-header">
            <div className="movie-title">{selectedMovie?.title}</div>
            <div className="movie-sub">
              {selectedMovie?.rating}⭐ • {selectedMovie?.durationMinutes} phút
            </div>
          </div>

          <div className="date-select">
            <h4>Chọn ngày chiếu</h4>
            <div className="date-buttons">
              {availableDates.map((dateInfo) => (
                <button
                  key={dateInfo.date}
                  onClick={() => {
                    setSelectedDate(dateInfo.date);
                    const firstShowtime = showtimes.find((st) => st.date === dateInfo.date);
                    setSelectedShowtime(firstShowtime || null);
                    clearSelection();
                  }}
                  className={selectedDate === dateInfo.date ? "date-btn active" : "date-btn"}
                >
                  {dateInfo.display}
                </button>
              ))}
            </div>
          </div>

          <div className="time-select">
            <h4>Chọn suất chiếu</h4>
            <div className="time-select-container">
              {showtimes
                .filter((st: ShowTimeResponse) => st.date === selectedDate)
                .sort((a: ShowTimeResponse, b: ShowTimeResponse) =>
                  (a.time || "").localeCompare(b.time || ""),
                )
                .map((showtime: ShowTimeResponse) => (
                  <button
                    key={showtime.id}
                    onClick={() => {
                      setSelectedShowtime(showtime);
                      setSelectedSeats([]);
                    }}
                    className={
                      selectedShowtime?.id === showtime.id
                        ? "stime active"
                        : "stime"
                    }
                  >
                    {showtime.time}
                  </button>
                ))}
            </div>
          </div>

          <div className="screen-wrapper">
            <div className="screen-bar">MÀN HÌNH</div>
            <div className="screen-glow"></div>
          </div>
          <div className="legend">
            <span>
              <b className="legend-dot available" /> Trống: {availableSeats}
            </span>
            <span>
              <b className="legend-dot selected" /> Đã chọn:{" "}
              {selectedSeats.length}
            </span>
            <span>
              <b className="legend-dot booked" /> Đã bán: {bookedSeats}
            </span>
            <span className="legend-total">Tổng: {totalSeats} ghế</span>
          </div>

          <div className="seat-map" role="grid">
            {formattedSeats.map(({ row, rowSeats }) => (
              <div className="row" key={row}>
                <div className="row-label">{row}</div>
                <div className="seats">
                  {rowSeats.map((seat) => (
                    <button
                      key={seat.id}
                      className={`seat ${seat.status}`}
                      onClick={() => toggleSeat(seat)}
                      disabled={seat.status === "booked"}
                      title={`Ghế: ${seat.row}${seat.number}\nGiá: ${seat.price.toLocaleString()}đ`}
                    >
                      {seat.number}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="right-panel">
          <div className="cart-title">
            <span>Giỏ hàng</span>
            <span className="cart-count">{selectedSeats.length || 0}</span>
          </div>
          <div className="cart-info">
            <p>
              <span>Phim:</span> {selectedMovie?.title}
            </p>
            <p>
              <span>Phòng:</span> {selectedShowtime?.hallName || "Chưa chọn"}
            </p>
            <p>
              <span>Suất:</span>{" "}
              {(() => {
                const stTime = selectedShowtime?.time;
                return selectedDate && stTime
                  ? `${new Date(selectedDate).toLocaleDateString("vi-VN")} - ${stTime}`
                  : "Chưa chọn";
              })()}
            </p>
            <p>
              <span>Thời lượng:</span> {selectedMovie?.durationMinutes} phút
            </p>
            <p>
              <span>Ghế:</span>{" "}
              {selectedSeats.length
                ? selectedSeats.map((s) => s.id).join(", ")
                : "Chưa chọn"}
            </p>
            <p>
              <span>Đơn giá (TB):</span>{" "}
              {selectedSeats.length
                ? (totalPrice / selectedSeats.length).toLocaleString()
                : 0}{" "}
              đ
            </p>
            <p className="total">
              <span>Tổng tiền:</span> {totalPrice.toLocaleString()} đ
            </p>
          </div>

          <div className="cart-actions">
            <button className="btn-clear" onClick={clearSelection}>
              Xóa chọn
            </button>
            <button
              className="btn-confirm"
              onClick={confirmBooking}
              disabled={!selectedSeats.length}
            >
              Xác nhận bán vé
            </button>
          </div>
        </aside>
      </div>

      <BookingConfirmModal
        visible={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={handleFinalizeBooking}
        movieInfo={{
          title: selectedMovie?.title || "Phim",
          showtime: selectedShowtime?.time
            ? `${new Date(selectedDate).toLocaleDateString("vi-VN")} - ${selectedShowtime.time}`
            : "Chưa chọn",
          room: selectedShowtime?.hallName || "Chưa chọn",
          seats: selectedSeats.map((s) => `${s.row}${s.number}`),
          totalPrice: totalPrice,
          discount:
            selectedCustomer?.totalPoints && selectedCustomer.totalPoints > 0
              ? totalPrice * 0.1
              : 0,
        }}
      />

      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; 2024 CineGo. Build with Modern Web Technologies.
          </p>
        </div>
      </footer>
    </div>
  );
}
