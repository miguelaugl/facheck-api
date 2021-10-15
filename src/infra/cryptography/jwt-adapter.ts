import jwt from 'jsonwebtoken'

import { Encrypter } from '@/data/protocols'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secretOrKey: string) {}

  async encrypt (value: string): Promise<string> {
    const result = await jwt.sign({ id: value }, this.secretOrKey)
    return result
  }
}
