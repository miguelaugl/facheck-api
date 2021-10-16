import { MonitoringModel } from '@/domain/models'

export const mockMonitoringModel = (): MonitoringModel => ({
  id: 'any_id',
  subject: 'any_subject',
  initDate: new Date(),
  endDate: new Date(),
  room: 1,
})
