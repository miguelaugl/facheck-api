import { DbLoadAccountByToken } from '@/data/usecases/account/db-load-account-by-token'
import { JwtAdapter } from '@/infra/cryptography'
import { AccountMongoRepository } from '@/infra/db/mongodb'
import env from '@/main/config/env'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const jwtAdapter = new JwtAdapter(env.jwtSecretKey)
  const accountMongoRepository = new AccountMongoRepository()
  const dbLoadAccountByToken = new DbLoadAccountByToken(jwtAdapter, accountMongoRepository)
  return new AuthMiddleware(dbLoadAccountByToken, role)
}
