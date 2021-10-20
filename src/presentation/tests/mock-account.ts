import { mockAccountModel } from '@/domain/tests'
import { AddAccount, Authentication } from '@/domain/usecases'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (params: Authentication.Params): Promise<Authentication.Result> {
      return {
        accessToken: 'any_token',
        name: mockAccountModel().name,
      }
    }
  }
  return new AuthenticationStub()
}

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccount.Params): Promise<AddAccount.Result> {
      return true
    }
  }
  return new AddAccountStub()
}
