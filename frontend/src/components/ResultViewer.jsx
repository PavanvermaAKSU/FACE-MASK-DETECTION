export default function ResultViewer({
  image
}) {

  if (!image) return null;

  return (

    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      p-4
      mt-5
      "
    >

      <h3 className="font-semibold mb-3">
        Detection Result
      </h3>

      <img
        src={image}
        alt=""
        className="
        rounded-xl
        w-full
        "
      />

    </div>

  );
}