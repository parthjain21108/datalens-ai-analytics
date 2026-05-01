import { Database, TrendingUp, FileText, Activity } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import BarChartView from '../components/charts/BarChartView'
import LineChartView from '../components/charts/LineChartView'
import { useDatasets } from '../hooks/useDatasets'

const mockTrend = Array.from({ length: 12 }, (_, i) => ({
  name: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
  value: Math.floor(Math.random() * 900 + 100),
}))

export default function Dashboard() {
  const { data: datasets = [], isLoading } = useDatasets()

  const totalRows = datasets.reduce((s, d) => s + (d.rowCount || 0), 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Datasets" value={isLoading ? '…' : datasets.length} subtitle="Uploaded CSV files" icon={Database} color="blue" />
        <StatCard title="Total Rows" value={isLoading ? '…' : totalRows.toLocaleString()} subtitle="Across all datasets" icon={FileText} color="green" />
        <StatCard title="Analyses Run" value="34" subtitle="Last 30 days" icon={TrendingUp} color="purple" />
        <StatCard title="API Health" value="99.9%" subtitle="Uptime this month" icon={Activity} color="amber" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <BarChartView data={mockTrend} xKey="name" yKey="value" title="Monthly Data Ingested (rows)" />
        <LineChartView data={mockTrend} xKey="name" yKey="value" title="Query Volume Over Time" />
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-semibold mb-4">Recent Datasets</h3>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : datasets.length === 0 ? (
          <p className="text-gray-500 text-sm">No datasets yet. <a href="/upload" className="text-blue-400 hover:underline">Upload one →</a></p>
        ) : (
          <div className="space-y-2">
            {datasets.slice(0, 5).map(d => (
              <div key={d._id} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                <div>
                  <p className="text-white text-sm font-medium">{d.name}</p>
                  <p className="text-gray-500 text-xs">{d.rowCount} rows · {d.columns?.length} columns</p>
                </div>
                <span className="text-gray-600 text-xs">{new Date(d.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
