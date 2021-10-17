import { DbAddMonitoring } from '@/data/usecases'
import { MonitoringMongoRepository } from '@/infra/db/mongodb'
import { AddMonitoringController } from '@/presentation/controllers'

import { makeAddMonitoringValidation } from './add-monitoring-validation-factory'

export const makeAddMonitoringController = (): AddMonitoringController => {
  const monitoringMongoRepository = new MonitoringMongoRepository()
  const dbAddMonitoring = new DbAddMonitoring(monitoringMongoRepository)
  const validation = makeAddMonitoringValidation()
  return new AddMonitoringController(dbAddMonitoring, validation)
}
