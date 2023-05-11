import { useForm } from 'react-hook-form';
import Button from '../Button';
import Card from '../Card';
import CardBody from '../Card/CardBody';
import CardFooter from '../Card/CardFooter';
import Input from '../Form/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ChangePassword } from '@/types/Auth';
import { useChangePasswordMutation } from '@/features/apis/authApi';
import { handleResponseErrors } from '@/lib/responseHandlers';
import { ResponseError } from '@/types/Errors';
import useToast from '@/hooks/useToast';

const schema = z
  .object({
    old_password: z.string().min(8),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Password and Password Confirmation does not match',
  })
  .refine((data) => data.password !== data.old_password, {
    path: ['password'],
    message: 'The old Password and Password should not match',
  });

export default function UpdatePassword() {
  const { toast } = useToast();
  const [changePassword, { isLoading, isSuccess, isError }] = useChangePasswordMutation();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ChangePassword>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: ChangePassword) => {
    const response = await changePassword(data);

    if ('data' in response) {
      toast([{ title: 'Password Update', variation: 'success' }]);
      setValue('old_password', '');
      setValue('password', '');
      setValue('password_confirmation', '');
    }

    if ('error' in response) {
      handleResponseErrors<keyof ChangePassword>(
        response.error as ResponseError<keyof ChangePassword>,
        setError,
      );
      toast([{ title: 'Updating Password failed', variation: 'danger' }]);
    }
  };

  return (
    <Card description="Change Your Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-start-1 col-end-3">
              <Input
                {...register('old_password')}
                placeholder="Password..."
                error={errors.old_password}
                type="password"
              />
            </div>
            <Input
              {...register('password')}
              placeholder="New Password..."
              type="password"
              error={errors.password}
            />
            <Input
              {...register('password_confirmation')}
              placeholder="New Password Confirmation..."
              type="password"
              error={errors.password_confirmation}
            />
          </div>
        </CardBody>
        <CardFooter>
          <Button
            color={isSuccess ? 'success' : isError ? 'danger' : 'default'}
            state={isLoading ? 'loading' : undefined}
          >
            Update
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
