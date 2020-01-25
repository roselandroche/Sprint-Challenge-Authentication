const supertest = require('supertest')
const db = require('../database/dbConfig')
const authModel = require('./auth-model')
const server = require('../api/server')

beforeEach(async () => {
    await db.seed.run()
})

describe('authModel', () => {
    test('add', async () => {
        const res = await authModel.add({ username: 'Carmen Sandiego', password: 'abc123' })
        expect(res.username).toBe('Carmen Sandiego')
        expect(res.id).toBe(3)
    })
    test('findBy', async () => {
        const res = await authModel.findBy({ username: 'Don'}).first()
        expect(res.username).toBe('Don')
        expect(res.id).toBe(1)
    })
    test('findById', async () => {
        const res = await authModel.findById(2)
        expect(res.username).toBe('Sara')
        expect(res.id).toBe(2)
    })
})