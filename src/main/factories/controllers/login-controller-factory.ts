import { DbAuthentication } from '@/data/usecases'
import { JwtAdapter, BcrypterAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import env from '@/main/config/env'
import { LoginController } from '@/presentation/controllers'

import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): LoginController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecretKey)
  const authentication = new DbAuthentication(accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository)
  const validation = makeLoginValidation()
  return new LoginController(authentication, validation)
}
