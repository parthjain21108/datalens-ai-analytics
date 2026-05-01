const request = require('supertest')
const app     = require('../src/app')

describe('GET /api/health', () => {
  it('returns 200 ok', async () => {
    const res = await request(app).get('/api/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
  })
})

describe('POST /api/auth/register', () => {
  it('rejects missing fields', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'x@x.com' })
    expect(res.status).toBe(400)
  })
})

describe('GET /api/datasets', () => {
  it('requires auth', async () => {
    const res = await request(app).get('/api/datasets')
    expect(res.status).toBe(401)
  })
})
