import { UpdateAccountById } from '@/domain/usecases'
import { HttpRequest } from '@/presentation/protocols'

import { UpdateAccountByIdController } from './update-account-by-id'

describe('UpdateAccountById Controller', () => {
  it('should call UpdateAccountById with correct values', async () => {
    class UpdateAccountByIdSpy implements UpdateAccountById {
      accountId: string
      params: UpdateAccountById.Params

      async update (accountId: string, params: UpdateAccountById.Params): Promise<UpdateAccountById.Result> {
        this.accountId = accountId
        this.params = params
        return null
      }
    }
    const updateAccountByIdSpy = new UpdateAccountByIdSpy()
    const sut = new UpdateAccountByIdController(updateAccountByIdSpy)
    const httpRequest: HttpRequest = {
      accountId: 'any_id',
      body: {
        name: 'any_name',
        email: 'any_email',
      },
    }
    await sut.handle(httpRequest)
    expect(updateAccountByIdSpy.accountId).toBe('any_id')
    expect(updateAccountByIdSpy.params).toEqual({
      name: 'any_name',
      email: 'any_email',
    })
  })
})
