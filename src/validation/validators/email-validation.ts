import { InvalidParamError } from '@/presentation/errors'
import { EmailValidator, Validation } from '@/validation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate (input: any): Error {
    return new InvalidParamError(this.fieldName)
  }
}
