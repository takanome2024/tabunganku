const Select = ({
  label,
  error,
  children,
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

      <select
        className={`select select-bordered w-full ${className}`}
        {...props}
      >
        {children}
      </select>

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

export default Select;