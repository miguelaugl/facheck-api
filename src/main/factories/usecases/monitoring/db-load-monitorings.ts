import { DbLoadMonitorings } from '@/data/usecases/monitoring/db-load-monitorings'
import { MonitoringMongoRepository } from '@/infra/db/mongodb/monitoring/monitoring-mongo-repository'

export const makeDbLoadMonitorings = (): DbLoadMonitorings => {
  const monitoringMongoRepository = new MonitoringMongoRepository()
  return new DbLoadMonitorings(monitoringMongoRepository)
}
