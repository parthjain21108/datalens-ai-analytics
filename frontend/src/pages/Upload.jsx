import { useState } from 'react'
import FileUploader from '../components/ui/FileUploader'
import { useDatasets } from '../hooks/useDatasets'

export default function Upload() {
  const { data: datasets = [], refetch } = useDatasets()
  const [recent, setRecent] = useState(null)

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-white font-semibold text-lg mb-1">Upload a Dataset</h2>
        <p className="text-gray-400 text-sm mb-6">Upload a CSV file to start analysing your data.</p>
        <FileUploader onSuccess={d => { setRecent(d); refetch() }} />
      </div>

      {recent && (
        <div className="bg-green-950/40 border border-green-800 rounded-xl p-5">
          <h3 className="text-green-300 font-semibold mb-2">Upload complete</h3>
          <p className="text-green-400 text-sm">Dataset: <strong>{recent.name}</strong></p>
          <p className="text-green-400 text-sm">Rows: {recent.rowCount} · Columns: {recent.columns?.length}</p>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">All Datasets ({datasets.length})</h3>
        {datasets.length === 0 ? (
          <p className="text-gray-500 text-sm">No datasets uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {datasets.map(d => (
              <li key={d._id} className="flex justify-between items-center py-2 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-white text-sm">{d.name}</p>
                  <p className="text-gray-500 text-xs">{d.rowCount} rows · {d.columns?.length} columns</p>
                </div>
                <span className="text-gray-600 text-xs">{new Date(d.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
