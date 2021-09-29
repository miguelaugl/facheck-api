import bcrypt from 'bcrypt'

import { BcrypterAdapter } from './bcrypter-adapter'

const salt = 12

const makeSut = (): BcrypterAdapter => {
  return new BcrypterAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
