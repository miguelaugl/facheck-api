import { makeLogControllerDecorator } from '@/main/factories/decorators'
import { makeDbUpdateAccountById } from '@/main/factories/usecases'
import { UpdateAccountByIdController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeUpdateAccountByIdController = (): Controller => {
  const controller = new UpdateAccountByIdController(makeDbUpdateAccountById())
  return makeLogControllerDecorator(controller)
}
