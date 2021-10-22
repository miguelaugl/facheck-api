import { Collection } from 'mongodb'

import { Weekday } from '@/domain/models'
import { mockAddAccountParams, mockAddMonitoringParams } from '@/domain/tests'
import { MongoHelper } from '@/infra/db/mongodb'

import { MonitoringMongoRepository } from './monitoring-mongo-repository'

let monitoringsCollection: Collection
let accountCollection: Collection

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
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
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
      const addAccountParams = mockAddAccountParams()
      const { insertedId: accountOneId } = await accountCollection.insertOne({ ...addAccountParams })
      const { insertedId: accountTwoId } = await accountCollection.insertOne({ ...addAccountParams })
      const monitoringsModels = [
        {
          id: 'any_id',
          initHour: 'any_hour',
          endHour: 'any_hour',
          monitorId: accountOneId,
          room: 'any_room',
          subject: 'any_subject',
          weekday: Weekday.MONDAY,
        },
        {
          id: 'other_id',
          initHour: 'other_hour',
          endHour: 'other_hour',
          monitorId: accountTwoId,
          room: 'other_room',
          subject: 'other_subject',
          weekday: Weekday.SUNDAY,
        },
      ]
      await monitoringsCollection.insertMany(monitoringsModels)
      const sut = makeSut()
      const monitorings = await sut.loadAll()
      expect(monitorings).toHaveLength(2)
      expect(monitorings[0].id).toBeTruthy()
      expect(monitorings[0].monitor).toBeTruthy()
      expect(monitorings[0].subject).toBe(monitoringsModels[0].subject)
      expect(monitorings[1].id).toBeTruthy()
      expect(monitorings[1].monitor).toBeTruthy()
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
      const addAccountParams = mockAddAccountParams()
      const { insertedId: accountOneId } = await accountCollection.insertOne({ ...addAccountParams })
      const monitoringModel = {
        id: 'any_id',
        initHour: 'any_hour',
        endHour: 'any_hour',
        monitorId: accountOneId,
        room: 'any_room',
        subject: 'any_subject',
        weekday: Weekday.MONDAY,
      }
      const res = await monitoringsCollection.insertOne(monitoringModel)
      const sut = makeSut()
      const monitoring = await sut.loadById(res.insertedId.toString())
      expect(monitoring.id).toBeTruthy()
      expect(monitoring.id).toEqual(res.insertedId)
      expect(monitoring.monitor).toBeTruthy()
      expect(monitoring.subject).toBe(monitoringModel.subject)
    })
  })
})
