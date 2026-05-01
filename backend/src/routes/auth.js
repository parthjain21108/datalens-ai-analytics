const router = require('express').Router()
const jwt    = require('jsonwebtoken')
const User   = require('../models/User')

const sign = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' })
    const user  = await User.create({ name, email, password })
    res.status(201).json({ token: sign(user._id), user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) { next(e) }
})

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' })
    res.json({ token: sign(user._id), user: { id: user._id, name: user.name, email: user.email } })
  } catch (e) { next(e) }
})

module.exports = router
