import { DbAddMonitoring } from '@/data/usecases'
import { AddMonitoring } from '@/domain/usecases'
import { MonitoringMongoRepository } from '@/infra/db/mongodb/monitoring/monitoring-mongo-repository'

export const makeDbAddMonitoring = (): AddMonitoring => {
  const monitoringMongoRepository = new MonitoringMongoRepository()
  return new DbAddMonitoring(monitoringMongoRepository)
}
