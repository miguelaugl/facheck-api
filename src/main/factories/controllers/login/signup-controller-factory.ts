import { DbAddAccount, DbAuthentication } from '@/data/usecases'
import { BcrypterAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import env from '@/main/config/env'
import { SignUpController } from '@/presentation/controllers'

import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecretKey)
  const dbAddAccount = new DbAddAccount(bcrypterAdapter, accountMongoRepository, accountMongoRepository)
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository)
  const validation = makeSignUpValidation()
  return new SignUpController(dbAddAccount, validation, dbAuthentication)
}
