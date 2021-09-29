export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export type Params = {
    name: string
    email: string
    password: string
    ra: string
    course: string
    cpf: string
    isMonitor?: boolean
  }
  export type Result = boolean
}
