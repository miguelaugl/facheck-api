import { Router } from 'express'

import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeLoginController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
}
