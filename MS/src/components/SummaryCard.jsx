export default function SummaryCard({
  title,
  value,
}) {
  return (
    <div className="card bg-base-100 shadow">

      <div className="card-body">

        <h2 className="text-sm text-gray-500">
          {title}
        </h2>

        <p className="text-3xl font-bold">
          {value}
        </p>

      </div>

    </div>
  );
}