import { AddAccountRepository } from '@/data/protocols'

import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    const result = await accountsCollection.insertOne(accountData)
    return result.insertedId !== null
  }
}
