import { DbLoadAccountById } from '@/data/usecases'
import { AccountMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadAccountById = (): DbLoadAccountById => {
  const accountMongoRepository = new AccountMongoRepository()
  return new DbLoadAccountById(accountMongoRepository)
}
