import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Input from '@/components/Form/Input';
import Button from '@/components/Button';
import { Credentials } from '@/types/Auth';
import { useSignInMutation } from '@/features/apis/authApi';
import { setUser } from '@/features/slices/userSlice';
import { useDispatch } from 'react-redux';
import { ResponseError } from '@/types/Errors';
import { useRouter } from 'next/router';
import RootError from '@/components/RootError';
import { GetServerSideProps } from 'next';
import { guest } from '@/middlewares/guest';
import AuthLayout from '@/components/layouts/AuthLayout';
import { handleResponseErrors } from '@/lib/responseHandlers';

/* Validation schema */
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

/* Sign in page */
export default function Signin() {
  const router = useRouter();
  const dispatch = useDispatch();

  /* extracting the signIn function */
  const [signIn, { isLoading }] = useSignInMutation();

  /* preparing the form  */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Credentials>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  /* Form handler */
  const onSubmit = async (data: Credentials) => {
    /* Sign in response  */
    const response = await signIn(data);

    /* if request successded */
    if ('data' in response) {
      dispatch(setUser(response.data));
      router.push('/dashboard/profile');
    }

    /* if request failed */
    if ('error' in response) {
      handleResponseErrors<keyof Credentials>(
        response.error as ResponseError<keyof Credentials>,
        setError,
      );
    }
  };

  return (
    <AuthLayout
      title={'Welcome Back'}
      description={'Please enter your email and password to sign in to your account.'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <RootError error={errors.root} />

      <Input
        {...register('email')}
        error={errors.email}
        type="email"
        placeholder="Email Address..."
      />

      <Input
        {...register('password')}
        type="password"
        placeholder="Password..."
        error={errors.password}
      />

      <Button state={isLoading ? 'loading' : undefined}>Sign in</Button>

      <div className="py-4 relative flex flex-col items-center justify-center">
        <div className="h-[1px] bg-slate-400 rounded-md w-full"></div>
        <p className="absolute p-2 bg-white text-slate-500 text-sm">OR</p>
      </div>

      <Button href="/forgot-password" variation="outlined">
        Forgot Password ?
      </Button>

      <Button href="/sign-up" variation="outlined">
        Sign up
      </Button>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = guest;
