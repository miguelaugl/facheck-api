import { AccountModel } from '../models'

export interface LoadAccountByToken {
  loadAccountByToken: (accessToken: string, role?: string) => Promise<LoadAccountByToken.Result>
}

export namespace LoadAccountByToken {
  export type Result = AccountModel
}
