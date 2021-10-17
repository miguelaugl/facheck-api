import { AccountModel } from '@/domain/models'

export interface LoadAccountByTokenRepository {
  loadAccountByToken: (accessToken: string, role?: string) => Promise<LoadAccountByTokenRepository.Result>
}

export namespace LoadAccountByTokenRepository {
  export type Result = AccountModel
}
