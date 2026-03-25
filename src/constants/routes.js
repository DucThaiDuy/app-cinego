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
        // ADD
        ADD_SHOWTIME: "showtime/add-showtime",
        ADD_MOVIE: "movies/add-movie",
        ADD_CINEMA: "cinema/add-cinema",
        ADD_BOOKING_AUTOCHECKIN: "bookings/auto-checkin",
    },
    ADMIN: {
        BASE: "/cinego/super-admin",
        DASHBOARD: "dashboard",
        USERS: "users",
        CINEMAS: "cinemas",
        SETTINGS: "settings",
    },
    ROLE_REDIRECT_MAP: {
        // SUPER_ADMIN: "/cinego/super-admin",
        ADMIN: "/cinego/super-admin",
        MANAGER: "/cinego/admin",
    },
    POS_COUNTER: {
        BASE: "/cinego/pos-counter",
    },
};
