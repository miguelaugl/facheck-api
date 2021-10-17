import { MonitoringModel } from '@/domain/models'

export interface LoadMonitorings {
  load: () => Promise<LoadMonitorings.Result>
}

export namespace LoadMonitorings {
  export type Result = MonitoringModel[]
}
