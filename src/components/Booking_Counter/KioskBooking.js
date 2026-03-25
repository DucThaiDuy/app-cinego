import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// KioskBooking.tsx
import { useMemo, useState } from "react";
import "./KioskBooking.scss";
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
const movieList = [
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
const buildSeats = () => {
  const list = [];
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
  const [selectedMovie, setSelectedMovie] = useState(movieList[0]);
  const [selectedShowtime, setSelectedShowtime] = useState(showtimes[0]);
  const [seats, setSeats] = useState(buildSeats());
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
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
  const toggleSeat = (seat) => {
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
  return _jsxs("div", {
    className: "kiosk-booking",
    children: [
      _jsxs("header", {
        className: "top-navbar",
        children: [
          _jsx("div", { className: "brand", children: "CineGo" }),
          _jsx("div", {
            className: "search-box",
            children: _jsx("input", { placeholder: "T\u00ECm phim..." }),
          }),
          _jsx("div", {
            className: "pos-title",
            children: "B\u00E1n v\u00E9 t\u1EA1i qu\u1EA7y",
          }),
          _jsx("div", {
            className: "clock",
            children: new Date().toLocaleTimeString(),
          }),
        ],
      }),
      _jsxs("div", {
        className: "layout-grid",
        children: [
          _jsxs("aside", {
            className: "left-panel",
            children: [
              _jsx("h3", { children: "ĐANG CHIẾU" }),
              _jsx("div", {
                className: "movie-list",
                children: movieList.map((movie) =>
                  _jsxs(
                    "button",
                    {
                      className:
                        selectedMovie.id === movie.id
                          ? "movie-item active"
                          : "movie-item",
                      onClick: () => {
                        setSelectedMovie(movie);
                        setSelectedShowtime(showtimes[0]);
                        clearSelection();
                      },
                      children: [
                        _jsx("img", { src: movie.poster, alt: movie.title }),
                        _jsx("span", { children: movie.title }),
                      ],
                    },
                    movie.id,
                  ),
                ),
              }),
            ],
          }),
          _jsxs("section", {
            className: "center-panel",
            children: [
              _jsxs("div", {
                className: "movie-header",
                children: [
                  _jsx("div", {
                    className: "movie-title",
                    children: selectedMovie.title,
                  }),
                  _jsxs("div", {
                    className: "movie-sub",
                    children: [
                      selectedMovie.screen,
                      " \u2022 ",
                      selectedMovie.duration,
                      " ph\u00FAt",
                    ],
                  }),
                ],
              }),
              _jsx("div", {
                className: "time-select",
                children: showtimes.map((time) =>
                  _jsx(
                    "button",
                    {
                      onClick: () => setSelectedShowtime(time),
                      className:
                        selectedShowtime === time ? "stime active" : "stime",
                      children: time,
                    },
                    time,
                  ),
                ),
              }),
              _jsx("div", {
                className: "screen-bar",
                children: "M\u00C0N H\u00CCNH",
              }),
              _jsxs("div", {
                className: "legend",
                children: [
                  _jsxs("span", {
                    children: [
                      _jsx("b", { className: "legend-dot available" }),
                      " Tr\u1ED1ng",
                    ],
                  }),
                  _jsxs("span", {
                    children: [
                      _jsx("b", { className: "legend-dot selected" }),
                      " \u0110ang ch\u1ECDn",
                    ],
                  }),
                  _jsxs("span", {
                    children: [
                      _jsx("b", { className: "legend-dot booked" }),
                      " \u0110\u00E3 b\u00E1n",
                    ],
                  }),
                ],
              }),
              _jsx("div", {
                className: "seat-map",
                role: "grid",
                children: formattedSeats.map(({ row, rowSeats }) =>
                  _jsxs(
                    "div",
                    {
                      className: "row",
                      children: [
                        _jsx("div", { className: "row-label", children: row }),
                        _jsx("div", {
                          className: "seats",
                          children: rowSeats.map((seat) =>
                            _jsx(
                              "button",
                              {
                                className: `seat ${seat.status}`,
                                onClick: () => toggleSeat(seat),
                                disabled: seat.status === "booked",
                                children: seat.number,
                              },
                              seat.id,
                            ),
                          ),
                        }),
                      ],
                    },
                    row,
                  ),
                ),
              }),
            ],
          }),
          _jsxs("aside", {
            className: "right-panel",
            children: [
              _jsxs("div", {
                className: "cart-title",
                children: [
                  _jsx("span", { children: "Gi\u1ECF h\u00E0ng" }),
                  _jsx("span", {
                    className: "cart-count",
                    children: selectedSeats.length || 0,
                  }),
                ],
              }),
              _jsxs("div", {
                className: "cart-info",
                children: [
                  _jsxs("p", {
                    children: [
                      _jsx("span", { children: "Phim:" }),
                      " ",
                      selectedMovie.title,
                    ],
                  }),
                  _jsxs("p", {
                    children: [
                      _jsx("span", { children: "Ph\u00F2ng:" }),
                      " ",
                      selectedMovie.screen,
                    ],
                  }),
                  _jsxs("p", {
                    children: [
                      _jsx("span", { children: "Su\u1EA5t:" }),
                      " ",
                      selectedShowtime,
                    ],
                  }),
                  _jsxs("p", {
                    children: [
                      _jsx("span", { children: "Th\u1EDDi l\u01B0\u1EE3ng:" }),
                      " ",
                      selectedMovie.duration,
                      " ph\u00FAt",
                    ],
                  }),
                  _jsxs("p", {
                    children: [
                      _jsx("span", { children: "Gh\u1EBF:" }),
                      " ",
                      selectedSeats.length
                        ? selectedSeats.map((s) => s.id).join(", ")
                        : "Chưa chọn",
                    ],
                  }),
                  _jsxs("p", {
                    children: [
                      _jsx("span", { children: "\u0110\u01A1n gi\u00E1:" }),
                      " ",
                      seatPrice.toLocaleString(),
                      " \u0111",
                    ],
                  }),
                  _jsxs("p", {
                    className: "total",
                    children: [
                      _jsx("span", { children: "T\u1ED5ng ti\u1EC1n:" }),
                      " ",
                      totalPrice.toLocaleString(),
                      " \u0111",
                    ],
                  }),
                ],
              }),
              _jsxs("div", {
                className: "payment-options",
                children: [
                  _jsx("h4", { children: "THANH TO\u00C1N" }),
                  _jsxs("div", {
                    className: "pay-methods",
                    children: [
                      _jsx("button", {
                        className:
                          paymentMethod === "cash"
                            ? "pay-btn active"
                            : "pay-btn",
                        onClick: () => setPaymentMethod("cash"),
                        children: "Ti\u1EC1n m\u1EB7t",
                      }),
                      _jsx("button", {
                        className:
                          paymentMethod === "vnpay"
                            ? "pay-btn active"
                            : "pay-btn",
                        onClick: () => setPaymentMethod("vnpay"),
                        children: "VNPAY",
                      }),
                      _jsx("button", {
                        className:
                          paymentMethod === "card"
                            ? "pay-btn active"
                            : "pay-btn",
                        onClick: () => setPaymentMethod("card"),
                        children: "Th\u1EBB",
                      }),
                    ],
                  }),
                  paymentMethod === "vnpay" &&
                    _jsx("div", {
                      className: "qr-code-label",
                      children: "QR Code",
                    }),
                ],
              }),
              _jsxs("div", {
                className: "cart-actions",
                children: [
                  _jsx("button", {
                    className: "btn-clear",
                    onClick: clearSelection,
                    children: "X\u00F3a ch\u1ECDn",
                  }),
                  _jsx("button", {
                    className: "btn-confirm",
                    onClick: confirmBooking,
                    disabled: !selectedSeats.length,
                    children: "X\u00E1c nh\u1EADn b\u00E1n v\u00E9",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
