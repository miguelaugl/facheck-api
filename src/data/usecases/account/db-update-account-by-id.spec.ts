import { LoadAccountByIdRepository, UpdateAccountByIdRepository } from '@/data/protocols'
import { mockAccountModel, mockUpdateAccountByIdParams } from '@/domain/tests'

import { DbUpdateAccountById } from './db-update-account-by-id'

class LoadAccountByIdRepositorySpy implements LoadAccountByIdRepository {
  accountId: string
  result = mockAccountModel()

  async loadById (accountId: string): Promise<UpdateAccountByIdRepository.Result> {
    this.accountId = accountId
    return this.result
  }
}

class UpdateAccountByIdRepositorySpy implements UpdateAccountByIdRepository {
  params: UpdateAccountByIdRepository.Params
  result = mockAccountModel()

  async updateById (data: UpdateAccountByIdRepository.Params): Promise<UpdateAccountByIdRepository.Result> {
    this.params = data
    return this.result
  }
}

type SutTypes = {
  sut: DbUpdateAccountById
  updateAccountByIdRepositorySpy: UpdateAccountByIdRepositorySpy
  loadAccountByIdRepositorySpy: LoadAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadAccountByIdRepositorySpy = new LoadAccountByIdRepositorySpy()
  const updateAccountByIdRepositorySpy = new UpdateAccountByIdRepositorySpy()
  const sut = new DbUpdateAccountById(loadAccountByIdRepositorySpy, updateAccountByIdRepositorySpy)
  return {
    sut,
    loadAccountByIdRepositorySpy,
    updateAccountByIdRepositorySpy,
  }
}

describe('DbUpdateAccountById Usecase', () => {
  it('should call LoadAccountByIdRepository with correct accountId', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    const updateAccountByIdParams = mockUpdateAccountByIdParams()
    await sut.update(updateAccountByIdParams)
    expect(loadAccountByIdRepositorySpy.accountId).toEqual(updateAccountByIdParams.accountId)
  })

  it('should return null if LoadAccountByIdRepository returns null', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    loadAccountByIdRepositorySpy.result = null
    const account = await sut.update(mockUpdateAccountByIdParams())
    expect(account).toBe(null)
  })

  it('should throw if LoadAccountByIdRepository throws', async () => {
    const { sut, loadAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByIdRepositorySpy, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.update(mockUpdateAccountByIdParams())
    await expect(promise).rejects.toThrow()
  })

  it('should call UpdateAccountByIdRepository with correct values', async () => {
    const { sut, updateAccountByIdRepositorySpy } = makeSut()
    const updateAccountByIdParams = mockUpdateAccountByIdParams()
    await sut.update(updateAccountByIdParams)
    expect(updateAccountByIdRepositorySpy.params).toEqual(updateAccountByIdParams)
  })

  it('should throw if UpdateAccountByIdRepository throws', async () => {
    const { sut, updateAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(updateAccountByIdRepositorySpy, 'updateById').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.update(mockUpdateAccountByIdParams())
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.update(mockUpdateAccountByIdParams())
    expect(account).toEqual(mockAccountModel())
  })
})
