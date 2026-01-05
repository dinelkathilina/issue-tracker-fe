import { useState, type FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link as LinkButton,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser, clearError } from "../../store/slices/authSlice";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Get the redirect path from location state, or default to dashboard
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    "/dashboard";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear any previous errors
    dispatch(clearError());

    const result = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(result)) {
      // Login successful, navigate to dashboard or the attempted page
      navigate(from, { replace: true });
    }
  };

  return (
    <Card className="w-[400px] min-h-[400px]">
      <CardHeader className="flex justify-center gap-3">
        <div className="flex flex-col">
          <p className="text-lg dark:text-white font-bold">Welcome Back</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="my-2">Enter Your Credentials to Login</p>

        <Form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            isRequired
            label="Email"
            placeholder="Enter your email"
            type="email"
            variant="bordered"
            value={email}
            onValueChange={setEmail}
            isDisabled={loading}
          />
          <Input
            isRequired
            label="Password"
            placeholder="Enter your password"
            type="password"
            variant="bordered"
            value={password}
            onValueChange={setPassword}
            isDisabled={loading}
          />

          {/* Error message display */}
          {error && (
            <div className="text-danger text-sm text-center bg-danger-50 dark:bg-danger-900/20 p-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex justify-center w-full">
            <Button
              color="primary"
              type="submit"
              className="mt-2"
              isLoading={loading}
              isDisabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </div>
          <div className="flex flex-col items-center w-full">
            <p>Don't have an account?</p>
            <LinkButton as={Link} to="/signup" underline="always">
              Sign Up
            </LinkButton>
          </div>
        </Form>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default LoginForm;
