import { useDeleteAccoutMutation } from '@/features/apis/authApi';
import Button from '../Button';
import Card from '../Card';
import CardFooter from '../Card/CardFooter';
import { useRouter } from 'next/router';
import useToast from '@/hooks/useToast';

export default function DeleteAccount() {
  const { toast } = useToast();
  const router = useRouter();
  const [deleteAccount, { isLoading }] = useDeleteAccoutMutation();

  async function handleDelete() {
    const response = await deleteAccount();

    if ('error' in response) {
      toast([{ title: "We couldn't delete your account", variation: 'danger' }]);
    }
    if ('data' in response) {
      toast([
        {
          title: 'Your account has bein deleted successfully',
          variation: 'success',
        },
      ]);
      router.push('/');
    }
  }

  return (
    <Card title="Delete Account" description="Your account will not be deleted permanently">
      <CardFooter>
        <Button onClick={handleDelete} color="danger" state={isLoading ? 'loading' : undefined}>
          Delete Account
        </Button>
      </CardFooter>
    </Card>
  );
}
