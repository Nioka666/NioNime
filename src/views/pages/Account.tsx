/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { fetchUserData, serverURL } from "@utils/anime";
import { Link, Outlet, useNavigate } from "react-router-dom";
import avatar from "/src/img/gojj.jpg";
import axios from "axios";
import ProgressLoad from "@views/components/ProgressLoad";
import { useEffect, useState } from "react";
// import { ChangePasswordForm } from "./ChangePassword";

const ProfileDetails = (props: any) => {
  return (
    <>
      <div className="container d-flex profile-detail">{props.children}</div>
    </>
  );
};

const UserProfile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { data: userData, isValidating: isLoadingUserData } = useSWR(
    "fetchUserData",
    () => fetchUserData(),
    {
      revalidateOnFocus: false,
    }
  );
  console.log(isLoggedIn);
  
  useEffect(() => {
    if (!userData) {
      setLoggedIn(false);
      navigate("/auth/login");
      window.location.reload();
    }
  }, [userData, navigate]);
  const userIDs = userData?.id;
  const { data: userDetail } = useSWR("fetchUserDetail", () =>
    axios
      .post(
        `${serverURL}/api/user-details`,
        { userIDs },
        { withCredentials: true }
      )
      .then((response) => response.data)
  );

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
  ];

  const bottomMenuItem: any = [
    {
      id: "order-history",
      label: "Order History",
    },
    {
      id: "so",
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(`${serverURL}/api/logout`, null, {
        withCredentials: true,
      });
      console.log("Logout success");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

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
                  {userDetail?.membership_level}
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
                  <Link to={bottomMenuItem[0].id} className="text-gray">
                    {bottomMenuItem[0].label}
                  </Link>
                </li>
                <li>
                  <a className="text-danger fw-semibold" onClick={handleLogout}>
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <ProgressLoad />
      </>
    );
  }
  return (
    <>
      <div
        className="p-5 text-center bg-black"
        style={{
          // marginTop: "88px",
          // backgroundPosition: "0px",
          backgroundImage: "url(../../../public/img/dark_war.jpg)",
          backgroundSize: "cover",
          height: "260px",
          cursor: "pointer",
        }}
      ></div>
      <UserProfile />
    </>
  );
};
