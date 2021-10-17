import { sign } from 'jsonwebtoken'
import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import request from 'supertest'

import { mockAddMonitoringParams } from '@/domain/tests'
import { MongoHelper } from '@/infra/db/mongodb'
import app from '@/main/config/app'
import { HttpStatusCode } from '@/presentation/protocols'

import env from '../config/env'

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
      await request(app)
        .post('/api/monitorings')
        .set('x-access-token', accessToken)
        .send(mockAddMonitoringParams())
        .expect(HttpStatusCode.NO_CONTENT)
    })
  })
})
