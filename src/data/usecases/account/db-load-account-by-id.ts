import { LoadAccountByIdRepository } from '@/data/protocols'
import { LoadAccountById } from '@/domain/usecases'

export class DbLoadAccountById implements LoadAccountById {
  constructor (
    private readonly loadAccountByIdRepository: LoadAccountByIdRepository,
  ) {}

  async load (id: string): Promise<LoadAccountById.Result> {
    const account = await this.loadAccountByIdRepository.loadById(id)
    if (!account) {
      return null
    }
    return account
  }
}
