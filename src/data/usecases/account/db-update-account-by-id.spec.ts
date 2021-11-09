import { UpdateAccountByIdRepository } from '@/data/protocols'
import { UpdateAccountById } from '@/domain/usecases'

import { DbUpdateAccountById } from './db-update-account-by-id'

describe('DbUpdateAccountById Usecase', () => {
  it('should call UpdateAccountByIdRepository with correct values', async () => {
    class UpdateAccountByIdRepositorySpy implements UpdateAccountByIdRepository {
      params: UpdateAccountByIdRepository.Params

      async updateAccountById (data: UpdateAccountByIdRepository.Params): Promise<UpdateAccountByIdRepository.Result> {
        this.params = data
        return null
      }
    }
    const updateAccountByIdRepositorySpy = new UpdateAccountByIdRepositorySpy()
    const sut = new DbUpdateAccountById(updateAccountByIdRepositorySpy)
    const updateAccountByIdParams: UpdateAccountById.Params = {
      accountId: 'any_id',
      name: 'any_name',
      email: 'any_email',
      cpf: 'any_cpf',
      ra: 'any_ra',
      course: 'any_course',
    }
    await sut.update(updateAccountByIdParams)
    expect(updateAccountByIdRepositorySpy.params).toEqual(updateAccountByIdParams)
  })
})
