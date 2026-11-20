import React from "react";

const Button = ({
  children,
  leftIcon,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  className = "",
  onClick,
}) => {
  const baseClasses =
    "relative overflow-hidden flex items-center justify-center gap-2 transition duration-300 rounded-lg font-semibold focus:outline-none cursor-pointer";

  const variants = {
    primary: "bg-blue-600 text-white shadow-sm hover:bg-blue-700",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
    outline:
      "border border-slate-300 text-slate-800 hover:border-blue-400 hover:bg-blue-50",

    google:
      "flex items-center justify-center gap-3 w-full border border-slate-200 rounded-lg py-3 bg-white text-slate-700 hover:bg-slate-50 transition",

    success:
      "rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700",

    dangerLight:
      "rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100",

    subscription:
      "bg-[#6f4f38] text-white hover:bg-[#5a3f2d] hover:shadow-lg hover:shadow-[#6f4f38]/20",

    rating:
      "flex items-center gap-2 text-[#6E42E5] text-base font-semibold px-4 py-4 hover:opacity-80",

    location:
      "bg-transparent text-[#6E42E5] hover:opacity-80",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {leftIcon && leftIcon}
      {children}

      {/* Progress bar */}
      {loading && (
        <span
          className="
            absolute
            bottom-0
            left-0
            h-1
            animate-button-progress
            bg-white/80
          "
        />
      )}
    </button>
  );
};

export default Button;
