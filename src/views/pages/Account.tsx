/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { fetchUserData } from "@utils/anime";
import { Link, Outlet, useNavigate } from "react-router-dom";
import avatar from "../../img/gojj.jpg";
import bgBanner from "../../../public/img/dark_war.jpg";
// import { ChangePasswordForm } from "./ChangePassword";

const ProfileDetails = (props: any) => {
  return (
    <>
      <div className="container d-flex profile-detail">{props.children}</div>
    </>
  );
};

const UserProfile = () => {
  const {
    data: userData,
    error: errorUserData,
    isValidating: isLoadingUserData,
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
  };

  const isLoggedIn = checkLoginStatus();

  if (!isLoggedIn) {
    navigate("/auth/login");
  }

  const menuItems: any = [
    {
      id: "user-info",
      label: "Your Info",
    },
    { id: "membership-info", label: "Membership Info" },
    {
      id: "change-password",
      label: "Change Password",
    },
    // {
    //   id: "order_history",
    //   label: "Order History",
    // },
  ];

  return (
    <>
      <div
        className="container profile-page"
        style={{ margin: "-55px 0 0 72px" }}
      >
        <div className="row d-flex">
          <div className="col-lg-4 d-flex w-100 user-wrapper">
            <img
              src={avatar}
              width={"150px"}
              height={"150px"}
              className="bd-placeholder-img rounded-circle"
              style={{ border: "0px solid black", cursor: "pointer" }}
            />
            {isLoadingUserData && <h4 className="placeholder-glow"></h4>}
            {!isLoadingUserData && (
              <h4
                className="profile-username"
                style={{ margin: "85px 0 0 27px", fontWeight: "500" }}
              >
                {userData?.username} <br />
                <span style={{ fontSize: "17px", color: "gray" }}>
                  {userData?.membership_level}
                </span>
              </h4>
            )}
          </div>
          <ProfileDetails>
            <div className="options" style={{ marginLeft: "-15px" }}>
              <h5 className="mt-5 text-white">General</h5>
              <ul className="list-group text-gray list-unstyled">
                {menuItems.map((menu: any) => (
                  <Link to={menu.id} key={menu.id} className="text-gray">
                    <li key={menu.id}>{menu.label}</li>
                  </Link>
                ))}
              </ul>
              <h5 className="mt-5 text-white">Purchase & Credit</h5>
              <ul className="list-group text-gray list-unstyled">
                <li>
                  <a href="/account" className="text-gray">
                    Order History
                  </a>
                </li>
                <li>
                  <a href="/account" className="text-danger fw-semibold">
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
            <div className="inner-option text-center mt-5">
              <Outlet />
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
          backgroundImage: "url(../../../public/img/dark_war.jpg)",
          backgroundSize: "cover",
          // backgroundPosition: "0px",
          height: "260px",
          cursor: "pointer",
        }}
      ></div>
      {/* <img src={bgBanner} alt="" /> */}
      <UserProfile />
    </>
  );
};
