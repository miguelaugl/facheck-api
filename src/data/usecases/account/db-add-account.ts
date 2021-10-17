import { Hasher, AddAccountRepository } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
  ) {}

  async add (accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const isValid = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword,
    })
    return isValid
  }
}