import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeLoginController, makeSignUpController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/signup', adaptRoute(makeSignUpController()))
}
