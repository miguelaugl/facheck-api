import { AccountModel } from '@/domain/models'

export interface UpdateAccountById {
  update: (accountId: string, data: UpdateAccountById.Params) => Promise<UpdateAccountById.Result>
}

export namespace UpdateAccountById {
  export type Params = {
    name?: string
    email?: string
    ra?: string
    course?: string
    cpf?: string
  }
  export type Result = AccountModel
}
