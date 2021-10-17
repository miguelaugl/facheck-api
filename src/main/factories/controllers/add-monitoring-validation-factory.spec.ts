import MockDate from 'mockdate'

import { Validation } from '@/validation/protocols'
import { PastDateValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'

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
    for (const field of ['subject', 'initDate', 'endDate', 'room']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new PastDateValidation('initDate'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
