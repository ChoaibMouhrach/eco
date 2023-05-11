import { addToasts } from '@/features/slices/toastSlice';
import { Toast } from '@/types/Toast';
import { useDispatch } from 'react-redux';

export default function useToast() {
  const dispatch = useDispatch();

  const toast = (toast: Toast[]) => {
    dispatch(addToasts(toast));
  };

  return {
    toast,
  };
}
