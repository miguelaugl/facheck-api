import { InvalidParamError } from '@/presentation/errors'

import { Validation } from '../protocols'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompare: string,
  ) {}

  validate (input: any): Error {
    return new InvalidParamError(this.fieldToCompare)
  }
}
