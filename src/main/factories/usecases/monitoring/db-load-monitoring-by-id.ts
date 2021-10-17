import { DbLoadMonitoringById } from '@/data/usecases'
import { MonitoringMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadMonitoringById = (): DbLoadMonitoringById => {
  const monitoringMongoRepository = new MonitoringMongoRepository()
  return new DbLoadMonitoringById(monitoringMongoRepository)
}
