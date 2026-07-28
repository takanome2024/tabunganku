const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">
            {label}
          </span>
        </label>
      )}

      <input
        className={`input input-bordered w-full ${className}`}
        {...props}
      />

      {error && (
        <label className="label">
          <span className="label-text-alt text-error">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};

export default Input;