import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import AuthShell from "../../components/auth/AuthShell";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import PasswordInput from "../../components/common/PasswordInput.jsx";
import { login } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import { loginWithGoogle } from "../../api/auth.api";

const LoginNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <AuthShell eyebrow="Welcome back" title="Good to see you again." description="Log in to find local professionals, manage your bookings, and stay on top of every service." footer={<p>New to Fixora? <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700">Create an account</Link></p>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <Input label="Email address" type="email" name="email" placeholder="you@example.com" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
        <PasswordInput label="Password" placeholder="Enter your password" error={errors.password?.message} {...register("password", { required: "Password is required" })} />
        <div className="flex justify-end"><Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot password?</Link></div>
        <Button type="submit" loading={loading} fullWidth size="lg">Log in</Button>
      </form>
      <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-slate-200" /><span className="text-xs font-semibold uppercase tracking-widest text-slate-400">or</span><span className="h-px flex-1 bg-slate-200" /></div>
      <Button variant="google" onClick={loginWithGoogle} leftIcon={<FaGoogle />}>Continue with Google</Button>
    </AuthShell>
  );
};

export default LoginNew;
