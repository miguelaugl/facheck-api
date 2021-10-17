import { sign } from 'jsonwebtoken'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import request from 'supertest'

import { mockAddMonitoringParams, mockMonitoringModel, mockMonitoringModels } from '@/domain/tests'
import { MongoHelper } from '@/infra/db/mongodb'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { HttpStatusCode } from '@/presentation/protocols'

const makeAccessToken = async (): Promise<string> => {
  const result = await accountCollection.insertOne({
    name: 'Miguel',
    email: 'realmail@outlook.com',
    password: '123',
    role: 'monitor',
  })
  const accountId = result.insertedId
  const accessToken = sign({ id: accountId }, env.jwtSecretKey)
  await accountCollection.updateOne({
    _id: accountId,
  }, {
    $set: {
      accessToken,
    },
  })
  return accessToken
}

let monitoringCollection: Collection
let accountCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    monitoringCollection = MongoHelper.getCollection('monitorings')
    accountCollection = MongoHelper.getCollection('accounts')
    await monitoringCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })

  describe('POST /monitorings', () => {
    it('should return 403 on add monitoring without accessToken', async () => {
      await request(app)
        .post('/api/monitorings')
        .send(mockAddMonitoringParams())
        .expect(HttpStatusCode.FORBIDDEN)
    })

    it('should return 204 on add monitoring with valid token', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/monitorings')
        .set('x-access-token', accessToken)
        .send(mockAddMonitoringParams())
        .expect(HttpStatusCode.NO_CONTENT)
    })
  })

  describe('GET /monitorings', () => {
    it('should return 403 on load monitorings without accessToken', async () => {
      await request(app)
        .get('/api/monitorings')
        .expect(HttpStatusCode.FORBIDDEN)
    })

    it('should return 200 on load monitorings with valid accessToken', async () => {
      const accessToken = await makeAccessToken()
      await monitoringCollection.insertMany(mockMonitoringModels())
      await request(app)
        .get('/api/monitorings')
        .set('x-access-token', accessToken)
        .expect(HttpStatusCode.OK)
    })

    it('should return 204 on load monitorings with valid accessToken and empty list', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .get('/api/monitorings')
        .set('x-access-token', accessToken)
        .expect(HttpStatusCode.NO_CONTENT)
    })
  })

  describe('GET /monitorings/:monitoringId', () => {
    it('should return 403 on load monitoring without accessToken', async () => {
      await request(app)
        .get('/api/monitorings/any_id')
        .expect(HttpStatusCode.FORBIDDEN)
    })

    it('should return 200 on load monitoring with valid token', async () => {
      const res = await monitoringCollection.insertOne(mockMonitoringModel())
      const accessToken = await makeAccessToken()
      await request(app)
        .get(`/api/monitorings/${res.insertedId.toString()}`)
        .set('x-access-token', accessToken)
        .expect(HttpStatusCode.OK)
    })
  })
})
