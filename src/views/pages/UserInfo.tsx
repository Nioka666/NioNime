/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUserData, serverURL } from "@utils/anime";
import ProgressLoad from "@views/components/ProgressLoad";
import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import useSWR from "swr";

export const UserInfo = () => {
  // const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
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
  // state
  const [newUsername, setNewUsername] = useState(allDataUser?.username);
  const [newEmail, setNewEmail] = useState(allDataUser?.email);
  const [isUserChanged, setUserChanged] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    allDataUser?.phone_number
  );
  // end of state
  const userID = allDataUser?._id;
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${serverURL}/api/account/user-edit`,
        {
          userID,
          newUsername,
          newEmail,
          newPhoneNumber,
        },
        { withCredentials: true }
      );
      if (response?.status === 200) {
        setUserChanged(true);
        await toast.promise(
          new Promise((resolve) => {
            setTimeout(resolve, 2000);
          }),
          {
            loading: "Loading...",
            success: "Successfully Changed Your Data",
            error: "Failed to Change Data",
          }
        );
        window.location.reload();
      } else {
        setUserChanged(false);
      }
      console.log(response?.status);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      {loadingDataUser && <ProgressLoad />}
      {!loadingDataUser && (
        <form
          className="d-grid changePassword edit-user-form"
          encType="multipart/form-data"
        >
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
              value={allDataUser?._id}
              disabled
            />
            <label htmlFor="userID">Your Username</label>
            <input
              type="text"
              name="newUsername"
              placeholder="Your Username"
              value={isEditing ? newUsername : allDataUser?.username}
              onChange={(e) => setNewUsername(e.target.value)}
              disabled={!isEditing}
            />
            <label htmlFor="userID">Your Email</label>
            <input
              type="email"
              name="newEmail"
              placeholder="Your Email"
              value={isEditing ? newEmail : allDataUser?.email}
              onChange={(e) => setNewEmail(e.target.value)}
              disabled={!isEditing}
            />
            <label htmlFor="userID">Your Phone Number</label>
            <input
              type="number"
              name="newPhoneNumber"
              placeholder="Your Phone Number"
              value={isEditing ? newPhoneNumber : allDataUser?.phone_number}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
              disabled={!isEditing}
            />
            <br />
          </div>
          <h6 className="text-gray fw-light mb-4">
            *By changing informations to your newest preferences <br /> click
            edit button bellow and save
          </h6>
          {isEditing ? (
            <>
              <div
                className="btn-group d-flex"
                style={{ margin: "0px auto", gap: "20px" }}
              >
                <button
                  type="submit"
                  className="btn-loginPage fw-semibold"
                  style={{ width: "200px" }}
                  onClick={handleEditSubmit}
                >
                  Save Changes
                </button>
                <button
                  type="submit"
                  className="btn-loginPage bg-danger text-white"
                  style={{ width: "120px" }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <button
              type="button"
              className="btn-loginPage fw-semibold"
              style={{ margin: "7px auto" }}
              onClick={() => setIsEditing(true)}
            >
              Edit Data
            </button>
          )}
        </form>
      )}
    </>
  );
};
