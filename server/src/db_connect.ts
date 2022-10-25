import { connect } from 'mongoose'
import keys from './keys'

export const dbConnect = async (): Promise<void> => {
  try {
    await connect(keys.MONGODB_URI)
    console.log('MongoDB database connected...')
  } catch (err: unknown) {
    console.warn('Database connection error:', err);
  }
}
