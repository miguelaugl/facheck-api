import { ObjectId } from 'mongodb'

import { AddMonitoringRepository, LoadMonitoringByIdRepository, LoadMonitoringsRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db/mongodb'

export class MonitoringMongoRepository implements AddMonitoringRepository, LoadMonitoringsRepository, LoadMonitoringByIdRepository {
  async add (params: AddMonitoringRepository.Params): Promise<void> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    await monitoringsCollection.insertOne(params)
  }

  async loadAll (): Promise<LoadMonitoringsRepository.Result> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    const monitorings = await monitoringsCollection.aggregate([
      {
        $lookup: {
          from: 'accounts',
          localField: 'monitorId',
          foreignField: '_id',
          as: 'monitor',
        },
      },
      {
        $project: {
          _id: 1,
          subject: 1,
          weekday: 1,
          initHour: 1,
          endHour: 1,
          room: 1,
          monitor: { $arrayElemAt: ['$monitor', 0] },
        },
      },
    ]).toArray()
    return monitorings && MongoHelper.mapCollection(monitorings)
  }

  async loadById (monitoringId: string): Promise<LoadMonitoringByIdRepository.Result> {
    const monitoringsCollection = MongoHelper.getCollection('monitorings')
    const monitoring = await monitoringsCollection.aggregate([
      {
        $match: {
          _id: new ObjectId(monitoringId),
        },
      },
      {
        $lookup: {
          from: 'accounts',
          localField: 'monitorId',
          foreignField: '_id',
          as: 'monitor',
        },
      },
      {
        $project: {
          _id: 1,
          subject: 1,
          weekday: 1,
          initHour: 1,
          endHour: 1,
          room: 1,
          monitor: { $arrayElemAt: ['$monitor', 0] },
        },
      },
    ]).toArray()
    return monitoring.length && MongoHelper.map(monitoring[0])
  }
}
