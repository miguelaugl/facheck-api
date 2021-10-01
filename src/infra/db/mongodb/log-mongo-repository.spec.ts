import { Collection } from 'mongodb'

import { LogMongoRepository } from './log-mongo-repository'
import { MongoHelper } from './mongo-helper'

let errorsCollection: Collection

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorsCollection = MongoHelper.getCollection('errors')
    await errorsCollection.deleteMany({})
  })

  it('should add an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('stack')
    const count = await errorsCollection.countDocuments()
    expect(count).toBe(1)
  })
})
