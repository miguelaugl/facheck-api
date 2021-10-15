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

type SutTypes = {
  sut: DbAuthenticate
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const sut = new DbAuthenticate(loadAccountByEmailRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
  }
}

describe('DbAuthenticate Usecase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    await sut.auth(authParams)
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()))
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    const promise = sut.auth(authParams)
    await expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    const result = await sut.auth(authParams)
    expect(result).toBe(null)
  })
})
