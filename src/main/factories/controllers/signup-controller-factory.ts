import { DbAddAccount } from '@/data/usecases/db-add-account'
import { BcrypterAdapter } from '@/infra/cryptography/bcrypter-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'
import { SignUpController } from '@/presentation/controllers/signup'

import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypterAdapter, accountMongoRepository)
  const validation = makeSignUpValidation()
  return new SignUpController(dbAddAccount, validation)
}
