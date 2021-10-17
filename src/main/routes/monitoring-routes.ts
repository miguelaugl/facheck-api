import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeAddMonitoringController } from '@/main/factories/controllers'
import { monitorAuth } from '@/main/middlewares'

import { makeLoadMonitoringsController } from '../factories/controllers'

export default (router: Router): void => {
  router.post('/monitorings', monitorAuth, adaptRoute(makeAddMonitoringController()))
  router.get('/monitorings', monitorAuth, adaptRoute(makeLoadMonitoringsController()))
}
