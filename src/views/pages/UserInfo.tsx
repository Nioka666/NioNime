/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUserData, serverURL } from "@utils/anime";
import { Loading } from "@views/components/Loading";
import axios from "axios";
// import { useState } from "react";
import useSWR from "swr";

// Change Password Form
export const UserInfo = () => {
  // const [loadingBtn, setLoadingBtn] = useState(false);
  // const [userID, setUserID] = useState("");
  // const [newPassword, setNewUserName] = useState("");
  // const [newEmail, setNewEmail] = useState("");

  const { data: userData } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: false,
  });

  const userIDs = userData?.id;
  const { data: allDataUser, isValidating: loadingDataUser } = useSWR(
    "fetchAllUser",
    () =>
      axios
        .post(
          `${serverURL}/api/user-details`,
          { userIDs },
          { withCredentials: true }
        )
        .then((response) => response.data)
  );

  console.log(allDataUser);

  const userId = allDataUser?._id;
  const userUsername = allDataUser?.username;
  const userEmail = allDataUser?.email;
  // console.log(allDataUser);

  // const handleChangeUserDetail = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const username = userData?.username;

  //   try {
  //     setLoadingBtn(true);
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     const response = await axios.post(
  //       `${serverURL}/api/account/user-edit`,
  //       { userID, username, newEmail, newPassword },
  //       { withCredentials: true }
  //     );
  //     console.log(response.data.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <form className="d-grid changePassword">
        <h3>Account Information</h3>
        <h6 className="text-gray mt-1">Your User Information</h6>
        {loadingDataUser && <Loading />}
        {!loadingDataUser && (
          <div className="input-groups d-grid gap-4 mt-5">
            <label htmlFor="userID">User ID</label>
            <input
              type="text"
              name="userID"
              placeholder="Your User ID"
              value={userId}
              // onChange={(e) => setUserID(e.target.value)}
              disabled
            />
            <label htmlFor="userID">Your Username</label>
            <input
              type="text"
              name="newUsername"
              placeholder="Your Username"
              value={userUsername}
              // onChange={(e) => setNewUserName(e.target.value)}
            />
            <label htmlFor="userID">Your Email</label>
            <input
              type="email"
              name="newEmail"
              placeholder="Your Email"
              value={userEmail}
              // onChange={(e) => setNewEmail(e.target.value)}
            />
            <label className="" htmlFor="">
              {/* <i className="fa-solid fa-exclamation"></i> Changing your
              information will sign change all about you here. */}
              <br />
            </label>
            {/* <button
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
            </button> */}
          </div>
        )}
      </form>
    </>
  );
};
