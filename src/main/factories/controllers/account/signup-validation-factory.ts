import { CpfValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/validation/protocols'
import { CompareFieldsValidation, CpfValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation', 'ra', 'course', 'cpf']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email'))
  validations.push(new CpfValidation('cpf', new CpfValidatorAdapter()))
  return new ValidationComposite(validations)
}
