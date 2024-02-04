/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchUserData, serverURL } from "@utils/anime";
import { LoadingButton } from "@views/components/Loading";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

// Change Password Form
export const ChangePasswordForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);

  const { data: userData, error: errorUserData } = useSWR(
    "fetchUserData",
    () => fetchUserData(),
    {
      revalidateOnFocus: false,
    }
  );

  if (errorUserData) {
    console.error(errorUserData);
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const username = userData?.username;
    const userID = userData?.id;

    try {
      setLoadingBtn(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      const response = await axios.post(
        `${serverURL}/api/account/change-password`,
        { userID, username, password, newPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setPasswordChanged(true);
        await toast.promise(
          new Promise((resolve) => {
            setTimeout(resolve, 2000);
          }),
          {
            loading: "Loading...",
            success: "Successfully Changed Password!",
            error: "Failed to Change Password",
          }
        );
        window.location.reload();
      } else {
        setPasswordChanged(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(passwordChanged);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 2500,
          },
          error: {
            duration: 2500,
          },
        }}
      />
      <form className="d-grid changePassword">
        <h3>Change Password</h3>
        <h6 className="text-gray mt-1">
          Pick a unique password, keep your account safe
        </h6>
        <div className="input-groups d-grid gap-4 mt-5">
          {/* Tambahkan input untuk username */}
          <input
            type="password"
            name="currentPassword"
            placeholder="Current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            name="newConfirmPassword"
            placeholder="Retype New Password"
            value={newConfirmPassword}
            onChange={(e) => setNewConfirmPassword(e.target.value)}
          />
          <label style={{ margin: "0px auto" }} className="mt-4" htmlFor="">
            <i className="fa-solid fa-exclamation"></i> Changing your password
            will sign you out of your other devices. You’ll need to enter the
            new password.
          </label>
          <button
            type="submit"
            style={{
              width: "300px",
              fontWeight: "600",
              color: "black",
              margin: "10px auto",
              fontSize: "16px",
              borderRadius: "12px",
              padding: "14px 15px",
            }}
            onClick={handleChangePassword}
            className="btn-loginPage mt-3"
            disabled={loadingBtn}
          >
            {loadingBtn ? <LoadingButton /> : "CHANGE PASSWORD"}
          </button>
        </div>
      </form>
    </>
  );
};
