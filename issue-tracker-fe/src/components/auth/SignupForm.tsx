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

const SignupForm = () => {
  return (
    <Card className="w-[400px] h-[450px] ">
      <CardHeader className="flex justify-center gap-3 ">
        {/* I need to center this div */}
        <div className="flex flex-col  ">
          <p className="text-lg text-white font-bold ">Create an Account</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="my-2">Enter Your Credentials to SignUp</p>

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
          <Input
            isRequired
            label="ConfirmPassword"
            placeholder="Confirm your password"
            type="password"
            variant="bordered"
          />
          <div className="flex justify-center w-full">
            <Button as={Link} color="primary" to="/dashboard" className="mt-2">
              Sign Up
            </Button>
          </div>
          <div className="flex flex-col items-center w-full">
            <p >Already have an account?</p>
            <LinkButton href="/" underline="always">
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
