const Dataset = require('../models/Dataset')
const { pearsonCorrelation } = require('../utils/statistics')
const { generateInsights } = require('../services/insightEngine')

exports.analyse = async (req, res, next) => {
  try {
    const { field } = req.query
    if (!field) return res.status(400).json({ message: 'field query parameter required' })

    const dataset = await Dataset.findOne({ _id: req.params.id, owner: req.user._id })
      .select('+rows').lean()
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' })

    const col = dataset.columns.find(c => c.name === field)
    if (!col) return res.status(400).json({ message: `Column "${field}" not found` })
    if (col.type !== 'number') return res.status(400).json({ message: `Column "${field}" is not numeric` })

    const values = dataset.rows.map(r => Number(r[field])).filter(v => !isNaN(v))
    if (!values.length) return res.status(400).json({ message: 'No valid numeric values found' })

    const sorted = [...values].sort((a, b) => a - b)
    const sum    = values.reduce((s, v) => s + v, 0)
    const avg    = sum / values.length
    const min    = sorted[0]
    const max    = sorted[sorted.length - 1]
    const mid    = Math.floor(sorted.length / 2)
    const median = sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2

    // Variance & std dev
    const variance = values.reduce((s, v) => s + (v - avg) ** 2, 0) / values.length
    const stdDev   = Math.sqrt(variance)

    // Histogram: 10 equal-width buckets
    const bucketSize = (max - min) / 10 || 1
    const buckets    = {}
    values.forEach(v => {
      const bucket = Math.floor((v - min) / bucketSize)
      const key    = `${(min + bucket * bucketSize).toFixed(1)}–${(min + (bucket + 1) * bucketSize).toFixed(1)}`
      buckets[key] = (buckets[key] || 0) + 1
    })
    const distribution = Object.entries(buckets).map(([_id, count]) => ({ _id, count }))

    res.json({ field, count: values.length, min, max, avg, median, stdDev, distribution })

    
  } catch (e) { next(e) }
}

exports.correlations = async (req, res, next) => {
  try {
    const dataset = await Dataset
      .findOne({
        _id: req.params.id,
        owner: req.user._id,
      })
      .select('+rows')
      .lean()

    if (!dataset) {
      return res.status(404).json({
        message: 'Dataset not found',
      })
    }

    const numericColumns = dataset.columns.filter(
      c => c.type === 'number'
    )

    const matrix = []

    for (let i = 0; i < numericColumns.length; i++) {
      const row = []

      for (let j = 0; j < numericColumns.length; j++) {
        const colA = numericColumns[i].name
        const colB = numericColumns[j].name

        const valuesA = dataset.rows
          .map(r => Number(r[colA]))
          .filter(v => !isNaN(v))

        const valuesB = dataset.rows
          .map(r => Number(r[colB]))
          .filter(v => !isNaN(v))

        const minLength = Math.min(
          valuesA.length,
          valuesB.length
        )

        if (minLength === 0) {
          row.push(0)
          continue
        }

        const corr = pearsonCorrelation(
          valuesA.slice(0, minLength),
          valuesB.slice(0, minLength)
        )

        row.push(
          Number(
            (isNaN(corr) ? 0 : corr).toFixed(2)
          )
        )
      }

      matrix.push(row)
    }

    res.json({
      labels: numericColumns.map(c => c.name),
      matrix,
    })

  } catch (e) {
    next(e)
  }
}
exports.insights = async (req, res, next) => {
  try {

    const dataset = await Dataset
      .findOne({
        _id: req.params.id,
        owner: req.user._id,
      })
      .select('+rows')
      .lean()

    if (!dataset) {
      return res.status(404).json({
        message: 'Dataset not found',
      })
    }

    const insights = generateInsights(dataset)

    res.json({
      insights,
    })

  } catch (e) {
    next(e)
  }
}