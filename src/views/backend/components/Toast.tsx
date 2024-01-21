import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ToastProps {
  successMessage: string | boolean;
  typeToast: string;
}

export const BackendToast: React.FC<ToastProps> = ({ successMessage, typeToast }) => {
  useEffect(() => {
    let toastId: string | number;

    if (typeToast === 'success') {
      toastId = toast.success(`${successMessage}`);
    } else {
      toastId = toast.error(`Error when deleting user`);
    }

    // Jika ingin mengontrol toast menggunakan ID
    // const handleDismiss = () => toast.dismiss(toastId);

    // Return statement
    return () => {
      // Membersihkan toast saat komponen di-unmount
      toast.dismiss(toastId);
    };
  }, [successMessage, typeToast]);

  // Memindahkan <Toaster /> ke tingkat tertinggi untuk memastikan satu instance
  return <Toaster />;
};
