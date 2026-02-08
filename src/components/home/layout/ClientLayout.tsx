import { Outlet } from "react-router-dom";

export default function ClientLayout() {
  return (
    <>
      {/* Header client */}
      <header>Client Header</header>

      <Outlet />

      {/* Footer client */}
      <footer>Client Footer</footer>
    </>
  );
}
