import { AddMonitoringRepository, LoadMonitoringsRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db/mongodb'

export class MonitoringMongoRepository implements AddMonitoringRepository, LoadMonitoringsRepository {
  async add (params: AddMonitoringRepository.Params): Promise<void> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    await monitoringsCollection.insertOne(params)
  }

  async loadAll (): Promise<LoadMonitoringsRepository.Result> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    const monitorings = await monitoringsCollection.find().toArray()
    return monitorings && MongoHelper.mapCollection(monitorings)
  }
}
