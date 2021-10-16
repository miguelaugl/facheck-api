import { AddMonitoringRepository } from '@/data/protocols'
import { AddMonitoring } from '@/domain/usecases'

export class DbAddMonitoring implements AddMonitoring {
  constructor (
    private readonly addMonitoringRepository: AddMonitoringRepository,
  ) {}

  async add (params: AddMonitoring.Params): Promise<AddMonitoring.Result> {
    await this.addMonitoringRepository.add(params)
    return null
  }
}
