import bcrypt from 'bcrypt'

import { BcrypterAdapter } from './bcrypter-adapter'

const salt = 12

describe('Bcrypt Adapter', () => {
  it('should call bcrypt with correct values', async () => {
    const sut = new BcrypterAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
