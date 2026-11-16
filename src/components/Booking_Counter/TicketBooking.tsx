// TicketBooking.tsx
import { useState } from "react";
import "./TicketBooking.scss";

type Seat = {
  id: string;
  row: string;
  number: number;
  status: "available" | "booked" | "selected";
};

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 10;

const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      seats.push({
        id: `${row}${i}`,
        row,
        number: i,
        status: Math.random() < 0.15 ? "booked" : "available",
      });
    }
  });
  return seats;
};

const formats = ["2D", "3D", "IMAX"];
const showtimes = ["10:00", "13:00", "16:00", "19:00", "22:00"];
const POSTER_URL = "https://image.tmdb.org/t/p/w500/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg";
const BG_URL = "https://image.tmdb.org/t/p/original/qrGtVFxaD8c7et0jUtaYhyTzzPg.jpg";

export default function TicketBooking() {
  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string>("2D");
  const [selectedShowtime, setSelectedShowtime] = useState<string>("10:00");

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

  const ticketPrice = 75000;
  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div className="ticket-booking-v2">
      {/* Blurred background image for premium cinematic feel */}
      <div 
        className="dynamic-bg" 
        style={{ backgroundImage: `url(${BG_URL})` }} 
      />
      
      <div className="booking-wrapper">
        <div className="content-grid">
          
          {/* LEFT PANEL: Movie & Settings */}
          <div className="left-panel">
            <div className="movie-card glass-morphism">
              <img src={POSTER_URL} alt="Mission Impossible" className="poster" />
              <div className="info">
                <h1>Mission: Impossible</h1>
                <div className="badges">
                  <span className="badge imdb">⭐ 8.5/10</span>
                  <span className="badge time">148 phút</span>
                  <span className="badge age">C16</span>
                </div>
                <p className="desc">
                  Ethan Hunt và đội IMF dấn thân vào nhiệm vụ nguy hiểm nhất từ trước đến nay: theo dõi một loại vũ khí đáng sợ có thể đe dọa toàn nhân loại.
                </p>
              </div>
            </div>

            <div className="selections-group">
              <div className="selection-box glass-morphism">
                <h3>Định dạng chiếu</h3>
                <div className="options">
                  {formats.map((fmt) => (
                    <button
                      key={fmt}
                      className={selectedFormat === fmt ? "btn-opt active" : "btn-opt"}
                      onClick={() => setSelectedFormat(fmt)}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="selection-box glass-morphism">
                <h3>Giờ chiếu</h3>
                <div className="options">
                  {showtimes.map((time) => (
                    <button
                      key={time}
                      className={selectedShowtime === time ? "btn-opt active" : "btn-opt"}
                      onClick={() => setSelectedShowtime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: Seats */}
          <div className="right-panel glass-morphism">
            <div className="screen-container">
              <div className="screen-glow"></div>
              <div className="screen-text">MÀN HÌNH</div>
            </div>

            <div className="seats-map">
              {seats.map((seat) => (
                <div
                  key={seat.id}
                  className={`seat-btn ${seat.status}`}
                  onClick={() => toggleSeat(seat)}
                  title={`Ghế ${seat.id} - ${ticketPrice.toLocaleString()}đ`}
                >
                  <span className="seat-text">{seat.id}</span>
                </div>
              ))}
            </div>

            <div className="seat-legend">
              <div className="legend-item">
                <div className="box available"></div>
                <span>Ghế trống</span>
              </div>
              <div className="legend-item">
                <div className="box selected"></div>
                <span>Đang chọn</span>
              </div>
              <div className="legend-item">
                <div className="box booked"></div>
                <span>Đã bán</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM CHECKOUT BAR */}
        <div className="checkout-bar glass-morphism-strong">
          <div className="checkout-details">
            <div className="detail-item">
              <span className="lbl">Suất chiếu</span>
              <strong className="val">{selectedFormat} - {selectedShowtime}</strong>
            </div>
            <div className="divider"></div>
            <div className="detail-item">
              <span className="lbl">Ghế đã chọn ({selectedSeats.length})</span>
              <strong className="val seat-list">
                {selectedSeats.length > 0 
                  ? selectedSeats.map((s) => s.id).join(", ") 
                  : "Vui lòng chọn ghế"}
              </strong>
            </div>
            <div className="divider"></div>
            <div className="detail-item">
              <span className="lbl">Tổng thanh toán</span>
              <strong className="val price">{totalPrice.toLocaleString()} ₫</strong>
            </div>
          </div>
          <button className="btn-book" disabled={selectedSeats.length === 0}>
            TIẾP TỤC ĐẶT VÉ
          </button>
        </div>
      </div>
    </div>
  );
}
