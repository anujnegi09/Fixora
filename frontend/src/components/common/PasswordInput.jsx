import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordInput = ({
  label,
  error,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
          <label htmlFor={props.name} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`w-full rounded-lg border border-slate-300 bg-white p-3 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && (
        <small className="text-red-500">
          {error}
        </small>
      )}
    </div>
  );
};

export default PasswordInput;
