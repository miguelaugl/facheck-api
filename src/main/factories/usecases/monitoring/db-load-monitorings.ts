import { DbLoadMonitorings } from '@/data/usecases'
import { MonitoringMongoRepository } from '@/infra/db/mongodb'

export const makeDbLoadMonitorings = (): DbLoadMonitorings => {
  const monitoringMongoRepository = new MonitoringMongoRepository()
  return new DbLoadMonitorings(monitoringMongoRepository)
}
