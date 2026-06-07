export default function StatsCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-5
      shadow-lg
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div
          className={`
          p-3
          rounded-xl
          ${color}
          `}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}