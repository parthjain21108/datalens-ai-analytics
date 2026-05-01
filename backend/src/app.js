const express     = require('express')
const cors        = require('cors')
const helmet      = require('helmet')
const morgan      = require('morgan')
const rateLimit   = require('express-rate-limit')

const datasetRoutes   = require('./routes/datasets')
const analyticsRoutes = require('./routes/analytics')
const authRoutes      = require('./routes/auth')
const errorHandler    = require('./middlewares/errorHandler')

const app = express()

// Security
app.use(helmet())
app.use(cors({
  origin: (process.env.CORS_ORIGINS || 'http://localhost:3000').split(','),
  credentials: true,
}))
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200, standardHeaders: true, legacyHeaders: false }))

// Logging & parsing
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }))

// Routes
app.use('/api/auth',      authRoutes)
app.use('/api/datasets',  datasetRoutes)
app.use('/api/analytics', analyticsRoutes)

// 404
app.use((_, res) => res.status(404).json({ message: 'Route not found' }))

// Error handler
app.use(errorHandler)

module.exports = app
