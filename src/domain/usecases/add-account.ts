import { AccountModel } from '@/domain/models'

export type AddAccountModel = {
  name: string
  email: string
  password: string
  ra: string
  course: string
  cpf: string
  isMonitor?: boolean
}

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
