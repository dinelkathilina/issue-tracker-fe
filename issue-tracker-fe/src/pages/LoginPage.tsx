import NavBar from "../components/common/NavBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginSuccess, logout } from "../store/slices/authSlice";
import { Button, Card, CardBody, CardHeader, Divider } from "@heroui/react";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(
      loginSuccess({
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      })
    );
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-content1 text-foreground">
      <NavBar />
      <main className="container mx-auto px-6 py-12 flex justify-center">
        <Card className="max-w-[400px] w-full">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md font-bold">Redux Integration Demo</p>
              <p className="text-small text-default-500">
                State Management Test
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-content2">
                <p className="text-sm font-semibold">Status:</p>
                <p className={isAuthenticated ? "text-success" : "text-danger"}>
                  {isAuthenticated ? "Logged In" : "Logged Out"}
                </p>
                {user && (
                  <div className="mt-2 text-sm">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {!isAuthenticated ? (
                  <Button color="primary" onPress={handleLogin}>
                    Login (Mock)
                  </Button>
                ) : (
                  <Button color="danger" variant="flat" onPress={handleLogout}>
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
