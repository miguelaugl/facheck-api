import { AccountModel, Weekday } from '@/domain/models'

export interface LoadMonitorings {
  load: () => Promise<LoadMonitorings.Result>
}

export namespace LoadMonitorings {
  export type Model = {
    id: string
    subject: string
    weekday: Weekday
    initHour: string
    endHour: string
    room: string
    monitor: AccountModel
  }

  export type Result = Model[]
}
