
import { LoginForm } from "@/components/login/LoginForm";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="mb-6">
        <Link to="/" className="logo-text text-webi-600">
          Webi<span>Delivery</span>
        </Link>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
