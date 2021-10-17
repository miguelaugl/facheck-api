import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeAddMonitoringController, makeLoadMonitoringsController, makeLoadMonitoringByIdController } from '@/main/factories/controllers'
import { monitorAuth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/monitorings', monitorAuth, adaptRoute(makeAddMonitoringController()))
  router.get('/monitorings', monitorAuth, adaptRoute(makeLoadMonitoringsController()))
  router.get('/monitorings/:monitoringId', monitorAuth, adaptRoute(makeLoadMonitoringByIdController()))
}
