import { useDatasets } from '../hooks/useDatasets'
import BarChartView from '../components/charts/BarChartView'
import LineChartView from '../components/charts/LineChartView'
import ScatterPlot from '../components/charts/ScatterPlot'

export default function Reports() {
  const { data: datasets = [] } = useDatasets()

  const sizeData = datasets.map(d => ({ name: d.name, value: d.rowCount || 0 }))
  const timeData = datasets.map((d, i) => ({
    name: new Date(d.createdAt).toLocaleDateString(),
    value: i + 1,
  }))

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-1">Reports Overview</h3>
        <p className="text-gray-400 text-sm">Aggregated views across all your uploaded datasets.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BarChartView data={sizeData} xKey="name" yKey="value" title="Dataset Size Comparison (rows)" />
        <LineChartView data={timeData} xKey="name" yKey="value" title="Cumulative Datasets Uploaded" />
      </div>

      <ScatterPlot
        data={datasets.map(d => ({ x: d.columns?.length || 0, y: d.rowCount || 0 }))}
        xKey="x"
        yKey="y"
        title="Columns vs Rows per Dataset"
      />
    </div>
  )
}
