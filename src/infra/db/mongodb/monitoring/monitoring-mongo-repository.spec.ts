import { Collection } from 'mongodb'

import { mockAddMonitoringParams } from '@/domain/test'
import { MongoHelper } from '@/infra/db/mongodb'

import { MonitoringMongoRepository } from './monitoring-mongo-repository'

let monitoringsCollection: Collection

describe('Monitoring Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    monitoringsCollection = MongoHelper.getCollection('monitorings')
    await monitoringsCollection.deleteMany({})
  })

  it('should add a monitoring on success', async () => {
    const sut = new MonitoringMongoRepository()
    await sut.add(mockAddMonitoringParams())
    const count = await monitoringsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
