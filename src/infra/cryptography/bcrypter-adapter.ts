import bcrypt from 'bcrypt'

import { HashComparer, Hasher } from '@/data/protocols'

export class BcrypterAdapter implements Hasher, HashComparer {
  constructor (
    private readonly salt: number,
  ) {}

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, valueToCompare: string): Promise<boolean> {
    await bcrypt.compare(value, valueToCompare)
    return null
  }
}
