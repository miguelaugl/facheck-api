import { InvalidParamError } from '@/presentation/errors'
import { CpfValidator, Validation } from '@/validation/protocols'

export class CpfValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator,
  ) {}

  validate (input: any): Error {
    this.cpfValidator.isValid(input[this.fieldName])
    return new InvalidParamError(this.fieldName)
  }
}
