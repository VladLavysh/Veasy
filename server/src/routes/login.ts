import {Request, Response, NextFunction, Router} from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'

const router = Router()

router.post('/sign-in', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })
    const equalPasswords = candidate
      ? await bcrypt.compare(password, candidate.password)
      : null

    if (!candidate || !equalPasswords) {
      console.log('FALSE');
      
      res.status(200).json({status: false, output: 'Wrong user name or password'})
    }

    //req.session.user = candidate
    //req.session.isAuthenticated = true
    //req.session.save(err => {
    //  if (err) throw err
    //  res.redirect('/')
    //})

    res.status(200).json({status: true, output: 'Welcome back'})
  } catch (e: unknown) {
    res.status(200).json({status: false, output: 'Something went wrong'})
    console.log('Error', e);
  }
})

router.post('/sign-up', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body

    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
      email, name,
      password: hashPassword,
      cart: { items: [] }
    })
    await user.save()

    res.status(200).json({status: true, output: 'User was created succesfully'})
  } catch (e: unknown) {
    res.status(200).json({status: false, output: 'Something went wrong'})
    console.log(e)
  }
})

router.get('/log-out', async (req: Request, res: Response) => {
  try {
    //req.session.destroy(() => {
    //  res.redirect('/auth/login#login')
    //})
    res.status(200).json({status: true, output: 'Log out completed successfully'})
  } catch (e: unknown) {
    res.status(200).json({status: false, output: 'Something went wrong'})
    console.log(e)
  }
})

export default router
