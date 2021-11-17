import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeAddMonitoringController, makeLoadMonitoringsController, makeLoadMonitoringByIdController } from '@/main/factories/controllers'
import { adminAuth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/monitorings', adminAuth, adaptRoute(makeAddMonitoringController()))
  router.get('/monitorings', adaptRoute(makeLoadMonitoringsController()))
  router.get('/monitorings/:monitoringId', adminAuth, adaptRoute(makeLoadMonitoringByIdController()))
}
