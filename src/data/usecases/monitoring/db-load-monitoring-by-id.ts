import { LoadMonitoringByIdRepository } from '@/data/protocols'
import { LoadMonitoringById } from '@/domain/usecases'

export class DbLoadMonitoringById implements LoadMonitoringById {
  constructor (
    private readonly loadMonitoringByIdRepository: LoadMonitoringByIdRepository,
  ) {}

  async load (monitoringId: string): Promise<LoadMonitoringById.Result> {
    const monitoring = await this.loadMonitoringByIdRepository.loadById(monitoringId)
    return monitoring
  }
}
