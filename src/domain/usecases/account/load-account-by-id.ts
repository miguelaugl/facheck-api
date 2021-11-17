import { AccountModel } from '@/domain/models'

export interface LoadAccountById {
  load: (id: string) => Promise<LoadAccountById.Result>
}

export namespace LoadAccountById {
  export type Result = AccountModel
}
