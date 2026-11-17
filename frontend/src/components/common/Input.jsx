import React from "react";

const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col gap-2">

      {label && (
        <label htmlFor={props.name}>
          <span className="text-sm font-semibold text-slate-700">{label}</span>
        </label>
      )}

      <input
        {...props}
        className={`mt-1 w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${className}`}
      />

      {error && (
        <small className="text-red-500">
          {error}
        </small>
      )}

    </div>
  );
};

export default Input;




// import React from "react";

// const Input = ({
//   label,
//   type = "text",
//   name,
//   value,
//   placeholder,
//   onChange,
//   onBlur,
//   error,
//   disabled = false,
//   required = false,
//   className = "",
// }) => {
//   return (
//     <div className="flex flex-col gap-2">

//       {label && (
//         <label htmlFor={name}>
//           {label}
//         </label>
//       )}

//       <input
//         id={name}
//         type={type}
//         name={name}
//         value={value}
//         placeholder={placeholder}
//         onChange={onChange}
//         onBlur={onBlur}
//         disabled={disabled}
//         required={required}
//         className={className}
//       />

//       {error && (
//         <small>
//           {error}
//         </small>
//       )}

//     </div>
//   );
// };

// export default Input;
