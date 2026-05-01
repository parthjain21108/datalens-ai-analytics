const Dataset   = require('../models/Dataset')
const { parseCSV } = require('../utils/csvParser')

exports.list = async (req, res, next) => {
  try {
    const datasets = await Dataset.find({ owner: req.user._id })
      .select('-rows')
      .sort('-createdAt')
      .lean()
    res.json({ datasets })
  } catch (e) { next(e) }
}

exports.get = async (req, res, next) => {
  try {
    const dataset = await Dataset.findOne({ _id: req.params.id, owner: req.user._id })
      .select('+rows')
      .lean()
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' })
    res.json({ dataset: { ...dataset, preview: dataset.rows.slice(0, 20), rows: undefined } })
  } catch (e) { next(e) }
}

exports.upload = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const { columns, rows, rowCount } = parseCSV(req.file.buffer)
    const name = (req.body.name || req.file.originalname).replace(/\.csv$/i, '').trim()
    const dataset = await Dataset.create({
      name,
      owner:    req.user._id,
      columns,
      rows,
      rowCount,
      fileSize: req.file.size,
    })
    res.status(201).json({ dataset: { ...dataset.toObject(), rows: undefined } })
  } catch (e) { next(e) }
}

exports.remove = async (req, res, next) => {
  try {
    const dataset = await Dataset.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
    if (!dataset) return res.status(404).json({ message: 'Dataset not found' })
    res.json({ message: 'Dataset deleted' })
  } catch (e) { next(e) }
}
