import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { login, checkAuthentication } from "../../features/auth/authThunks";
import { selectLoading } from "../../features/auth/authSelectors";
import { loginWithGoogle } from "../../api/auth.api";

import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import PasswordInput from "../../components/common/PasswordInput.jsx";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      await dispatch(checkAuthentication()).unwrap();

      navigate("/");
    } catch (error) {
      console.log("ERROR =>", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row-reverse">
        {/* Form side */}
        <div className="w-full md:w-3/5 px-6 py-10 sm:px-10 ml-14">
          <h1 className="text-3xl font-bold text-slate-900">Fixora</h1>
          <p className="text-slate-500 mt-1 mb-8">Welcome back 👋</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-violet-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" loading={loading} fullWidth>
              Login
            </Button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="mx-3 text-slate-400 text-sm">or</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <Button
            variant="google"
            onClick={loginWithGoogle}
            leftIcon={<FaGoogle />}
          >
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-sm text-slate-600 md:hidden">
            Don't have an account?{" "}
            <Link to="/register" className="text-violet-600 font-medium hover:underline">
              Register
            </Link>
          </p>
        </div>

        {/* Welcome side */}
        <div className="hidden md:flex md:w-2/5 relative">
          <div className="absolute inset-0 -mr-16 rounded-r-[100px] bg-gradient-to-bl from-violet-600 to-indigo-700 flex flex-col items-center justify-center text-center px-10 text-white">
            <h2 className="text-3xl font-bold">New here?</h2>
            <p className="mt-4 text-violet-100 text-sm leading-relaxed">
              Create a Fixora account to start booking trusted local services
              or start offering your own.
            </p>
            <Link
              to="/register"
              className="mt-8 border border-white rounded-lg px-8 py-3 text-sm font-semibold hover:bg-white hover:text-violet-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;