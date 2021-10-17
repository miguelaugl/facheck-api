import { LoadMonitorings } from '@/domain/usecases'

export interface LoadMonitoringsRepository {
  loadAll: () => Promise<LoadMonitorings.Result>
}

export namespace LoadMonitoringsRepository {
  export type Result = LoadMonitorings.Result
}
