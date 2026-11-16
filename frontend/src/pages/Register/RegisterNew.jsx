import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import AuthShell from "../../components/auth/AuthShell";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import PasswordInput from "../../components/common/PasswordInput.jsx";
import { register as registerUser } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import { loginWithGoogle } from "../../api/auth.api";

const RegisterNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    const result = await dispatch(registerUser(formData));
    if (registerUser.fulfilled.match(result)) {
      localStorage.setItem("verificationEmail", data.email);
      navigate("/verify-email");
    }
  };

  return (
    <AuthShell eyebrow="Join Fixora" title="Make everyday help easier." description="Create your free account to book trusted local services or start offering your own expertise." footer={<p>Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">Log in</Link></p>}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2"><Input label="Full name" placeholder="Your full name" error={errors.fullName?.message} {...register("fullName", { required: "Full name is required" })} /><Input label="Username" placeholder="Choose a username" error={errors.userName?.message} {...register("userName", { required: "Username is required" })} /></div>
        <div className="grid gap-4 sm:grid-cols-2"><Input label="Phone number" type="tel" placeholder="10-digit number" error={errors.phoneNumber?.message} {...register("phoneNumber", { required: "Phone number is required", pattern: { value: /^[6-9]\d{9}$/, message: "Enter a valid 10-digit phone number" } })} /><Input label="Email address" type="email" placeholder="you@example.com" error={errors.email?.message} {...register("email", { required: "Email is required" })} /></div>
        <PasswordInput label="Password" placeholder="Create a password" error={errors.password?.message} {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
        <Button type="submit" loading={loading} fullWidth size="lg">Create account</Button>
      </form>
      <div className="my-6 flex items-center gap-3"><span className="h-px flex-1 bg-slate-200" /><span className="text-xs font-semibold uppercase tracking-widest text-slate-400">or</span><span className="h-px flex-1 bg-slate-200" /></div>
      <Button variant="google" onClick={loginWithGoogle} leftIcon={<FaGoogle />}>Continue with Google</Button>
    </AuthShell>
  );
};

export default RegisterNew;
