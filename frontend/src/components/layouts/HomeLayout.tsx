import { Navbar } from "@/components/navbar";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
