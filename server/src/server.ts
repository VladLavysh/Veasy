import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'

import templateRoutes from './routes/templates'
import profileRoutes from './routes/profile'
import creatorRoutes from './routes/creator'
import settingsRoutes from './routes/settings'
import loginRoutes from './routes/login'

const app = express()

app.use(cors()) // to allow cross origin requests
app.use(morgan("dev"))
app.use(express.json())

app.use('/', templateRoutes)
app.use('/profile', profileRoutes)
app.use('/creator', creatorRoutes)
app.use('/settings', settingsRoutes)
app.use('/login', loginRoutes)

app.use(express.static(path.join(__dirname, "..", "dist") as string));

export default app
