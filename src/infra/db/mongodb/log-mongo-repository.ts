import { LogErrorRepository } from '@/data/protocols'

import { MongoHelper } from './mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorsCollection = MongoHelper.getCollection('errors')
    await errorsCollection.insertOne({ stack, date: new Date() })
  }
}
