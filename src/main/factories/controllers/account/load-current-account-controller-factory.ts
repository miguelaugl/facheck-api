import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbLoadAccountById } from '@/main/factories/usecases'
import { LoadCurrentAccountController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadCurrentAccountController = (): Controller => {
  const controller = new LoadCurrentAccountController(makeDbLoadAccountById())
  return makeLogControllerDecorator(controller)
}
