import { getToasts } from '@/features/slices/toastSlice';
import { Toast } from '@/types/Toast';
import { useSelector } from 'react-redux';
import ToastC from './index';

export default function ToastCer() {
  const toasts = useSelector(getToasts);
  return (
    <>
      {toasts.map((toast: Toast, index: number) => {
        return <ToastC key={index} {...toast} index={index} />;
      })}
    </>
  );
}
