import { User } from '@/types/Auth'
import { GetServerSidePropsContext } from 'next'
import request from './request'

export const getCurrentUser = async (ctx: GetServerSidePropsContext): Promise<User | null> => {
  const response = await request(
    {
      url: '/me',
    },
    ctx,
  )

  if (response) {
    return response.data as User
  }

  return null
}
