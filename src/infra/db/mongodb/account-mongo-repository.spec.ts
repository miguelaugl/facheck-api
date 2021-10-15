import { Collection } from 'mongodb'

import { AccountMongoRepository } from './account-mongo-repository'
import { MongoHelper } from './mongo-helper'

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
      const isValid = await sut.add({
        name: 'any_name',
        email: 'any_email',
        password: 'hashed_password',
        course: 'any_course',
        cpf: 'any_cpf',
        ra: 'any_ra',
      })
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    it('should return an account on success', async () => {
      await accountCollection.insertOne({
        name: 'Miguel Freitas',
        email: 'any_email@mail.com',
        password: 'hashed_password',
        course: 'any_course',
        cpf: 'any_cpf',
        ra: 'any_ra',
      })
      const sut = makeSut()
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('Miguel Freitas')
    })

    it('should return null if load fails', async () => {
      await accountCollection.insertOne({
        name: 'Miguel Freitas',
        email: 'any_email@mail.com',
        password: 'hashed_password',
        course: 'any_course',
        cpf: 'any_cpf',
        ra: 'any_ra',
      })
      const sut = makeSut()
      const account = await sut.loadByEmail('invalid_email@mail.com')
      expect(account).toBeFalsy()
    })
  })
})
