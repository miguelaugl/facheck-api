import { Encrypter } from '@/data/protocols/encrypter'
import { AddAccountModel } from '@/domain/usecases'

import { DbAddAccount } from './db-add-account'

type SutTypes = {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'hashed_value'
    }
  }
  return new EncrypterStub()
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub,
  }
}

describe('DbAddAccount Usecase', () => {
  it('should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const addAccountData: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      course: 'valid_course',
      cpf: 'valid_cpf',
      ra: 'valid_ra',
    }
    await sut.add(addAccountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const addAccountData: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
      course: 'valid_course',
      cpf: 'valid_cpf',
      ra: 'valid_ra',
    }
    const promise = sut.add(addAccountData)
    await expect(promise).rejects.toThrow()
  })
})
