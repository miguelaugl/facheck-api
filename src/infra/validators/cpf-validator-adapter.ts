import { cpf } from 'cpf-cnpj-validator'

import { CpfValidator } from '@/validation/protocols'

export class CpfValidatorAdapter implements CpfValidator {
  isValid (value: string): boolean {
    return cpf.isValid(value)
  }
}
