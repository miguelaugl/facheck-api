import { MonitoringModel } from '@/domain/models'

export interface AddMonitoring {
  add: (params: AddMonitoring.Params) => Promise<void>
}

export namespace AddMonitoring {
  export type Params = Omit<MonitoringModel, 'id'>
}
