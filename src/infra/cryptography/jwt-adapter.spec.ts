import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  },
  async verify (): Promise<string> {
    return 'any_payload'
  },
}))

const secret = 'ultra_secret'

const makeSut = (): JwtAdapter => new JwtAdapter(secret)

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    it('should call sign with correct values', async () => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_value')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, secret)
    })

    it('should return a token on sign success', async () => {
      const sut = makeSut()
      const accessToken = await sut.encrypt('any_value')
      expect(accessToken).toBe('any_token')
    })

    it('should throw if sign throws', async () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.encrypt('any_value')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    it('should call verify with correct values', async () => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', secret)
    })

    it('should return a payload on verify success', async () => {
      const sut = makeSut()
      const payload = await sut.decrypt('any_token')
      expect(payload).toBe('any_payload')
    })
  })
})
