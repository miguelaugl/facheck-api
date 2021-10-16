import { AddMonitoring } from '@/domain/usecases'

export interface AddMonitoringRepository {
  add: (params: AddMonitoring.Params) => Promise<void>
}

export namespace AddMonitoringRepository {
  export type Params = AddMonitoring.Params
}
