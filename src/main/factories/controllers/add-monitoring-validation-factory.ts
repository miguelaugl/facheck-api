import { Validation } from '@/validation/protocols'
import { PastDateValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddMonitoringValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['subject', 'initDate', 'endDate', 'room']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new PastDateValidation('initDate'))
  return new ValidationComposite(validations)
}
