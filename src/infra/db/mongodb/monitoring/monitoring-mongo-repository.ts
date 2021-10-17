import { ObjectId } from 'bson'

import { AddMonitoringRepository, LoadMonitoringByIdRepository, LoadMonitoringsRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db/mongodb'

export class MonitoringMongoRepository implements AddMonitoringRepository, LoadMonitoringsRepository, LoadMonitoringByIdRepository {
  async add (params: AddMonitoringRepository.Params): Promise<void> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    await monitoringsCollection.insertOne(params)
  }

  async loadAll (): Promise<LoadMonitoringsRepository.Result> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    const monitorings = await monitoringsCollection.find().toArray()
    return monitorings && MongoHelper.mapCollection(monitorings)
  }

  async loadById (monitoringId: string): Promise<LoadMonitoringByIdRepository.Result> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    const monitoring = await monitoringsCollection.findOne({
      _id: new ObjectId(monitoringId),
    })
    return monitoring && MongoHelper.map(monitoring)
  }
}
