import { MissingParamError } from '../../presentation/errors'
import { Validation } from '../protocols'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return null
      }
    }
    const validationStub = new ValidationStub()
    const validationStub2 = new ValidationStub()
    const sut = new ValidationComposite([validationStub, validationStub2])
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
