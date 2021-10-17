import jwt from 'jsonwebtoken'

import { Decrypter, Encrypter } from '@/data/protocols'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secretOrKey: string) {}

  async encrypt (value: string): Promise<string> {
    const result = await jwt.sign({ id: value }, this.secretOrKey)
    return result
  }

  async decrypt (value: string): Promise<string> {
    const result = await jwt.verify(value, this.secretOrKey)
    return result as string
  }
}
