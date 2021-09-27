import { InvalidParamError } from '@/presentation/errors'
import { CpfValidator } from '@/validation/protocols'

import { CpfValidation } from './cpf-validation'

type SutTypes = {
  sut: CpfValidation
  cpfValidatorStub: CpfValidator
}

const makeCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    isValid (cpf: string): boolean {
      return true
    }
  }
  return new CpfValidatorStub()
}

const makeSut = (): SutTypes => {
  const cpfValidatorStub = makeCpfValidator()
  const sut = new CpfValidation('cpf', cpfValidatorStub)
  return {
    sut,
    cpfValidatorStub,
  }
}

describe('Cpf Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const { sut } = makeSut()
    const error = sut.validate({ cpf: 'any_cpf' })
    expect(error).toEqual(new InvalidParamError('cpf'))
  })
})
