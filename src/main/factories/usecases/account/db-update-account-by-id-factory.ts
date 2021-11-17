import { DbUpdateAccountById } from '@/data/usecases/account/db-update-account-by-id'
import { UpdateAccountById } from '@/domain/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbUpdateAccountById = (): UpdateAccountById => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbUpdateAccountById(accountMongoRepository, accountMongoRepository)
}
