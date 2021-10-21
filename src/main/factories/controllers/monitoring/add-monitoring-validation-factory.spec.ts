import MockDate from 'mockdate'

import { Validation } from '@/validation/protocols'
import { RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

import { makeAddMonitoringValidation } from './add-monitoring-validation-factory'

jest.mock('@/validation/validators/validation-composite')

describe('AddMonitoringValidation Factory', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  it('should call ValidationComposite with all validations', () => {
    makeAddMonitoringValidation()
    const validations: Validation[] = []
    for (const field of ['subject', 'weekday', 'initHour', 'endHour', 'room']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
