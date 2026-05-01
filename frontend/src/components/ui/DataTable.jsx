export default function DataTable({ data = [], columns = [] }) {
  if (!data.length) {
    return (
      <div className="text-center py-12 text-gray-500 text-sm">No data to display</div>
    )
  }

  const cols = columns.length ? columns : Object.keys(data[0])

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-900 border-b border-gray-800">
            {cols.map(col => (
              <th key={col} className="px-4 py-3 text-left text-gray-400 font-medium capitalize">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors">
              {cols.map(col => (
                <td key={col} className="px-4 py-3 text-gray-300">
                  {String(row[col] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
