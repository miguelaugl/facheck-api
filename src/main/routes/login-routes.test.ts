import { hash } from 'bcrypt'
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

  describe('POST /login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('12345', 12)
      await accountCollection.insertOne({
        name: 'Miguel Freitas',
        email: 'realemail@mail.com',
        password,
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'realemail@mail.com',
          password: '12345',
        })
        .expect(200)
    })
  })
})
