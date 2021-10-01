import { cpf } from 'cpf-cnpj-validator'

import { CpfValidatorAdapter } from './cpf-validator-adapter'

describe('CpfValidator Adapter', () => {
  it('should call cpf-cnpj-validator.cpf with correct cpf', () => {
    const sut = new CpfValidatorAdapter()
    const isValidSpy = jest.spyOn(cpf, 'isValid')
    sut.isValid('any_cpf')
    expect(isValidSpy).toHaveBeenCalledWith('any_cpf')
  })
})
