import {Request, Response, NextFunction, Router} from 'express'

const router = Router()

router.get('/login', (req: Request, res: Response) => {
  console.log('LOGIN');
})

export default router
