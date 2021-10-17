import { Validation } from '@/validation/protocols'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

import { makeLoginValidation } from './login-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('LoginValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
