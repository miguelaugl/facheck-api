import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/validation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (
    private readonly fieldName: string,
  ) {}

  validate (input: any): Error {
    return new MissingParamError(this.fieldName)
  }
}
