import { AccountModel } from '@/domain/models'

export interface LoadAccountByIdRepository {
  loadById: (id: string) => Promise<LoadAccountByIdRepository.Result>
}

export namespace LoadAccountByIdRepository {
  export type Result = AccountModel
}
