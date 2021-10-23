export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    id: string
    accessToken: string
    name: string
    role?: string
  }
}
