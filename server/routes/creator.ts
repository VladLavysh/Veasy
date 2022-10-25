import {Request, Response, Router} from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  console.log('CREATOR');
  res.status(200).json('CREATOR')
})

router.get('/get-selected-cv', (req: Request, res: Response) => {
  console.log('SOME PDF DATA');
  setTimeout(() => {
    res.status(200).json({label: 'bruh', value: 'SOME PDF DATA JSON'})
  }, 2000)
})

export default router
