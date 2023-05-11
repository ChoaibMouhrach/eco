import { removeToast } from '@/features/slices/toastSlice';
import { Toast } from '@/types/Toast';
import * as ToastC from '@radix-ui/react-toast';
import { useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';

export default function Toast({ variation, title, index }: Toast & { index: number }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeToast(index));
    }, 5000);
  }, []);

  return (
    <ToastC.Root
      className={`${
        variation === 'success'
          ? 'bg-green-600'
          : variation === 'danger'
          ? 'bg-red-700'
          : 'bg-gray-900'
      } rounded-md p-4 flex justify-between items-center`}
      open={true}
    >
      <ToastC.Title className="[grid-area:_title] font-medium text-white text-[15px]">
        {title}
      </ToastC.Title>
      <ToastC.Action className="[grid-area:_action]" asChild altText="Goto schedule to ">
        <button
          onClick={() => {
            dispatch(removeToast(index));
          }}
          className="text-white"
        >
          <MdClose />
        </button>
      </ToastC.Action>
    </ToastC.Root>
  );
}
