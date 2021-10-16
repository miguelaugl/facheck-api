import { Collection } from 'mongodb'

import { mockAddAccountParams } from '@/domain/tests'
import { MongoHelper } from '@/infra/db/mongodb'

import { AccountMongoRepository } from './account-mongo-repository'

let accountCollection: Collection

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('add()', () => {
    it('should add an account on success', async () => {
      const sut = makeSut()
      const isValid = await sut.add(mockAddAccountParams())
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    it('should return an account on success', async () => {
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const sut = makeSut()
      const account = await sut.loadByEmail(addAccountParams.email)
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe(addAccountParams.name)
    })

    it('should return null if load fails', async () => {
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const sut = makeSut()
      const account = await sut.loadByEmail('invalid_email@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    it('should update the account accessToken on success', async () => {
      const sut = makeSut()
      const result = await accountCollection.insertOne({
        name: 'Miguel Freitas',
        email: 'any_email@mail.com',
        password: 'hashed_password',
        course: 'any_course',
        cpf: 'any_cpf',
        ra: 'any_ra',
      })
      const fakeAccount = await accountCollection.findOne({ _id: result.insertedId })
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = 'any_token'
      await sut.updateAccessToken(fakeAccount._id, accessToken)
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account.accessToken).toBe(accessToken)
    })
  })
})
