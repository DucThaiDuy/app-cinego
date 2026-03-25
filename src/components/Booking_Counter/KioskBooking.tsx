// KioskBooking.tsx
import { useMemo, useState } from "react";
import "./KioskBooking.scss";

type Seat = {
  id: string;
  row: string;
  number: number;
  status: "available" | "booked" | "selected";
};

type Movie = {
  id: number;
  title: string;
  poster: string;
  duration: number;
  screen: string;
};

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

const movieList: Movie[] = [
  {
    id: 1,
    title: "Godzilla x Kong: Đế Chế Mới",
    poster: "https://image.tmdb.org/t/p/w500/kUjiRzppdU6kbADoZPHf4kBkqPq.jpg",
    duration: 135,
    screen: "Phòng chiếu 4",
  },
  {
    id: 2,
    title: "Avatar: Dòng chảy của nước",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    duration: 192,
    screen: "Phòng chiếu 1",
  },
  {
    id: 3,
    title: "Dune: Hành tinh sa mạc",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    duration: 155,
    screen: "Phòng chiếu 2",
  },
  {
    id: 4,
    title: "Lật Mặt 4",
    poster: "https://image.tmdb.org/t/p/w500/vJDK7hKX8zGT8Y3sW8vYOERColf.jpg",
    duration: 110,
    screen: "Phòng chiếu 3",
  },
  {
    id: 5,
    title: "Godzilla x Kong: Đế Chế Mới",
    poster: "https://image.tmdb.org/t/p/w500/kUjiRzppdU6kbADoZPHf4kBkqPq.jpg",
    duration: 135,
    screen: "Phòng chiếu 4",
  },
  {
    id: 6,
    title: "Avatar: Dòng chảy của nước",
    poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    duration: 192,
    screen: "Phòng chiếu 1",
  },
  {
    id: 7,
    title: "Dune: Hành tinh sa mạc",
    poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    duration: 155,
    screen: "Phòng chiếu 2",
  },
  {
    id: 8,
    title: "Lật Mặt 4",
    poster: "https://image.tmdb.org/t/p/w500/vJDK7hKX8zGT8Y3sW8vYOERColf.jpg",
    duration: 110,
    screen: "Phòng chiếu 3",
  },
];

const showtimes = ["10:00", "12:30", "15:00", "17:30", "20:00", "22:30"];

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
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movieList[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<string>(
    showtimes[0],
  );
  const [seats, setSeats] = useState<Seat[]>(buildSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "vnpay" | "card">(
    "cash",
  );

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
    alert(
      `Đặt thành công ${selectedSeats.length} ghế (${selectedSeats.map((s) => s.id).join(", ")}) - ${selectedMovie.title} [${selectedShowtime}]`,
    );
    clearSelection();
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
            {movieList.map((movie) => (
              <button
                key={movie.id}
                className={
                  selectedMovie.id === movie.id
                    ? "movie-item active"
                    : "movie-item"
                }
                onClick={() => {
                  setSelectedMovie(movie);
                  setSelectedShowtime(showtimes[0]);
                  clearSelection();
                }}
              >
                <img src={movie.poster} alt={movie.title} />
                <span>{movie.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="center-panel">
          <div className="movie-header">
            <div className="movie-title">{selectedMovie.title}</div>
            <div className="movie-sub">
              {selectedMovie.screen} • {selectedMovie.duration} phút
            </div>
          </div>
          <div className="time-select">
            {showtimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedShowtime(time)}
                className={selectedShowtime === time ? "stime active" : "stime"}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="screen-bar">MÀN HÌNH</div>
          <div className="legend">
            <span>
              <b className="legend-dot available" /> Trống
            </span>
            <span>
              <b className="legend-dot selected" /> Đang chọn
            </span>
            <span>
              <b className="legend-dot booked" /> Đã bán
            </span>
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
              <span>Phim:</span> {selectedMovie.title}
            </p>
            <p>
              <span>Phòng:</span> {selectedMovie.screen}
            </p>
            <p>
              <span>Suất:</span> {selectedShowtime}
            </p>
            <p>
              <span>Thời lượng:</span> {selectedMovie.duration} phút
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

          <div className="payment-options">
            <h4>THANH TOÁN</h4>
            <div className="pay-methods">
              <button
                className={
                  paymentMethod === "cash" ? "pay-btn active" : "pay-btn"
                }
                onClick={() => setPaymentMethod("cash")}
              >
                Tiền mặt
              </button>
              <button
                className={
                  paymentMethod === "vnpay" ? "pay-btn active" : "pay-btn"
                }
                onClick={() => setPaymentMethod("vnpay")}
              >
                VNPAY
              </button>
              <button
                className={
                  paymentMethod === "card" ? "pay-btn active" : "pay-btn"
                }
                onClick={() => setPaymentMethod("card")}
              >
                Thẻ
              </button>
            </div>
            {paymentMethod === "vnpay" && (
              // <div className="qr-code-label">QR Code</div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVA5fFqneWXtMAlI6yueCG4078s5pvmvzaPg&s"
                alt="VNPAY QR Code"
                className="qr-code"
              />
            )}
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
    </div>
  );
}
