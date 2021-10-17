import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbAuthentication } from '@/main/factories/usecases'
import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

import { makeLoginValidation } from './login-validation-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
