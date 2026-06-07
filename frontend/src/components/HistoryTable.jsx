export default function HistoryTable({
  history
}) {

  return (

    <div
      className="
      bg-slate-900
      border
      border-slate-800
      rounded-2xl
      overflow-hidden
      "
    >

      <table className="w-full">

        <thead>

          <tr className="bg-slate-800">

            <th className="p-4">
              ID
            </th>

            <th>
              Label
            </th>

            <th>
              Confidence
            </th>

            <th>
              Date
            </th>

          </tr>

        </thead>

        <tbody>

          {history.map(
            (item) => (

              <tr
                key={item.id}
                className="
                border-t
                border-slate-700
                "
              >

                <td className="p-4">
                  {item.id}
                </td>

                <td>
                  {item.label}
                </td>

                <td>
                  {(
                    item.confidence *
                    100
                  ).toFixed(1)}
                  %
                </td>

                <td>
                  {item.created_at}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}