import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import mongoose from 'mongoose'

/* AccessToken */
export const generateAccessToken = (_id: mongoose.Types.ObjectId): string => {
  return jwt.sign({ _id }, config.ACCESS_SECRET, {
    expiresIn: config.ACCESS_TOKEN_DURATION,
  })
}

export const verifyAccessToken = (token: string): { _id: string } | { err: string } => {
  try {
    return jwt.verify(token, config.ACCESS_SECRET) as { _id: string }
  } catch (err: any) {
    return { err: err.message }
  }
}

/* Refresh Token */
export const generateRefreshToken = (_id: mongoose.Types.ObjectId): string => {
  return jwt.sign({ _id }, config.REFRESH_SECRET)
}

export const verifyRefreshToken = (token: string): { _id: string } | { err: string } => {
  try {
    return jwt.verify(token, config.REFRESH_SECRET) as { _id: string }
  } catch (err: any) {
    return { err: err.message }
  }
}

/* Email Confirmation tokens */
export const generateEmailConfirmationToken = (_id: mongoose.Types.ObjectId): string => {
  return jwt.sign({ _id }, config.CONFIRM_EMAIL_SECRET, {
    expiresIn: config.EMAIL_CONFIRMATION_TOKEN_EXPIRATION_PERIOD,
  })
}

export const verifyEmailConfirmationToken = (token: string): { _id: string } | { err: string } => {
  try {
    return jwt.verify(token, config.CONFIRM_EMAIL_SECRET) as { _id: string }
  } catch (err: any) {
    return { err: err.message }
  }
}

/* Forgot Password Tokens */
export const generateForgotPasswordToken = (_id: mongoose.Types.ObjectId): string => {
  return jwt.sign({ _id }, config.FORGOT_PASSWORD_SECRET, {
    expiresIn: config.FORGOT_PASSWORD_TOKEN_EXPIRATION_PERIODE,
  })
}

export const verifyForgotPasswordToken = (token: string): { _id: string } | { err: string } => {
  try {
    return jwt.verify(token, config.FORGOT_PASSWORD_SECRET) as { _id: string }
  } catch (err: any) {
    return { err: err.message }
  }
}

export const checkTokensLimit = (
  tokens: { token: string; createdAt: Date }[],
  rateLimit: number,
) => {
  if (tokens.length) {
    const period = rateLimit * 60 * 1000

    if (tokens.length === 5) {
      const currentTimeStamp = Date.now()

      const lastTokenTimeStamp = new Date(tokens[tokens.length - 1].createdAt).getTime()

      const lastTokenTimeStampExpirationPeriod = lastTokenTimeStamp + period

      if (currentTimeStamp < lastTokenTimeStampExpirationPeriod) {
        return { sucess: false }
      }

      tokens = []
    } else {
      const currentTimeStamp = Date.now()

      const firstTokenTimeStamp = new Date(tokens[0].createdAt).getTime()

      const firstTokenTimeStampExpirationPeriod = firstTokenTimeStamp + period

      if (currentTimeStamp > firstTokenTimeStampExpirationPeriod) {
        tokens = []
      }
    }
  }

  return { success: true, tokens }
}
