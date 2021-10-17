import { Decrypter } from '@/data/protocols'

import { DbLoadAccountByToken } from './db-load-account-by-token'

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
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy)
  return {
    sut,
    decrypterSpy,
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct token', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load('any_token')
    expect(decrypterSpy.value).toBe('any_token')
  })
})
