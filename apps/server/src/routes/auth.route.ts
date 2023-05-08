import { Router } from 'express'
import {
  getUser,
  login,
  configEmailAddress,
  logout,
  refresh,
  register,
  forgotPassword,
  resetPassword,
  sendConfirmationEmail,
  updateUserInformation,
  updateUserPassword,
  deleteAccount,
} from '../controllers/auth.controller'
import authRefreshToken from '../middlewares/authRefreshToken'
import authAccessToken from '../middlewares/authAccessToken'
import { rateLimit } from 'express-rate-limit'
import { guard } from '../middlewares/guard'
import loginRequest from '../requests/auth/login.request'
import forgotPasswordRequest from '../requests/auth/forgotPassword.request'
import resetPasswordRequest from '../requests/auth/resetPassword.request'
import updateUserInfo from '../requests/auth/updateUserInfo.request'
import updateUserPasswordRequest from '../requests/auth/updateUserPassword.request'
import registerRequest from '../requests/auth/register.request'

// rate limit of 5 attempts per hour
const emailsRateLimit = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
})

const router = Router()

/* Login users */
router.post('/login', guard(loginRequest), login)

/* Register users */
router.post('/register', guard(registerRequest), register)

/* Get User information */
router.get('/me', authAccessToken, getUser)

/* Delete User */
router.delete('/me', authAccessToken, deleteAccount)

/* Update User Information */
router.patch('/me', [authAccessToken, guard(updateUserInfo)], updateUserInformation)

/* Logout Users */
router.post('/logout', authRefreshToken, logout)

/* Refresh Token */
router.post('/refresh', authRefreshToken, refresh)

/* Send reset password email */
router.post('/forgot-password', [emailsRateLimit, guard(forgotPasswordRequest)], forgotPassword)

/* Reset Password */
router.post('/reset-password/:token', guard(resetPasswordRequest), resetPassword)

/* Send confirmation email */
router.post('/send-confirmation-email', [emailsRateLimit, authAccessToken], sendConfirmationEmail)

/* Confirm email address */
router.post('/confirm-email/:token', configEmailAddress)

/* Update User Password */
router.post(
  '/change-password',
  [authAccessToken, guard(updateUserPasswordRequest)],
  updateUserPassword,
)

export default router
