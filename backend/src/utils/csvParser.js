const { parse } = require('csv-parse/sync')

function detectType(values) {
  const sample = values.filter(Boolean).slice(0, 50)
  if (sample.every(v => !isNaN(Number(v)))) return 'number'
  if (sample.every(v => ['true','false','1','0'].includes(v.toLowerCase()))) return 'boolean'
  if (sample.every(v => !isNaN(Date.parse(v)) && v.length > 4)) return 'date'
  return 'string'
}

function parseCSV(buffer) {
  const records = parse(buffer, {
    columns:          true,
    skip_empty_lines: true,
    trim:             true,
    cast:             false,
  })

  if (!records.length) throw new Error('CSV file is empty or has no valid rows')

  const columnNames = Object.keys(records[0])

  const columns = columnNames.map(name => ({
    name,
    type: detectType(records.map(r => r[name])),
  }))

  // Cast numeric columns
  const rows = records.map(row => {
    const out = {}
    columns.forEach(({ name, type }) => {
      out[name] = type === 'number' ? Number(row[name]) : row[name]
    })
    return out
  })

  return { columns, rows, rowCount: rows.length }
}

module.exports = { parseCSV }
