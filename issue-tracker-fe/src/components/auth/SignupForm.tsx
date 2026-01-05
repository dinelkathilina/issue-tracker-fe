import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
import { registerUser, clearError } from "../../store/slices/authSlice";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear previous errors
    dispatch(clearError());
    setPasswordError("");
    setSuccessMessage("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    const result = await dispatch(registerUser({ email, password }));

    if (registerUser.fulfilled.match(result)) {
      // Registration successful
      setSuccessMessage(
        "Account created successfully! Redirecting to login..."
      );
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <Card className="md:w-[400px] min-h-[450px]">
      <CardHeader className="flex justify-center gap-3">
        <div className="flex flex-col">
          <p className="text-lg dark:text-white font-bold">Create an Account</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="md:my-2">Enter Your Credentials to SignUp</p>

        <Form
          className="w-full flex flex-col md:gap-4 gap-2"
          onSubmit={handleSubmit}
        >
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
          <Input
            isRequired
            label="Confirm Password"
            placeholder="Confirm your password"
            type="password"
            variant="bordered"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            isDisabled={loading}
            isInvalid={!!passwordError}
            errorMessage={passwordError}
          />

          {/* Error message display */}
          {error && (
            <div className="text-danger text-sm text-center bg-danger-50 dark:bg-danger-900/20 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Success message display */}
          {successMessage && (
            <div className="text-success text-sm text-center bg-success-50 dark:bg-success-900/20 p-2 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="flex justify-center w-full">
            <Button
              color="primary"
              type="submit"
              className="mt-2"
              isLoading={loading}
              isDisabled={loading || !!successMessage}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </div>
          <div className="flex flex-col items-center w-full">
            <p>Already have an account?</p>
            <LinkButton as={Link} to="/" underline="always">
              Sign In
            </LinkButton>
          </div>
        </Form>
      </CardBody>
      <Divider />
    </Card>
  );
};

export default SignupForm;
