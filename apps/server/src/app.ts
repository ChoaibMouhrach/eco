import 'express-async-errors'
import express, { Express } from 'express'
import { config as dotenvConfig } from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.route'
import categoryRouter from './routes/category.route'
import { config } from './config/config'
import productRouter from './routes/product.route'
import { errorHandler } from './middlewares/error-handler.middlware'
import userRouter from './routes/user.route'

dotenvConfig()

/**
 * this function returns and instance of express
 * */
const makeApp = async (): Promise<Express> => {
  /* express instance */
  const app = express()

  /* middlewares */
  app.use(express.json())
  app.use(
    cors({
      credentials: true,
      origin: `${config.CLIENT_HOST}:${config.CLIENT_PORT}`,
    }),
  )
  app.use(cookieParser())

  app.use('/public', express.static(config.PUBLIC_STORAGE))

  /* routes */
  app.use('/', authRouter)
  app.use('/categories', categoryRouter)
  app.use('/products', productRouter)
  app.use('/users', userRouter)

  // exceptions handler
  app.use(errorHandler)

  return app
}

export default makeApp
