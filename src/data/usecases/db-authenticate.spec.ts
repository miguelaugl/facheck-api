import { LoadAccountByEmailRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'

import { DbAuthenticate } from './db-authenticate'

const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  cpf: 'any_cpf',
  email: 'any_email',
  name: 'any_name',
  password: 'any_password',
  ra: 'any_ra',
  course: 'any_course',
})

describe('DbAuthenticate Usecase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async loadByEmail (email: string): Promise<AccountModel> {
        return mockAccountModel()
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthenticate(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    await sut.auth(authParams)
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
