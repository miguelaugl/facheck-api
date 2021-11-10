import { LoadAccountByIdRepository, UpdateAccountByIdRepository } from '@/data/protocols'
import { UpdateAccountById } from '@/domain/usecases'

export class DbUpdateAccountById implements UpdateAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
    private readonly updateAccountByIdRepository: UpdateAccountByIdRepository,
  ) {}

  async update (data: UpdateAccountById.Params): Promise<UpdateAccountById.Result> {
    const checkAccount = await this.loadAccountByIdRepository.loadById(data.accountId)
    if (!checkAccount) {
      return null
    }
    const account = await this.updateAccountByIdRepository.updateById(data)
    return account
  }
}
