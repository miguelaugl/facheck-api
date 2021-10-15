import { HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'
import { Authentication } from '@/domain/usecases'

export class DbAuthenticate implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(params.email)
    if (!account) {
      return null
    }
    await this.hashComparer.compare(params.password, account.password)
  }
}
