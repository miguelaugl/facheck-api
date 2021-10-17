import { Collection } from 'mongodb'

import { mockAddMonitoringParams, mockMonitoringModel, mockMonitoringModels } from '@/domain/tests'
import { MongoHelper } from '@/infra/db/mongodb'

import { MonitoringMongoRepository } from './monitoring-mongo-repository'

let monitoringsCollection: Collection

const makeSut = (): MonitoringMongoRepository => {
  return new MonitoringMongoRepository()
}

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

  describe('add()', () => {
    it('should add a monitoring on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddMonitoringParams())
      const count = await monitoringsCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    it('should load a list of monitorings', async () => {
      const monitoringsModels = mockMonitoringModels()
      await monitoringsCollection.insertMany(monitoringsModels)
      const sut = makeSut()
      const monitorings = await sut.loadAll()
      expect(monitorings).toHaveLength(2)
      expect(monitorings[0].id).toBeTruthy()
      expect(monitorings[0].subject).toBe(monitoringsModels[0].subject)
      expect(monitorings[1].subject).toBe(monitoringsModels[1].subject)
    })

    it('should return an empty array if there is no monitorings', async () => {
      const sut = makeSut()
      const monitorings = await sut.loadAll()
      expect(monitorings).toEqual([])
    })
  })

  describe('loadById()', () => {
    it('should load a monitoring by id on success', async () => {
      const monitoringModel = mockMonitoringModel()
      const res = await monitoringsCollection.insertOne(monitoringModel)
      const sut = makeSut()
      const monitoring = await sut.loadById(res.insertedId.toString())
      expect(monitoring.id).toBeTruthy()
      expect(monitoring.id).toEqual(res.insertedId)
      expect(monitoring.subject).toBe(monitoringModel.subject)
    })
  })
})
