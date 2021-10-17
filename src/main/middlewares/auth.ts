import { adaptMiddleware } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export const auth = adaptMiddleware(makeAuthMiddleware())
