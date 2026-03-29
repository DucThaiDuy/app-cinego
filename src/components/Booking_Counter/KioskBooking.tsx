// KioskBooking.tsx
import { useMemo, useState, useCallback, useEffect } from "react";

import "./KioskBooking.scss";
import type { MovieResponse } from "../../api/types/model/movie.model";
import { adminmovieService } from "../../api/service/movie.service";
import type { User } from "../../api/types/model/User.model";
import { adminUserService } from "../../api/service/user.service";
import { adminBookingService } from "../../api/service/booking.service";
import { adminShowTimeService } from "../../api/service/showTime.service";
import type { BookingRequest } from "../../api/types/request/BookingRequest";
import type { ShowTimeResponse } from "../../api/types/response/ShowTimeResponse";
import { BookingStatus } from "../../components/ENUM/BookingStatus.enum";
import { PaymentMethod } from "../../components/ENUM/PaymentMethod.enum";
import { BookingConfirmModal } from "./BookingConfirmModal";
type Seat = {
  id: string;
  row: string;
  number: number;
  status: "available" | "booked" | "selected";
};

// type Movie = {
//   id: number;
//   title: string;
//   poster: string;
//   duration: number;
//   screen: string;
// };

const seatingRows = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
];
const seatsPerRow = 16;
const seatPrice = 100000;

