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
  async compare (): Promise<boolean> {
    return true
  },
}))

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('should call bcrypt.hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a valid hash on bcrypt.hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('valid_hash')
    })

    it('should throw if bcrypt.hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    it('should call bcrypt.compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'hashed_value')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'hashed_value')
    })

    it('should return true if bcrypt.compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'hashed_value')
      expect(isValid).toBe(true)
    })

    it('should throw if bcrypt.compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.compare('any_value', 'hashed_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
