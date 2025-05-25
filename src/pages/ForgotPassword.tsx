
import { ForgotPasswordForm } from "@/components/login/ForgotPasswordForm";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Webi<span className="text-yellow-500">Delivery</span>
            </div>
          </Link>
          <p className="text-muted-foreground">Recupere o acesso à sua conta</p>
        </div>
        <ForgotPasswordForm />
        <div className="text-center text-sm text-muted-foreground">
          Lembrou da senha?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
