const { Schema, model } = require('mongoose')

const ColumnSchema = new Schema({
  name: String,
  type: { type: String, enum: ['string', 'number', 'boolean', 'date', 'unknown'] },
}, { _id: false })

const DatasetSchema = new Schema({
  name:      { type: String, required: true, trim: true },
  owner:     { type: Schema.Types.ObjectId, ref: 'User' },
  columns:   [ColumnSchema],
  rowCount:  { type: Number, default: 0 },
  fileSize:  { type: Number, default: 0 },
  // Store actual rows as an array of mixed objects (fine for small-medium CSVs)
  rows:      { type: [Schema.Types.Mixed], select: false },
}, { timestamps: true })

DatasetSchema.index({ owner: 1, createdAt: -1 })

module.exports = model('Dataset', DatasetSchema)
