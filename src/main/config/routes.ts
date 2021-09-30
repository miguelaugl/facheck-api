import fs from 'fs'
import { join } from 'path'

import { Express, Router } from 'express'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  const routesDirPath = join(__dirname, '..', 'routes')
  fs.readdirSync(routesDirPath).map(async file => {
    if (!file.includes('.test.') && !file.endsWith('.map')) {
      (await import(`${routesDirPath}/${file}`)).default(router)
    }
  })
}
