import { Collection } from 'mongodb'
import request from 'supertest'

import { mockAddMonitoringParams } from '@/domain/tests'
import { MongoHelper } from '@/infra/db/mongodb'
import app from '@/main/config/app'
import { HttpStatusCode } from '@/presentation/protocols'

let monitoringCollection: Collection

describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    monitoringCollection = MongoHelper.getCollection('monitorings')
    await monitoringCollection.deleteMany({})
  })

  describe('POST /monitorings', () => {
    it('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/monitorings')
        .send(mockAddMonitoringParams())
        .expect(HttpStatusCode.FORBIDDEN)
    })
  })
})
