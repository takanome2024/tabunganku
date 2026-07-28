const Card = ({
  title,
  children,
}) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">

        {title && (
          <h2 className="card-title">
            {title}
          </h2>
        )}

        {children}

      </div>
    </div>
  );
};

export default Card;