import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/validation/protocols'

export class PastDateValidation implements Validation {
  constructor (private readonly fieldName: string, private readonly today = new Date()) {}

  validate (input: any): Error {
    const isPastDate = this.today.getTime() > input[this.fieldName].getTime()
    if (isPastDate) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
