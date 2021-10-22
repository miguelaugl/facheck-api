import { Weekday } from '@/domain/models'
import { mockAccountModel } from '@/domain/tests'
import { LoadMonitorings } from '@/domain/usecases'

export const mockDbLoadMonitoringsModel = (): LoadMonitorings.Model => ({
  id: 'any_id',
  initHour: 'any_hour',
  endHour: 'any_hour',
  monitor: mockAccountModel(),
  room: 'any_room',
  subject: 'any_subject',
  weekday: Weekday.MONDAY,
})

export const mockDbLoadMonitoringsResult = (): LoadMonitorings.Result => [
  mockDbLoadMonitoringsModel(),
  {
    id: 'other_id',
    initHour: 'other_hour',
    endHour: 'other_hour',
    monitor: mockAccountModel(),
    room: 'other_room',
    subject: 'other_subject',
    weekday: Weekday.SUNDAY,
  },
]
