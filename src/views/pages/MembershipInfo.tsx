import { fetchUserData, serverURL } from "@utils/anime";
import { LoadingButton } from "@views/components/Loading";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";

export const MembershipInfo = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const { data: userData } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: false,
  });

  // const { data: userMembership } = useSWR("fetchUserMembership", () => axios)

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
        <h3>Membership Information</h3>
        <h6 className="text-gray mt-1">Your Membership Information</h6>
        <div className="input-groups d-grid gap-4 mt-5">
          <input
            type="text"
            name="username"
            placeholder="Your Username"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
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
            <i className="fa-solid fa-exclamation"></i> Changing your
            information will sign change all about you here.
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
            {loadingBtn ? <LoadingButton /> : "SUBMIT CHANGES"}
          </button>
        </div>
      </form>
    </>
  );
};
