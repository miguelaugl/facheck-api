import { LoadAccountByIdRepository, UpdateAccountByIdRepository } from '@/data/protocols'
import { UpdateAccountById } from '@/domain/usecases'

export class DbUpdateAccountById implements UpdateAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly updateAccountByIdRepository: UpdateAccountByIdRepository,
  ) {}

  async update (accountId: string, params: UpdateAccountById.Params): Promise<UpdateAccountById.Result> {
    const checkAccount = await this.loadAccountByIdRepository.loadById(accountId)
    if (!checkAccount) {
      return null
    }
    const account = await this.updateAccountByIdRepository.updateById(accountId, params)
    return account
  }
}
