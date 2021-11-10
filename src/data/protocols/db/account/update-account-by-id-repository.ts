import { UpdateAccountById } from '@/domain/usecases'

export interface UpdateAccountByIdRepository {
  updateById: (data: UpdateAccountByIdRepository.Params) => Promise<UpdateAccountByIdRepository.Result>
}

export namespace UpdateAccountByIdRepository {
  export type Params = UpdateAccountById.Params
  export type Result = UpdateAccountById.Result
}
