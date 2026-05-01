import { useState } from 'react'
import { useDatasets, useDataset, useAnalytics } from '../hooks/useDatasets'
import DataTable from '../components/ui/DataTable'
import BarChartView from '../components/charts/BarChartView'
import CorrelationHeatmap from '../components/charts/CorrelationHeatmap'
import { useCorrelations } from '../hooks/useDatasets'

export default function Explore() {
  const { data: datasets = [] } = useDatasets()
  const [selectedId, setSelectedId] = useState('')
  const [selectedField, setSelectedField] = useState('')

  const { data: dataset } = useDataset(selectedId)
  const { data: analytics } = useAnalytics(selectedId, selectedField)
  const { data: correlations } = useCorrelations(selectedId)

  const numericCols = dataset?.columns?.filter(c => c.type === 'number') || []

  return (
    <div className="space-y-6">
      <div className="flex gap-4 flex-wrap">
        <select
          value={selectedId}
          onChange={e => { setSelectedId(e.target.value); setSelectedField('') }}
          className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a dataset…</option>
          {datasets.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>

        {numericCols.length > 0 && (
          <select
            value={selectedField}
            onChange={e => setSelectedField(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-gray-200 text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a field to analyse…</option>
            {numericCols.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
          </select>
        )}
      </div>

      {analytics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {['min','max','avg','count'].map(k => (
            <div key={k} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{k}</p>
              <p className="text-white font-bold text-xl">{Number(analytics[k]).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}

      {analytics?.distribution && (
        <BarChartView
          data={analytics.distribution}
          xKey="_id"
          yKey="count"
          title={`Distribution of ${selectedField}`}
        />
        
      )}
      {correlations && (
        <CorrelationHeatmap
          labels={correlations.labels}
          matrix={correlations.matrix}
        />
      )}

      {dataset?.preview && (
        <div>
          <h3 className="text-white font-semibold mb-3">Data Preview (first 20 rows)</h3>
          <DataTable data={dataset.preview} />
        </div>
      )}

      {!selectedId && (
        <div className="text-center py-20 text-gray-600">
          Select a dataset above to start exploring
        </div>
      )}
    </div>
  )
}
