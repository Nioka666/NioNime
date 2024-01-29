import { fetchUserData, serverURL } from "@utils/anime";
import { LoadingButton } from "@views/components/Loading";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

// Change Password Form
export const ChangePasswordForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

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

    try {
      setLoadingBtn(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.post(
        `${serverURL}/api/account/change-password`,
        { username, password, newPassword },
        { withCredentials: true }
      );
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleChangePassword} className="d-grid changePassword">
        <h3>Change Password</h3>
        <h6 className="text-gray mt-1">
          Pick a unique password, keep your account safe
        </h6>
        <div className="input-groups d-grid gap-4 mt-5">
          {/* Tambahkan input untuk username */}
          <input
            type="text"
            name="currentPassword"
            placeholder="Current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            name="newPassword"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="text"
            name="newConfirmPassword"
            placeholder="Retype New Password"
            value={newConfirmPassword}
            onChange={(e) => setNewConfirmPassword(e.target.value)}
          />
          <label className="" htmlFor="">
            <i className="fa-solid fa-exclamation"></i> Changing your password
            will sign you out of your other devices. You’ll need to enter the
            new password.
          </label>
          <button
            type="submit"
            style={{
              width: "300px",
              fontWeight: "500",
              color: "black",
              margin: "10px auto",
              fontSize: "16px",
              borderRadius: "5px",
            }}
            className="btn-loginPage"
            disabled={loadingBtn}
          >
            {loadingBtn ? <LoadingButton /> : "CHANGE PASSWORD"}
          </button>
        </div>
      </form>
    </>
  );
};
