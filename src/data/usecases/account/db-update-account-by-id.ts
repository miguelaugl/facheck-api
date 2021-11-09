import { UpdateAccountByIdRepository } from '@/data/protocols'
import { UpdateAccountById } from '@/domain/usecases'

export class DbUpdateAccountById implements UpdateAccountById {
  constructor (
    private readonly updateAccountByIdRepository: UpdateAccountByIdRepository,
  ) {}

  async update (data: UpdateAccountById.Params): Promise<UpdateAccountById.Result> {
    await this.updateAccountByIdRepository.updateAccountById(data)
    return null
  }
}
