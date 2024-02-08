/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { fetchUserData, serverURL } from "@utils/anime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import logo from "/src/img/logo.png";
import avatar from "/src/img/gojj.jpg";
import { AlertConfirmDialog } from "@views/components/Modals";
import toast, { Toaster } from "react-hot-toast";

const InnerNav = () => {
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: false,
  });

  const checkLoginStatus = () => {
    if (userData?.username) {
      return true;
    } else {
      return false;
    }
  };

  const isUserLoggedIn = checkLoginStatus();

  const handleLogout = async () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirmLogout = async (isConfirmed: any) => {
    if (isConfirmed) {
      try {
        await axios.post(`${serverURL}/api/logout`, null, {
          withCredentials: true,
        });
        await toast.promise(
          new Promise((resolve) => {
            setTimeout(resolve, 2000);
          }),
          {
            loading: "Loading...",
            success: "Your Successfully Signed out!",
            error: "Your Sign out is Failed",
          }
        );
        navigate("/");
        window.location.reload();
      } catch (error) {
        console.error("Logout error:", error);
      }
    } else {
      handleCloseDialog();
    }
  };

  return (
    <>
      <AlertConfirmDialog
        openDialog={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleConfirm={handleConfirmLogout}
        headerMessageConfirmDialog={"Confirm for deleting this data?"}
        messageConfirmDialog={
          "By Confirm deleting this data, you can't reable this data again"
        }
      />
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
      <ul
        className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold"
        style={{ gap: "25px" }}
      >
        <li className="nav-item">
          <a className="nav-link fw-semibold text-lights" href="/about">
            <i
              className="fa-solid fa-crown text-warning font-nav-icon"
              style={{ marginTop: "5px", fontSize: "23.5px" }}
            ></i>
          </a>
        </li>
        <li className="nav-item">
          <a href="/search" className="nav-link">
            <i
              className="fa-solid fa-magnifying-glass font-nav-icon"
              style={{ marginTop: "8px" }}
            ></i>
          </a>
        </li>
        <li className="nav-item dropstart">
          <a
            className="nav-link dropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {isUserLoggedIn ? (
              <img
                src={avatar}
                alt=""
                width="36"
                height="36"
                className="rounded-circle"
                style={{ marginLeft: "-6px", marginTop: "1.5px" }}
              />
            ) : (
              <i
                className="fa-solid fa-user font-nav-icon"
                style={{ marginTop: "8px" }}
              ></i>
            )}
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark text-lights"
            style={{ position: "absolute", top: "50px", right: "-10px" }}
          >
            {isUserLoggedIn && (
              <>
                <li>
                  <a className="dropdown-item text-lights" href="/account">
                    <i className="fa-solid fa-id-badge"></i>
                    <span className="ml-12" style={{ color: "#cecece" }}>
                      Profile
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-lights"
                    href="#"
                    onClick={handleLogout}
                  >
                    <i
                      className="fa-solid fa-arrow-right-to-bracket text-danger"
                      style={{ transform: "rotate(180deg)" }}
                    ></i>
                    <span className="ml-12 text-danger fw-semibold">
                      Sign out
                    </span>
                  </a>
                </li>
              </>
            )}
            {!isUserLoggedIn && (
              <>
                <li>
                  <a className="dropdown-item text-lights" href="/auth/login">
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <span className="ml-12" style={{ color: "#cecece" }}>
                      Sign in
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-lights"
                    href="/auth/register"
                  >
                    <i className="fa-solid fa-user-plus"></i>
                    <span className="ml-12" style={{ color: "#cecece" }}>
                      Sign up
                    </span>
                  </a>
                </li>
              </>
            )}
          </ul>
        </li>
      </ul>
    </>
  );
};

export const Nav: React.FC = () => {
  const currentPath = window.location.pathname;
  const paths: string[] = ["/account", "/watch"];
  const isDisabledPath = paths.includes(currentPath);
  const [navStyles, setNavStyles] = useState({
    backgroundColor: isDisabledPath ? "#000000a3" : "transparent",
    backdropFilter: isDisabledPath ? "blur(5px)" : "none",
    height: isDisabledPath ? "73px" : "90px",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 10) {
        setNavStyles({
          backgroundColor: "#000000a3",
          backdropFilter: "blur(10px)",
          height: "73px",
        });
      } else if (
        currentPath !== "/account" &&
        currentPath !== "/account/user-info" &&
        currentPath !== "/account/change-password" &&
        currentPath !== "/account/membership-info" &&
        currentPath !== "/watch" &&
        currentPath !== "/account/order-history"
      ) {
        setNavStyles({
          backgroundColor: "transparent",
          backdropFilter: "none",
          height: "90px",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPath]);

  return (
    <>
      <nav
        id="nav"
        className="navbar navbar-expand-lg fixed-top navbar-dark text-white"
        style={navStyles}
      >
        <div className="container" style={{ gap: "70px" }}>
          <a className="navbar-brand" href="/">
            <img src={logo} height="25px" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {/* {currentPath !== "/account" && <InnerNav />} */}
            <InnerNav />
          </div>
        </div>
      </nav>
    </>
  );
};
