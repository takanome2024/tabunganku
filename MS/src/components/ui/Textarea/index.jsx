const Textarea = ({
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

      <textarea
        className={`textarea textarea-bordered w-full ${className}`}
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

export default Textarea;