export default function Table({ headers, rows }) {
  return (
    <table className="min-w-full bg-white border rounded shadow">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left p-2 border-b">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((cols, idx) => (
          <tr key={idx} className="border-t">
            {cols.map((col, i) => (
              <td key={i} className="p-2">
                {col}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
