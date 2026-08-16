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
    "transition duration-300 rounded-lg font-medium focus:outline-none cursor-pointer";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",

    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",

    danger: "bg-red-600 text-white hover:bg-red-700",

    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",

    google:
      "flex items-center justify-center gap-3 w-full border rounded-lg py-3 bg-white text-gray-700 hover:bg-gray-100 transition",

    success:
      "rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-95", // for booking accept, confirm  "bg-green-600 text-white hover:bg-green-700",

    dangerLight:
      "rounded-lg bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50", // for booking  cancel "bg-red-50 text-red-600 hover:bg-red-100",
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
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      <>
        {loading ? (
          "loadingText" // loading...
        ) : (
          <>
            {leftIcon && leftIcon}
            {children}
          </>
        )}
      </>
    </button>
  );
};

export default Button;
