import { Router } from 'express'

import { adaptRoute, adaptMiddleware } from '@/main/adapters'
import { makeAddMonitoringController } from '@/main/factories/controllers'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export default (router: Router): void => {
  const monitorAuth = adaptMiddleware(makeAuthMiddleware('monitor'))
  router.post('/monitorings', monitorAuth, adaptRoute(makeAddMonitoringController()))
}
