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
          {label}
        </label>
      )}

      <input
        {...props}
        className={`mt-2 w-full rounded-lg border p-3 outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
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