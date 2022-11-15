import {Request, Response, Router} from 'express'
import auth from '../middleware/auth';

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.status(200).json('CREATOR')
})

router.get('/get-selected-cv', (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(200).json({label: 'bruh', value: 'SOME PDF DATA JSON'})
  }, 2000)
})

export default router
