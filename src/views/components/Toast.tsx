/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface ErrorToastProps {
    errorMessage: string | boolean;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ errorMessage }) => {
    useEffect(() => {
        if (errorMessage) {
            if (typeof errorMessage === 'string') {
                // Menampilkan toast
                toast.error(errorMessage);

                // Menunggu sebelum memutuskan untuk reload halaman
                const timeoutId = setTimeout(() => {
                    // Toast telah hilang, muat ulang halaman
                    window.location.reload();
                }, 3000); // Ganti angka ini dengan timeout yang sesuai

                // Membersihkan timeout setelah komponen di-unmount atau jika errorMessage berubah
                return () => {
                    clearTimeout(timeoutId);
                };
            }
        }
    }, [errorMessage]);

    return <Toaster />;
};

export default ErrorToast;
