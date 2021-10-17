import { DbAddAccount } from '@/data/usecases'
import { BcrypterAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import { SignUpController } from '@/presentation/controllers'

import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const bcrypterAdapter = new BcrypterAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypterAdapter, accountMongoRepository)
  const validation = makeSignUpValidation()
  return new SignUpController(dbAddAccount, validation)
}
