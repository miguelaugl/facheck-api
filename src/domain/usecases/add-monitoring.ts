import { MonitoringModel } from '@/domain/models'

export interface AddMonitoring {
  add: (params: AddMonitoring.Params) => Promise<AddMonitoring.Result>
}

export namespace AddMonitoring {
  export type Params = {
    subject: string
    initDate: Date
    endDate: Date
    room: number
    maxStudents?: number
  }
  export type Result = MonitoringModel
}
