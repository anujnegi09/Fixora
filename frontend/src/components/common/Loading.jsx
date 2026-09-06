// 

import React from "react";

const Loading = ({
  text = "Loading",
  fullScreen = false,
  size = "md",
}) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-3
        ${
          fullScreen
            ? "fixed inset-0 min-h-screen w-full"
            : "w-full py-10"
        }
      `}
    >
      {/* Spinner */}
      <div
        className={`
          ${sizes[size]}
          rounded-full
          border-gray-200
          border-t-blue-600
          animate-spin
        `}
      />

      {/* Loading text */}
      {text && (
        <p className="text-sm font-medium text-gray-500">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loading;