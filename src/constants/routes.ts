export const ROUTES = {
  CLIENT: {
    HOME: "/",
    LOGIN: "/admin/login",
  },

  MANAGER: {
    // PATIENT
    BASE: "/cinego/admin",

    // PAGE
    DASHBOARD: "dashboard",
    MOVIES: "movies",
    GENRES: "genres",
    ACTORS: "actors",
    SHOWTIMES: "showtimes",
    BOOKINGS: "bookings",
    USERS: "users",
    HALLS: "halls",
    FOOD: "food",
    VOUCHERS: "vouchers",
    STAFF: "staff",
    REPORTS: "reports",
    NEWS: "news",
    PRICING: "pricing",

    // ADD
    ADD_SHOWTIME: "showtime/add-showtime",
    ADD_MOVIE: "movies/add-movie",
    EDIT_MOVIE: "movies/edit/:id",
    ADD_CINEMA: "cinema/add-cinema",
    ADD_HALL: "halls/add",
    EDIT_HALL: "halls/edit/:id",
    ADD_BOOKING_AUTOCHECKIN: "bookings/auto-checkin",
  },

  ADMIN: {
    BASE: "/cinego/super-admin",
    DASHBOARD: "dashboard",
    USERS: "users",
    CINEMAS: "cinemas",
    HALLS: "halls",
    SETTINGS: "settings",
  },

  ROLE_REDIRECT_MAP: {
    ADMIN: "/cinego/super-admin",
    MANAGER: "/cinego/admin",
    EMPLOYEE: "/cinego/pos-counter",
    STAFF: "/cinego/pos-counter",
  },

  POS_COUNTER: {
    BASE: "/cinego/pos-counter",
  },
};
