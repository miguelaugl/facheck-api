import { MonitoringModel } from '@/domain/models'

export interface LoadMonitoringByIdRepository {
  loadById: (monitoringId: string) => Promise<LoadMonitoringByIdRepository.Result>
}

export namespace LoadMonitoringByIdRepository {
  export type Result = MonitoringModel
}
