import { Decrypter } from '@/data/protocols'
import { LoadAccountByToken } from '@/domain/usecases'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
  ) {}

  async load (accessToken: string, role?: string): Promise<LoadAccountByToken.Result> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
