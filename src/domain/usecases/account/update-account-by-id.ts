import { AccountModel } from '@/domain/models'

export interface UpdateAccountById {
  update: (data: UpdateAccountById.Params) => Promise<UpdateAccountById.Result>
}

export namespace UpdateAccountById {
  export type Params = {
    accountId: string
    name: string
    email: string
    ra: string
    course: string
    cpf: string
  }
  export type Result = AccountModel
}
