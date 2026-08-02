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
    primary:"bg-blue-600 text-white hover:bg-blue-700",

    secondary:"bg-gray-200 text-gray-800 hover:bg-gray-300",

    danger:"bg-red-600 text-white hover:bg-red-700",

    outline:"border border-blue-600 text-blue-600 hover:bg-blue-50",

    google:"flex items-center justify-center gap-3 w-full border rounded-lg py-3 bg-white text-gray-700 hover:bg-gray-100 transition",
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
    "Loading..."
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