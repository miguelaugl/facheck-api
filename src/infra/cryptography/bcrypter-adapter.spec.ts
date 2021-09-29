import bcrypt from 'bcrypt'

import { BcrypterAdapter } from './bcrypter-adapter'

const salt = 12

const makeSut = (): BcrypterAdapter => {
  return new BcrypterAdapter(salt)
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'valid_hash'
  },
}))

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('should return a valid hash on success', async () => {
    const sut = makeSut()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('valid_hash')
  })
})
