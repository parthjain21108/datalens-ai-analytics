function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length
}

function pearsonCorrelation(x, y) {
  const mx = mean(x)
  const my = mean(y)

  let numerator = 0
  let dx = 0
  let dy = 0

  for (let i = 0; i < x.length; i++) {
    const a = x[i] - mx
    const b = y[i] - my

    numerator += a * b
    dx += a * a
    dy += b * b
  }

  return numerator / Math.sqrt(dx * dy)
}

module.exports = {
  pearsonCorrelation,
}