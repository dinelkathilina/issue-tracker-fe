import LoginForm from "../components/auth/LoginForm";
import NavBar from "../components/common/NavBar";
// import { useAppDispatch, useAppSelector } from "../store/hooks";
// import { loginSuccess, logout } from "../store/slices/authSlice";
// import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";

export default function LoginPage() {
  // const dispatch = useAppDispatch();
  // const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  // const handleLogin = () => {
  //   dispatch(
  //     loginSuccess({
  //       id: "1",
  //       name: "John Doe",
  //       email: "john@example.com",
  //     })
  //   );
  // };

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  return (
    <div className="min-h-screen bg-content1 text-foreground bg-gradient-to-r from-slate-900 to-slate-700">
      <NavBar />
      <main className="container mx-auto px-6 py-12 flex justify-center">
        <LoginForm/>
      </main>
    </div>
  );
}
