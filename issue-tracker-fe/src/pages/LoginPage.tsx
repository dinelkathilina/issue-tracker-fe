import LoginForm from "../components/auth/LoginForm";
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

  return <LoginForm />;
}
