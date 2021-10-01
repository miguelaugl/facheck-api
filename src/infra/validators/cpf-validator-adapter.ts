import { cpf } from 'cpf-cnpj-validator'

import { CpfValidator } from '@/validation/protocols'

export class CpfValidatorAdapter implements CpfValidator {
  isValid (value: string): boolean {
    cpf.isValid(value)
    return null
  }
}
