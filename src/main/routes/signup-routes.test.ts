import { Collection } from 'mongodb'
import request from 'supertest'

import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import app from '@/main/config/app'

let accountCollection: Collection

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Miguel Augusto',
          email: 'realemail@mail.com',
          password: '12345',
          passwordConfirmation: '12345',
          ra: '1780481911025',
          course: 'ADS',
          cpf: '85790781055',
        })
        .expect(200)
    })
  })
})
