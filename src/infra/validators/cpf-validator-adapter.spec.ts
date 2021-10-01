import { cpf } from 'cpf-cnpj-validator'

import { CpfValidatorAdapter } from './cpf-validator-adapter'

jest.mock('cpf-cnpj-validator', () => ({
  cpf: {
    isValid (): boolean {
      return true
    },
  },
}))

const makeSut = (): CpfValidatorAdapter => {
  return new CpfValidatorAdapter()
}

describe('CpfValidator Adapter', () => {
  it('should call validator with correct cpf', () => {
    const sut = makeSut()
    const isValidSpy = jest.spyOn(cpf, 'isValid')
    sut.isValid('any_cpf')
    expect(isValidSpy).toHaveBeenCalledWith('any_cpf')
  })

  it('should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_cpf')
    expect(isValid).toBe(true)
  })

  it('should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(cpf, 'isValid').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_cpf')
    expect(isValid).toBe(false)
  })
})
