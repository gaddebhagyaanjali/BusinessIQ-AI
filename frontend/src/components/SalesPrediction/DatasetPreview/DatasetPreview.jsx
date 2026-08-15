function DatasetPreview({ data }) {

  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-bold mb-6">
        📊 Dataset Preview
      </h2>

      <div className="overflow-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-slate-100">

              {columns.map((column) => (

                <th
                  key={column}
                  className="p-3 text-left border"
                >
                  {column}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {data.slice(0, 5).map((row, index) => (

              <tr
                key={index}
                className="hover:bg-slate-50"
              >

                {columns.map((column) => (

                  <td
                    key={column}
                    className="p-3 border"
                  >
                    {row[column]}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default DatasetPreview;