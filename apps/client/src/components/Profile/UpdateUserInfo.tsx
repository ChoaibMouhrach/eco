import { User } from '@/types/Auth'
import Card from '../Card'
import CardBody from '../Card/CardBody'
import Input from '../Form/Input'
import CardFooter from '../Card/CardFooter'
import Button from '../Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UpdateUserInfo } from '@/types/Auth'
import { useUpdateUserInfoMutation } from '@/features/apis/authApi'
import { handleResponseErrors } from '@/lib/responseHandlers'
import { ResponseError } from '@/types/Errors'
import useToast from '@/hooks/useToast'
import RootError from '../RootError'

const schema = z.object({
  firstName: z.string().min(3).max(60).optional(),
  lastName: z.string().min(3).max(60).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8),
})

function diff<T extends Record<string, any>>(object: T, object2: T): Partial<T> {
  let result: Partial<T> = {}

  Object.keys(object).forEach((key: keyof T) => {
    if (object[key] !== object2[key]) {
      result[key] = object[key]
    }
  })

  return result
}

export default function UpdateInfo({ user }: { user: User }) {
  const { toast } = useToast()
  const [updateUser, { isLoading, isSuccess, isError }] = useUpdateUserInfoMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UpdateUserInfo>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: UpdateUserInfo) => {
    let requestBody = diff<UpdateUserInfo>(data, user)

    if (Object.keys(requestBody).length < 2)
      return setError('root', {
        message: 'Chnage something first',
      })

    const response = await updateUser({ ...requestBody, password: data.password })

    if ('error' in response) {
      handleResponseErrors<keyof UpdateUserInfo>(
        response.error as ResponseError<keyof UpdateUserInfo>,
        setError,
      )

      toast([{ title: 'Updating User Information failed', variation: 'danger' }])
    }

    if ('data' in response) {
      toast([{ title: 'User updated successfully', variation: 'success' }])
    }
  }

  return (
    <Card description="Update Profile information" title="Profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <div className="flex flex-col gap-3">
            <RootError error={errors.root} />

            <div className="flex gap-3">
              <Input
                error={errors.firstName}
                {...register('firstName')}
                defaultValue={user.firstName}
                placeholder="First Name..."
                id="firstName"
                type="text"
              />
              <Input
                error={errors.lastName}
                {...register('lastName')}
                defaultValue={user.lastName}
                placeholder="Last Name..."
                id="lastName"
                type="text"
              />
            </div>
            <Input
              error={errors.email}
              {...register('email')}
              defaultValue={user.email}
              placeholder="Email Address..."
              id="email"
              type="email"
            />
            <Input
              error={errors.password}
              {...register('password')}
              placeholder="Password..."
              id="password"
              type="password"
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button
            state={isLoading ? 'loading' : undefined}
            color={isSuccess ? 'success' : isError ? 'danger' : 'default'}
          >
            Update
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
