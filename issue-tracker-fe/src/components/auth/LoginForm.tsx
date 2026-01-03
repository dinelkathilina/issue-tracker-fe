import { Form, Input, Button } from "@heroui/react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <Form className="w-full flex flex-col gap-4">
      <Input
        isRequired
        label="Email"
        placeholder="Enter your email"
        type="email"
        variant="bordered"
      />
      <Input
        isRequired
        label="Password"
        placeholder="Enter your password"
        type="password"
        variant="bordered"
      />
      <Button as={Link} color="primary" to="/dashboard" className="mt-2">
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
