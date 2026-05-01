import ReactECharts from 'echarts-for-react'

export default function CorrelationHeatmap({
  labels,
  matrix,
}) {
  const data = []

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      data.push([i, j, matrix[i][j]])
    }
  }

  const option = {
    tooltip: {
      position: 'top',
    },

    xAxis: {
      type: 'category',
      data: labels,
    },

    yAxis: {
      type: 'category',
      data: labels,
    },

    visualMap: {
      min: -1,
      max: 1,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '5%',
    },

    series: [
      {
        type: 'heatmap',
        data,
        label: {
          show: true,
        },
      },
    ],
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
      <h3 className="text-white font-semibold mb-6">
        Correlation Heatmap
      </h3>

      <ReactECharts
        option={option}
        style={{ height: 500 }}
      />
    </div>
  )
}