import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/validation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
  ) {}

  validate (input: any): Error {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    if (!emailRegex.test((input[this.fieldName]))) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
