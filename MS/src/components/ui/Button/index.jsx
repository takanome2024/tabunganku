const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {loading && (
        <span className="loading loading-spinner loading-sm"></span>
      )}

      {children}
    </button>
  );
};

export default Button;