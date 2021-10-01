import { cpf } from 'cpf-cnpj-validator'

import { CpfValidatorAdapter } from './cpf-validator-adapter'

jest.mock('cpf-cnpj-validator', () => ({
  cpf: {
    isValid (): boolean {
      return true
    },
  },
}))

describe('CpfValidator Adapter', () => {
  it('should call validator with correct cpf', () => {
    const sut = new CpfValidatorAdapter()
    const isValidSpy = jest.spyOn(cpf, 'isValid')
    sut.isValid('any_cpf')
    expect(isValidSpy).toHaveBeenCalledWith('any_cpf')
  })

  it('should returns true if validator returns true', () => {
    const sut = new CpfValidatorAdapter()
    const isValid = sut.isValid('valid_cpf')
    expect(isValid).toBe(true)
  })
})
