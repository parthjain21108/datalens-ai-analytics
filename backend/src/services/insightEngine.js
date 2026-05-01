const { pearsonCorrelation } = require('../utils/statistics')

function generateInsights(dataset) {
  const insights = []

  const numericColumns = dataset.columns.filter(
    c => c.type === 'number'
  )

  // Overview
  insights.push({
    type: 'overview',
    severity: 'info',
    title: 'Dataset Overview',
    message: `Dataset contains ${dataset.rowCount} rows and ${dataset.columns.length} columns.`,
  })

  // Strongest correlation
  let strongest = {
    score: 0,
    a: '',
    b: '',
  }

  for (let i = 0; i < numericColumns.length; i++) {
    for (let j = i + 1; j < numericColumns.length; j++) {

      const colA = numericColumns[i].name
      const colB = numericColumns[j].name

      const valuesA = dataset.rows
        .map(r => Number(r[colA]))
        .filter(v => !isNaN(v))

      const valuesB = dataset.rows
        .map(r => Number(r[colB]))
        .filter(v => !isNaN(v))

      const len = Math.min(
        valuesA.length,
        valuesB.length
      )

      if (len < 2) continue

      const corr = pearsonCorrelation(
        valuesA.slice(0, len),
        valuesB.slice(0, len)
      )

      if (Math.abs(corr) > Math.abs(strongest.score)) {
        strongest = {
          score: corr,
          a: colA,
          b: colB,
        }
      }
    }
  }

  if (strongest.a && strongest.b) {
    insights.push({
      type: 'correlation',
      severity:
        Math.abs(strongest.score) > 0.8
          ? 'high'
          : 'medium',

      title: 'Strong Correlation Found',

      message:
        `${strongest.a} and ${strongest.b} ` +
        `show a correlation of ${strongest.score.toFixed(2)}.`,
    })
  }

  // Variability analysis
  numericColumns.forEach(col => {

    const values = dataset.rows
      .map(r => Number(r[col.name]))
      .filter(v => !isNaN(v))

    if (!values.length) return

    const avg =
      values.reduce((a, b) => a + b, 0) /
      values.length

    const variance =
      values.reduce(
        (s, v) => s + (v - avg) ** 2,
        0
      ) / values.length

    const stdDev = Math.sqrt(variance)

    if (stdDev > avg * 0.5) {
      insights.push({
        type: 'variance',
        severity: 'medium',

        title: 'High Variability Detected',

        message:
          `${col.name} shows unusually high variation ` +
          `and may contain outliers.`,
      })
    }
  })

  // Recommendations
  if (numericColumns.length >= 2) {
    insights.push({
      type: 'recommendation',
      severity: 'info',

      title: 'Recommended Analysis',

      message:
        'This dataset is suitable for trend and correlation analysis.',
    })
  }

  return insights
}

module.exports = {
  generateInsights,
}