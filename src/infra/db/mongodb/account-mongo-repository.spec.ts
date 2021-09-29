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

  it('should add an account on success', async () => {
    const sut = makeSut()
    const isValid = await sut.add({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      course: 'valid_course',
      cpf: 'valid_cpf',
      ra: 'valid_ra',
    })
    expect(isValid).toBe(true)
  })
})
