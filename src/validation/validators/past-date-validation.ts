import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/validation/protocols'

export class PastDateValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    return new InvalidParamError(this.fieldName)
  }
}
