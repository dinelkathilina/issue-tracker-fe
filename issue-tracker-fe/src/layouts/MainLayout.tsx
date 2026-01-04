import { Outlet, Link } from "react-router-dom";
import NavBar from "../components/common/NavBar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-content1 text-foreground bg-gradient-to-r from-slate-900 to-slate-700">
      <NavBar />
      <main className="container mx-auto px-6 py-8 flex justify-center">
        <Outlet/>
      </main>
    </div>
  );
}
