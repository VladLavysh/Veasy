import path from 'path'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import cors from 'cors'
import connectDBSession from 'connect-mongodb-session'
import keys from './keys'

import varMiddleware from './middleware/variables'

import templateRoutes from './routes/templates'
import profileRoutes from './routes/profile'
import creatorRoutes from './routes/creator'
import settingsRoutes from './routes/settings'
import loginRoutes from './routes/login'

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    user: Object,
    isAuthenticated: Boolean
  }
}

const app: express.Application = express()
const MongoStore = connectDBSession(session)

app.use(cors()) // to allow cross origin requests
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "dist") as string))

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        collection: 'sessions',
        uri: keys.MONGODB_URI
    })
}))
app.use(varMiddleware)

app.use('/', templateRoutes)
app.use('/profile', profileRoutes)
app.use('/creator', creatorRoutes)
app.use('/settings', settingsRoutes)
app.use('/login', loginRoutes)

export default app
