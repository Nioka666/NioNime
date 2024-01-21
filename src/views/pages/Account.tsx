/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";
import { LoadingButton } from "../components/Loading";
import useSWR from "swr";
import { fetchUserData } from "@utils/anime";
import { useNavigate } from "react-router-dom";

const ProfileDetails = (props: any) => {
  return (
    <>
      <div className="container d-flex profile-detail">
        {props.children}
      </div>
    </>
  );
};

const UserProfile = () => {
  const {
    data: userData,
    error: errorUserData,
    isValidating: isLoadingUserData
  } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: false,
  });

  if (errorUserData) {
    console.error(errorUserData);
  }
  const navigate = useNavigate();
  const checkLoginStatus = () => {
    if (userData?.username) {
      return true;
    } else {
      return false;
    }
  }

  const isLoggedIn = checkLoginStatus();

  if (!isLoggedIn) {
    navigate("/auth/login");
  }

  return (
    <>
      <div
        className="container profile-page"
        style={{ margin: "-55px 0 0 72px" }}
      >
        <div className="row d-flex">
          <div className="col-lg-4 d-flex w-100 user-wrapper">
            <img
              src="./img/gojj.jpg"
              width={"150px"}
              height={"150px"}
              className="bd-placeholder-img rounded-circle"
              style={{ border: "0px solid black", cursor: "pointer" }}
            />
            {isLoadingUserData && (
              <h4 className="placeholder-glow"></h4>
            )}
            {!isLoadingUserData && (
              <h4
                className="profile-username"
                style={{ margin: "85px 0 0 27px", fontWeight: "500" }}
              >
                {userData?.username} <br />
                <span style={{ fontSize: "17px", color: "gray" }}>
                  Plain User
                </span>
              </h4>
            )}
          </div>
          <ProfileDetails>
            <div className="options" style={{ marginLeft: "-15px" }}>
              <h5 className="mt-5 text-white">General</h5>
              <ul className="list-group text-gray list-unstyled">
                <li>
                  <a href="/account/account-info" className="text-gray">
                    Your Info
                  </a>
                </li>
                <li>
                  <a href="/account/notification" className="text-gray">
                    Notifications
                  </a>
                </li>
                <li>
                  <a href="/account/membership-info" className="text-gray">
                    Membership info
                  </a>
                </li>
                <li>
                  <a href="/account/change-email" className="text-gray">
                    Change Email
                  </a>
                </li>
                <li>
                  <a href="/account/change-password" className="text-gray">
                    Change Password
                  </a>
                </li>
              </ul>
              <h5 className="mt-5 text-white">Purchase & Credit</h5>
              <ul className="list-group text-gray list-unstyled">
                <li>
                  <a href="/account" className="text-gray">
                    Order History
                  </a>
                </li>
              </ul>
            </div>
            {/* Inner Option */}
            <div className="inner-option text-center mt-5">
              <ChangePasswordForm />
            </div>
          </ProfileDetails>
        </div>
      </div>
    </>
  );
};

export const Account = () => {
  return (
    <>
      <div
        className="p-5 text-center bg-black"
        style={{
          // marginTop: "88px",
          backgroundImage: "url(./img/dark_war.jpg)",
          backgroundSize: "cover",
          // backgroundPosition: "0px",
          height: "260px",
          cursor: "pointer"
        }}
      ></div>
      <UserProfile />
    </>
  );
};

// Change Password Form
export const ChangePasswordForm = () => {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const {
    data: userData,
    error: errorUserData,
  } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: false,
  });

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
        "http://localhost:3000/api/account/change-password",
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

export const UserInfo = () => {
  return (<>
    <h1>info</h1>
  </>)
}