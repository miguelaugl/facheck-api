import { Encrypter } from '@/data/protocols/encrypter'
import { AddAccountModel } from '@/domain/usecases'

import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usecase', () => {
  it('should call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return 'hashed_value'
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
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
})
