// TicketBooking.tsx
import { useState, useMemo } from "react";
import "./TicketBooking.scss";

type Seat = {
  id: string;
  row: string;
  number: number;
  status: "available" | "booked" | "selected";
};

const rows = ["A", "B", "C", "D", "E", "F"];
const seatsPerRow = 10;

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: Math.random() < 0.2 ? "booked" : "available",
      });
    }
  });
  return seats;
};

const formats = ["2D", "3D", "IMAX"];
const showtimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];

export default function TicketBooking() {
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("2D");
  const [selectedShowtime, setSelectedShowtime] = useState<string>("10:00");

  const availableSeats = useMemo(
    () => seats.filter((s) => s.status === "available").length,
    [seats],
  );
  const bookedSeats = useMemo(
    () => seats.filter((s) => s.status === "booked").length,
    [seats],
  );
  const totalSeats = seats.length;

  const toggleSeat = (seat: Seat) => {
    if (seat.status === "booked") return;
    if (seat.status === "selected") {
      setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id));
      setSeats(
        seats.map((s) =>
          s.id === seat.id ? { ...s, status: "available" } : s,
        ),
      );
    } else {
      setSelectedSeats([...selectedSeats, { ...seat, status: "selected" }]);
      setSeats(
        seats.map((s) => (s.id === seat.id ? { ...s, status: "selected" } : s)),
      );
    }
  };

  const totalPrice = selectedSeats.length * 75000;

  return (
    <div className="ticket-booking">
      {/* HEADER */}
      <div className="header">
        <img
          src="https://image.tmdb.org/t/p/w500/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg"
          alt="poster"
          className="poster"
        />
        <div className="movie-info">
          <h1>Mission: Impossible</h1>
          <p>⭐ 8.5 • 148 phút</p>
          <p className="description">
            Hành động - Phiêu lưu - Kịch tính, đỉnh cao của Tom Cruise!
          </p>
        </div>
      </div>

      {/* FORMAT SELECTION */}
      <div className="format-selection">
        <h2>Chọn định dạng</h2>
        <div className="format-list">
          {formats.map((fmt) => (
            <button
              key={fmt}
              className={`format-btn ${selectedFormat === fmt ? "active" : ""}`}
              onClick={() => setSelectedFormat(fmt)}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* SHOWTIME SELECTION */}
      <div className="showtime-selection">
        <h2>Chọn suất chiếu</h2>
        <div className="showtime-list">
          {showtimes.map((time) => (
            <button
              key={time}
              className={`showtime-btn ${
                selectedShowtime === time ? "active" : ""
              }`}
              onClick={() => setSelectedShowtime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* SEAT SELECTION */}
      <div className="seat-selection">
        <h2>Chọn ghế</h2>
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
        <div className="screen">MÀN HÌNH</div>
        <div className="seats-grid">
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${seat.status}`}
              onClick={() => toggleSeat(seat)}
              title={`Ghế: ${seat.id}\nGiá: 100.000đ\nLoại: Thường`}
            >
              {seat.id}
            </div>
          ))}
        </div>
      </div>

      {/* CHECKOUT */}
      <div className="checkout">
        <p>
          <strong>Định dạng:</strong> {selectedFormat} |{" "}
          <strong>Suất chiếu:</strong> {selectedShowtime}
        </p>
        <p>
          <strong>Ghế đã chọn:</strong>{" "}
          {selectedSeats.map((s) => s.id).join(", ") || "Chưa chọn"}
        </p>
        <p>
          <strong>Tổng tiền:</strong> {totalPrice.toLocaleString()} VND
        </p>
        <button className="book-btn" disabled={selectedSeats.length === 0}>
          Đặt vé ngay
        </button>
      </div>
    </div>
  );
}
