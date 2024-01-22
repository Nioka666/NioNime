import { fetchUserData } from "@utils/anime";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const InnerNav = () => {
  const navigate = useNavigate();
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

  const checkLoginStatus = () => {
    if (userData?.username) {
      return true;
    } else {
      return false;
    }
  };

  const isUserLoggedIn = checkLoginStatus();
  // console.log(`status: ${isUserLoggedIn}`);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/logout", null, {
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
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold" style={{ gap: "25px" }}>
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
                src={"../../img/gojj.jpg"}
                alt=""
                width="38"
                height="38"
                className="rounded-circle"
                style={{ marginLeft: "-6px", marginTop: "0px" }}
              />
            ) : (
              <i className="fa-solid fa-user font-nav-icon" style={{ marginTop: "8px" }}></i>
            )}
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark bg-dark text-lights"
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
                      className="fa-solid fa-arrow-right-to-bracket"
                      style={{ transform: "rotate(180deg)" }}
                    ></i>
                    <span className="ml-12" style={{ color: "#cecece" }}>
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
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
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
    height: isDisabledPath ? "70px" : "80px",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 10) {
        setNavStyles({
          backgroundColor: "#000000a3",
          backdropFilter: "blur(10px)",
          height: "75px",
        });
      } else if (currentPath !== "/account" && currentPath !== "/watch") {
        setNavStyles({
          backgroundColor: "transparent",
          backdropFilter: "none",
          height: "83px",
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
            <img src="../../img/logo.png" height="25px" />
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
