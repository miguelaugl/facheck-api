import { AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'

export const mockLoadAccountByEmailRepositoryResult = (): LoadAccountByEmailRepository.Result => ({
  id: 'any_id',
  name: 'any_name',
  password: 'hashed_password',
  role: 'any_role',
})

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
      return true
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (accountId: string, accessToken: string): Promise<void> {}
  }
  return new UpdateAccessTokenRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<LoadAccountByEmailRepository.Result> {
      return mockLoadAccountByEmailRepositoryResult()
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
