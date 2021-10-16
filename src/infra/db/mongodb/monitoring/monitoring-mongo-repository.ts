import { AddMonitoringRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db/mongodb'

export class MonitoringMongoRepository implements AddMonitoringRepository {
  async add (params: AddMonitoringRepository.Params): Promise<void> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    await monitoringsCollection.insertOne(params)
  }
}
