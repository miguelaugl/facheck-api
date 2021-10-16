import { AccountModel } from '@/domain/models'
import { AddAccount, Authentication } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  course: 'any_course',
  cpf: 'any_cpf',
  ra: 'any_ra',
})

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  cpf: 'any_cpf',
  email: 'any_email',
  name: 'any_name',
  password: 'hashed_password',
  ra: 'any_ra',
  course: 'any_course',
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email@mail.com',
  password: 'any_password',
})
