import { LoadMonitoringsRepository } from '@/data/protocols'
import { LoadMonitorings } from '@/domain/usecases'

export class DbLoadMonitorings implements LoadMonitorings {
  constructor (
    private readonly loadMonitoringsRepository: LoadMonitoringsRepository,
  ) {}

  async load (): Promise<LoadMonitorings.Result> {
    const monitorings = await this.loadMonitoringsRepository.loadAll()
    return monitorings
  }
}
