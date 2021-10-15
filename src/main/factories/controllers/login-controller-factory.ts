import { DbAuthenticate } from '@/data/usecases/db-authenticate'
import { BcrypterAdapter } from '@/infra/cryptography/bcrypter-adapter'
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import env from '@/main/config/env'
import { LoginController } from '@/presentation/controllers/login'

import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): LoginController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecretKey)
  const authentication = new DbAuthenticate(accountMongoRepository, bcrypterAdapter, jwtAdapter, accountMongoRepository)
  const validation = makeLoginValidation()
  return new LoginController(authentication, validation)
}
