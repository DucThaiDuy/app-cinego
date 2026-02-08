import { Outlet } from "react-router-dom";

export default function BookingLayout() {
  return (
    <>
      {/* Header client */}
      <header>Client Header</header>

      <Outlet />

      {/* Footer client */}
      {/* <footer>Client Footer</footer> */}
    </>
  );
}
