import { InvalidParamError } from '@/presentation/errors'

import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFields Validation', () => {
  it('should return an InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'other_value' })
    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })
})
