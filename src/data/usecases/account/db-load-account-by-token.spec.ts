import { Decrypter, LoadAccountByTokenRepository } from '@/data/protocols'
import { mockAccountModel } from '@/domain/tests'

import { DbLoadAccountByToken } from './db-load-account-by-token'

class LoadAccountByTokenRepositorySpy implements LoadAccountByTokenRepository {
  accessToken: string
  role?: string
  result = mockAccountModel()

  async loadAccountByToken (accessToken: string, role?: string): Promise<LoadAccountByTokenRepository.Result> {
    this.accessToken = accessToken
    this.role = role
    return this.result
  }
}

class DecrypterSpy implements Decrypter {
  value: string
  result = 'any_value'

  async decrypt (value: string): Promise<string> {
    this.value = value
    return this.result
  }
}

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadAccountByTokenRepositorySpy,
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct token', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load('any_token', 'any_role')
    expect(decrypterSpy.value).toBe('any_token')
  })

  it('should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockReturnValueOnce(null)
    const account = await sut.load('any_token')
    expect(account).toBe(null)
  })

  it('should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    await sut.load('any_token', 'any_role')
    expect(loadAccountByTokenRepositorySpy.accessToken).toBe('any_token')
    expect(loadAccountByTokenRepositorySpy.role).toBe('any_role')
  })

  it('should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadAccountByToken').mockReturnValueOnce(null)
    const account = await sut.load('any_token')
    expect(account).toBe(null)
  })
})
