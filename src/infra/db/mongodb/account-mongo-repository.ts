import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'

import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    const result = await accountsCollection.insertOne(accountData)
    return result.insertedId !== null
  }

  async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    const account = await accountsCollection.findOne({
      email,
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1,
      },
    })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (accountId: string, accessToken: string): Promise<void> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    await accountsCollection.updateOne({
      _id: accountId,
    }, {
      $set: {
        accessToken,
      },
    })
  }
}