const buildSeats = (): Seat[] => {
  const list: Seat[] = [];
  seatingRows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      list.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: Math.random() < 0.12 ? "booked" : "available",
      });
    }
  });
  return list;
};

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
  const [seats, setSeats] = useState<Seat[]>(buildSeats());
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
        console.log("Processing showtime:", showtime); // Debug
        console.log("showtime.date:", showtime.date);
        console.log("showtime.date type:", typeof showtime.date);
        console.log("Boolean(showtime.date):", Boolean(showtime.date));
        console.log(
          "showtime.date === '2026-01-20':",
          showtime.date === "2026-01-20",
        );
        if (showtime.date && !dateSet.has(showtime.date)) {
          console.log("Adding date:", showtime.date);
          dateSet.add(showtime.date);
          const date = new Date(showtime.date + "T00:00:00");
          datesWithDisplay.push({
            date: showtime.date,
            display: date.toLocaleDateString("vi-VN", {
              weekday: "short",
              day: "numeric",
              month: "numeric",
            }),
          });
        } else {
          console.log(
            "Skipping date:",
            showtime.date,
            "already exists or falsy",
          );
        }
      });

      console.log("Extracted dates:", datesWithDisplay); // Debug

      // Sort dates
      datesWithDisplay.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      console.log("Setting availableDates:", datesWithDisplay);
      setAvailableDates(datesWithDisplay);

      // Set first available date as default
      if (datesWithDisplay.length > 0) {
        console.log("Setting selectedDate to:", datesWithDisplay[0].date);
        setSelectedDate(datesWithDisplay[0].date);
        // Set first showtime of that date
        const firstShowtime = data.items.find(
          (st: ShowTimeResponse) => st.date === datesWithDisplay[0].date,
        );
        setSelectedShowtime(firstShowtime || null);
        console.log("Set first showtime:", firstShowtime); // Debug
      }
    } catch (err: any) {
      console.error("Load showtimes error:", err.message);
      console.error("Full error:", err);
    }
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    if (movies.length > 0 && !selectedMovie) {
      console.log("Setting selectedMovie to:", movies[0]);
      console.log("selectedMovie id:", movies[0]?.id);
      setSelectedMovie(movies[0]);
    }
  }, [movies]);

  // Load showtimes when selected movie changes
  useEffect(() => {
    console.log("useEffect triggered - selectedMovie:", selectedMovie);
    console.log("selectedMovie?.id:", selectedMovie?.id);
    console.log("selectedMovie?.id type:", typeof selectedMovie?.id);
    console.log("Boolean(selectedMovie?.id):", Boolean(selectedMovie?.id));
    console.log("Number(selectedMovie?.id):", Number(selectedMovie?.id));
    console.log(
      "isNaN(Number(selectedMovie?.id)):",
      isNaN(Number(selectedMovie?.id)),
    );
    if (
      selectedMovie &&
      selectedMovie.id != null &&
      selectedMovie.id !== undefined &&
      !isNaN(Number(selectedMovie.id))
    ) {
      console.log("Calling loadShowtimes with movieId:", selectedMovie.id);
      loadShowtimes(Number(selectedMovie.id));
      clearSelection();
    } else {
      console.log("selectedMovie.id is invalid, not calling loadShowtimes");
    }
  }, [selectedMovie, loadShowtimes]);

  const availableSeats = useMemo(
    () => seats.filter((s) => s.status === "available").length,
    [seats],
  );
  const bookedSeats = useMemo(
    () => seats.filter((s) => s.status === "booked").length,
    [seats],
  );
  const totalSeats = seats.length;

  const formattedSeats = useMemo(
    () =>
      seatingRows.map((row) => ({
        row,
        rowSeats: seats
          .filter((seat) => seat.row === row)
          .sort((a, b) => a.number - b.number),
      })),
    [seats],
  );

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

  const totalPrice = selectedSeats.length * seatPrice;
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
        ticketPrice: seatPrice * selectedSeats.length,
        comboPrice: comboPrice,
        discountAmount: discountAmt,
        pointsUsed: 0,
        totalAmount: totalPrice + comboPrice - discountAmt,
        status: BookingStatus.PAID,
        paymentMethod: pmEnum,
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
      alert(
        "Lỗi khi xác nhận bán vé: " +
          (error.response?.data?.message ||
            error.message ||
            "Kiểm tra Console / Network"),
      );
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
            <p style={{ fontSize: "0.8rem", color: "lime" }}>
              Debug: selectedMovie.id = {selectedMovie?.id} (type:{" "}
              {typeof selectedMovie?.id})
            </p>
          </div>

          <p>
            Debug: selectedMovie ={" "}
            {selectedMovie ? selectedMovie.title : "null"}
          </p>

          <div className="date-select">
            <h4>Chọn ngày:</h4>
            <p style={{ fontSize: "0.8rem", color: "yellow" }}>
              Debug: availableDates.length = {availableDates.length}
            </p>
            {availableDates.length === 0 && (
              <p style={{ fontSize: "0.8rem", color: "red" }}>
                Chưa có ngày chiếu (đang load...)
              </p>
            )}
            <div className="date-buttons">
              {availableDates.length > 0 ? (
                availableDates.map((dateInfo, index) => (
                  <div
                    key={dateInfo.date}
                    style={{
                      margin: "5px",
                      padding: "5px",
                      border: "1px solid yellow",
                    }}
                  >
                    <button
                      onClick={() => {
                        console.log("Date clicked:", dateInfo);
                        setSelectedDate(dateInfo.date);
                        // Auto-select first showtime of this date
                        const firstShowtime = showtimes.find(
                          (st) => st.date === dateInfo.date,
                        );
                        setSelectedShowtime(firstShowtime || null);
                        clearSelection();
                      }}
                      className={
                        selectedDate === dateInfo.date
                          ? "date-btn active"
                          : "date-btn"
                      }
                    >
                      {dateInfo.display}
                    </button>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "gray",
                        marginLeft: "5px",
                      }}
                    >
                      ({dateInfo.date})
                    </span>
                  </div>
                ))
              ) : (
                <div
                  style={{ padding: "10px", background: "red", color: "white" }}
                >
                  No dates available - Check console logs
                </div>
              )}
            </div>
          </div>

          <div className="time-select">
            <h4>Chọn giờ:</h4>
            <p style={{ fontSize: "0.8rem", color: "cyan" }}>
              Debug: showtimes for {selectedDate}:{" "}
              {showtimes.filter((st) => st.date === selectedDate).length} items
            </p>
            {showtimes
              .filter((st) => st.date === selectedDate)
              .sort((a, b) => {
                const timeA = a.time || "";
                const timeB = b.time || "";
                return timeA.localeCompare(timeB);
              })
              .map((showtime) => (
                <button
                  key={showtime.id}
                  onClick={() => {
                    console.log("Time clicked:", showtime);
                    setSelectedShowtime(showtime);
                    clearSelection();
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

          <div className="screen-bar">MÀN HÌNH</div>
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
                      title={`Ghế: ${seat.id}\nGiá: ${seatPrice.toLocaleString()}đ\nLoại: Thường`}
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
              <span>Phòng:</span> {selectedShowtime?.hall_name || "Chưa chọn"}
            </p>
            <p>
              <span>Suất:</span>{" "}
              {selectedDate && selectedShowtime?.time
                ? `${new Date(selectedDate).toLocaleDateString("vi-VN")} - ${selectedShowtime.time}`
                : "Chưa chọn"}
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
              <span>Đơn giá:</span> {seatPrice.toLocaleString()} đ
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
          room: selectedShowtime?.hall_name || "Chưa chọn",
          seats: selectedSeats.map((s) => s.id),
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
            &copy; 2024 CineGo. All rights reserved. | Design by OpenAI's
            ChatGPT
          </p>
        </div>
      </footer>
    </div>
  );
}
