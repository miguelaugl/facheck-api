import { CpfValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/validation/protocols'
import { CompareFieldsValidation, CpfValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

import { makeSignUpValidation } from './signup-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('SignUpValidation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation', 'ra', 'course', 'cpf']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email'))
    validations.push(new CpfValidation('cpf', new CpfValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
