import { AddAccountRepository, Encrypter } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { AddAccountModel } from '@/domain/usecases'

import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const makeFakeData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
  course: 'valid_course',
  cpf: 'valid_cpf',
  ra: 'valid_ra',
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password',
        course: 'valid_course',
        cpf: 'valid_cpf',
        ra: 'valid_ra',
      }
    }
  }
  return new AddAccountRepositoryStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_password'
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub,
  }
}

describe('DbAddAccount Usecase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(makeFakeData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeData())
    await expect(promise).rejects.toThrow()
  })

  it('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      course: 'valid_course',
      cpf: 'valid_cpf',
      ra: 'valid_ra',
    })
  })

  it('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.add(makeFakeData())
    await expect(promise).rejects.toThrow()
  })

  it('should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeData())
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
      course: 'valid_course',
      cpf: 'valid_cpf',
      ra: 'valid_ra',
    })
  })
})
