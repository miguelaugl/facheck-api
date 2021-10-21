import { Validation } from '@/validation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

export const makeAddMonitoringValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['subject', 'weekday', 'initHour', 'endHour', 'room']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
