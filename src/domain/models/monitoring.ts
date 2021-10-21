export enum Weekday {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export type MonitoringModel = {
  id: string
  monitorId: string
  subject: string
  weekday: Weekday
  initHour: string
  endHour: string
  room: string
}
