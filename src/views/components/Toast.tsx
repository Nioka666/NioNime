/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ErrorToastProps {
  errorMessage: string | boolean;
}

const ErrorToast: React.FC<ErrorToastProps> = ({ errorMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);

  console.log(loading);
  useEffect(() => {
    if (errorMessage) {
      setLoading(true);

      if (typeof errorMessage === "string") {
        const toastId = toast.loading("Loading...", { duration: 1500 });

        setTimeout(() => {
          toast.dismiss(toastId);
          toast.error(errorMessage);
          setLoading(false);
          window.location.reload();
        }, 1500);
      }
    }
  }, [errorMessage]);

  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        style: {
          background: "#363636",
          color: "#fff",
        },
        error: {
          duration: 2500,
        },
      }}
    />
  );
};

export default ErrorToast;
