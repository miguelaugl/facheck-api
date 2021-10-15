export interface Login {
  login: (params: Login.Params) => Promise<Login.Result>
}

export namespace Login {
  export type Params = {
    email: string
    password: string
  }
  export type Result = string
}
