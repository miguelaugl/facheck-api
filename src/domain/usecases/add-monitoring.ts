export interface AddMonitoring {
  add: (params: AddMonitoring.Params) => Promise<void>
}

export namespace AddMonitoring {
  export type Params = {
    subject: string
    initDate: Date
    endDate: Date
    room: number
    maxStudents?: number
  }
}