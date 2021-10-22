import { LoadMonitoringById } from '@/domain/usecases'

export interface LoadMonitoringByIdRepository {
  loadById: (monitoringId: string) => Promise<LoadMonitoringByIdRepository.Result>
}

export namespace LoadMonitoringByIdRepository {
  export type Result = LoadMonitoringById.Result
}
