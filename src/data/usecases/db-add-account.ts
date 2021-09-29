import { Encrypter } from '@/data/protocols/encrypter'
import { AccountModel } from '@/domain/models'
import { AddAccount, AddAccountModel } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return null
  }
}
