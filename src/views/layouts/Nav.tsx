import { useEffect, useState } from "react";

const InnerNav = () => {
  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
        <li className="nav-item">
          <a className="nav-link fw-medium text-lights" href="/categories">
            News
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link fw-medium text-lights" href="/about">
            About
          </a>
        </li>
        <li className="nav-item">
          <a href="/search" className="nav-link">
            <i className="fa-solid fa-magnifying-glass font-nav-icon"></i>
          </a>
        </li>
        {/* dropdown */}
        <li className="nav-item dropstart">
          <a
            className="nav-link dropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-regular fa-user font-nav-icon"></i>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark bg-dark"
            style={{ position: "absolute", top: "50px", right: "-10px" }}
          >
            {/* <li>
              <a className="dropdown-item text-lights" href="#">
                <span className="ml-12">Register</span>
              </a>
            </li> */}
            {/* Profile */}
            <li>
              <a className="dropdown-item text-lights" href="/account">
                <i className="fa-solid fa-id-badge"></i>
                <span className="ml-12">Profile</span>
              </a>
            </li>
            {/* Sign in */}
            <li>
              <a className="dropdown-item text-lights" href="/auth/login">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span className="ml-12">Sign in</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item text-lights" href="#">
                <i
                  className="fa-solid fa-arrow-right-to-bracket"
                  style={{ transform: "rotate(180deg)" }}
                ></i>
                <span className="ml-12">Sign out</span>
              </a>
            </li>
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
    height: isDisabledPath ? "80px" : "90px",
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition > 10) {
        setNavStyles({
          backgroundColor: "#000000a3",
          backdropFilter: "blur(10px)",
          height: "80px",
        });
      } else if (currentPath !== "/account" && currentPath !== "/watch") {
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
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="../../img/logo.png" height="27px" />
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
