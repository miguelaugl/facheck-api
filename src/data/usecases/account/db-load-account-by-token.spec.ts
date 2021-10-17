import { Decrypter } from '@/data/protocols'

import { DbLoadAccountByToken } from './db-load-account-by-token'

describe('DbLoadAccountByToken Usecase', () => {
  it('should call Decrypter with correct token', async () => {
    class DecrypterSpy implements Decrypter {
      value: string
      result = 'any_value'

      async decrypt (value: string): Promise<string> {
        this.value = value
        return this.result
      }
    }
    const decrypterSpy = new DecrypterSpy()
    const sut = new DbLoadAccountByToken(decrypterSpy)
    await sut.load('any_token')
    expect(decrypterSpy.value).toBe('any_token')
  })
})
