import { MonitoringModel } from '@/domain/models'
import { AddMonitoring } from '@/domain/usecases'

export const mockMonitoringModel = (): MonitoringModel => ({
  id: 'any_id',
  monitorId: 'any_monitor_id',
  subject: 'any_subject',
  initDate: new Date(),
  endDate: new Date(),
  room: 1,
})

export const mockAddMonitoringParams = (): AddMonitoring.Params => ({
  monitorId: 'any_monitor_id',
  subject: 'any_subject',
  initDate: new Date(),
  endDate: new Date(),
  room: 16,
})
