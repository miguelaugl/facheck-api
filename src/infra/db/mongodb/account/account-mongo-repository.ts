import { AddAccountRepository, LoadAccountByEmailRepository, LoadAccountByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { MongoHelper } from '@/infra/db/mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository, LoadAccountByTokenRepository {
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
        role: 1,
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

  async loadByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    const accountsCollection = MongoHelper.getCollection('accounts')
    const account = await accountsCollection.findOne({
      accessToken,
      $or: [{
        role,
      }, {
        role: 'admin',
      }],
    })
    return account && MongoHelper.map(account)
  }
}
