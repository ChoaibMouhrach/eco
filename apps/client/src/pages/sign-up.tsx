import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Button from '@/components/Button'
import Input from '@/components/Form/Input'
import { UserSignUp } from '@/types/Auth'
import RootError from '@/components/RootError'
import { useSignUpMutation } from '@/features/apis/authApi'
import { ResponseError } from '@/types/Errors'
import { useRouter } from 'next/router'
import { setUser } from '@/features/slices/userSlice'
import { useDispatch } from 'react-redux'
import { GetServerSideProps } from 'next'
import { guest } from '@/middlewares/guest'
import AuthLayout from '@/components/layouts/AuthLayout'
import { handleResponseErrors } from '@/lib/responseHandlers'

/* Validation schema */
const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
    firstName: z.string().min(3).max(60),
    lastName: z.string().min(3).max(60),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password and Password confirmation does not match',
  })

export default function Login() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [signUp, { isLoading }] = useSignUpMutation()

  /* Preparing the form */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserSignUp>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  /* Form Handler */
  const onSubmit = async (data: UserSignUp) => {
    const response = await signUp(data)

    if ('data' in response) {
      dispatch(setUser(response.data))
      router.push('/dashboard/profile')
    }

    if ('error' in response)
      handleResponseErrors<keyof UserSignUp>(
        response.error as ResponseError<keyof UserSignUp>,
        setError,
      )
  }

  return (
    <AuthLayout
      onSubmit={handleSubmit(onSubmit)}
      title={'Welcome'}
      description={'Please enter your information and fill the form  to sign up for an account.'}
    >
      <div className="flex gap-2 justify-center w-full">
        <div>
          <Input
            {...register('firstName')}
            type="text"
            placeholder="First Name..."
            error={errors.firstName}
          />
        </div>

        <div>
          <Input
            {...register('lastName')}
            type="text"
            placeholder="Last Name..."
            error={errors.lastName}
          />
        </div>
      </div>

      <RootError error={errors.root} />

      <Input
        {...register('email')}
        type="email"
        placeholder="Email Address..."
        error={errors.email}
      />

      <Input
        {...register('password')}
        type="password"
        placeholder="Password..."
        error={errors.password}
      />

      <Input
        {...register('password_confirmation')}
        type="password"
        placeholder="Password Confirmation..."
        error={errors.password_confirmation}
      />

      <Button state={isLoading ? 'loading' : undefined}>Sign up</Button>

      <div className="py-4 relative flex flex-col items-center justify-center">
        <div className="h-[1px] bg-slate-400 rounded-md w-full"></div>
        <p className="absolute p-2 bg-white text-slate-500 text-sm">OR</p>
      </div>

      <Button href="/sign-in" variation="outlined">
        Sign in
      </Button>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = guest
