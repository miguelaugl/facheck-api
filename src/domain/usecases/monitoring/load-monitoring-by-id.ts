import { AccountModel, Weekday } from '@/domain/models'

export interface LoadMonitoringById {
  load: (monitoringId: string) => Promise<LoadMonitoringById.Result>
}

export namespace LoadMonitoringById {
  export type Result = {
    id: string
    subject: string
    weekday: Weekday
    initHour: string
    endHour: string
    room: string
    monitor: AccountModel
  }
}
