const EmptyState = ({
  title,
  description,
}) => {
  return (
    <div className="text-center py-20">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 opacity-70">
        {description}
      </p>

    </div>
  );
};

export default EmptyState;