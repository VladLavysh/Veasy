import {Request, Response, NextFunction, Router} from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  console.log('SETTINGS');
})

export default router
