import express, {Request, Response, NextFunction} from 'express'
import {json} from 'body-parser'

import templateRoutes from './routes/templates'
import profileRoutes from './routes/profile'
import creatorRoutes from './routes/creator'
import settingsRoutes from './routes/settings'

const app = express()

app.use(json())

app.use('/', templateRoutes)
app.use('/profile', profileRoutes)
app.use('/creator', creatorRoutes)
app.use('/settings', settingsRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({message: err.message})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
