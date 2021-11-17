import { Router } from 'express'

import { adaptRoute } from '@/main/adapters'
import { makeLoadCurrentAccountController, makeLoginController, makeSignUpController, makeUpdateAccountByIdController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.get('/me', auth, adaptRoute(makeLoadCurrentAccountController()))
  router.put('/me', auth, adaptRoute(makeUpdateAccountByIdController()))
}
