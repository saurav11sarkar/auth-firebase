import { Outlet } from "react-router";
import Navbar from "../shared/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pt-8 pb-16">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
