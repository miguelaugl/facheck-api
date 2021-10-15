import { Encrypter, HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'
import { AccountModel } from '@/domain/models'

import { DbAuthenticate } from './db-authenticate'

const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  cpf: 'any_cpf',
  email: 'any_email',
  name: 'any_name',
  password: 'hashed_password',
  ra: 'any_ra',
  course: 'any_course',
})

type SutTypes = {
  sut: DbAuthenticate
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
}

const makeEncrypterStub = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }
  return new EncrypterStub()
}

const makeHasherComparerStub = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hashedValue: string): Promise<boolean> {
      return true
    }
  }
  return new HashComparerStub()
}

const makeLoadAccountByEmailRepositoryStub = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepositoryStub()
  const hashComparerStub = makeHasherComparerStub()
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAuthenticate(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
  }
}

describe('DbAuthenticate Usecase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    await sut.auth(authParams)
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(Promise.reject(new Error()))
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    const promise = sut.auth(authParams)
    await expect(promise).rejects.toThrow()
  })

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    const result = await sut.auth(authParams)
    expect(result).toBe(null)
  })

  it('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    await sut.auth(authParams)
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.reject(new Error()))
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    const promise = sut.auth(authParams)
    await expect(promise).rejects.toThrow()
  })

  it('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    const result = await sut.auth(authParams)
    expect(result).toBe(null)
  })

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    await sut.auth(authParams)
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(Promise.reject(new Error()))
    const authParams = {
      email: 'any_email@mail.com',
      password: 'any_password',
    }
    const promise = sut.auth(authParams)
    await expect(promise).rejects.toThrow()
  })
})
