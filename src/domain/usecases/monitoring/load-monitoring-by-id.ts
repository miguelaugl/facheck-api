import { MonitoringModel } from '@/domain/models'

export interface LoadMonitoringById {
  load: (monitoringId: string) => Promise<LoadMonitoringById.Result>
}

export namespace LoadMonitoringById {
  export type Result = MonitoringModel
}
