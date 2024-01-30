/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUserData, serverURL } from "@utils/anime";
import { Loading } from "@views/components/Loading";
import axios from "axios";
// import { useState } from "react";
import useSWR from "swr";

// Change Password Form
export const UserInfo = () => {
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
        .then((response) => response.data),
    { revalidateOnFocus: false }
  );

  const userId = allDataUser?._id;
  const userUsername = allDataUser?.username;
  const userEmail = allDataUser?.email;

  return (
    <>
      {loadingDataUser && <Loading />}
      {!loadingDataUser && (
        <form className="d-grid changePassword ">
          <h3>Account Information</h3>
          <h6 className="text-gray mt-1">Your User Information</h6>
          <div
            className="input-groups d-grid gap-4 mt-5 user-info-form"
            style={{ textAlign: "left" }}
          >
            <label htmlFor="userID">User ID</label>
            <input
              type="text"
              name="userID"
              placeholder="Your User ID"
              value={userId}
              disabled
            />
            <label htmlFor="userID">Your Username</label>
            <input
              type="text"
              name="newUsername"
              placeholder="Your Username"
              value={userUsername}
              disabled
            />
            <label htmlFor="userID">Your Email</label>
            <input
              type="email"
              name="newEmail"
              placeholder="Your Email"
              value={userEmail}
              disabled
            />
            <br />
          </div>
        </form>
      )}
    </>
  );
};
