import { DbAddMonitoring } from '@/data/usecases/monitoring/db-add-monitoring'
import { MonitoringMongoRepository } from '@/infra/db/mongodb/monitoring/monitoring-mongo-repository'
import { AddMonitoringController } from '@/presentation/controllers/monitoring/add-monitoring'

import { makeLoginValidation } from '../account/login-validation-factory'

export const makeAddMonitoringController = (): AddMonitoringController => {
  const monitoringMongoRepository = new MonitoringMongoRepository()
  const dbAddMonitoring = new DbAddMonitoring(monitoringMongoRepository)
  const validation = makeLoginValidation()
  return new AddMonitoringController(dbAddMonitoring, validation)
}
