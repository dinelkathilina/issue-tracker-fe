import { Outlet, Link } from "react-router-dom";


export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">


      <main className="flex-grow p-6">
        {/* This is where the specific page content will be rendered */}
        <Outlet />
      </main>

      <footer className="p-4 border-t text-center text-sm text-gray-500">
        © 2026 Issue Tracker
      </footer>
    </div>
  );
}
