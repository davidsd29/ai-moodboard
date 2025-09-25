import { Outlet } from "react-router-dom";
import Starfield from "../components/Starfield";

export default function AppLayout() {
  return (
    <div className="bg-[#0d1621] relative min-h-full">
      <Starfield starCount={2000} />

      <div className="relative z-10  min-h-screen grid md:gap-6 place-items-center text-white">
        {/*  This is where the routed pages will be rendered */}
        <Outlet />
      </div>
    </div>
  );
}