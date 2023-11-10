import { useEffect, useState } from "react";

const InnerNav = () => {
  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold">
        <li className="nav-item">
          <a className="nav-link fw-medium text-lights" href="/anime-detail">
            Categories
          </a>
        </li>
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
      </ul>
      {/*  */}
      <div className="right-nav-wrapper d-flex">
        <h6>
          <i className="fa-solid fa-magnifying-glass fs-5"></i>
        </h6>
        <h6>
          <a href="/account">
            <i className="fa-regular fa-user fs-5"></i>
          </a>
        </h6>
      </div>
    </>
  );
};

export const Nav: React.FC = () => {
  const currentPath = window.location.pathname;
  const [navStyles, setNavStyles] = useState({
    backgroundColor: "transparent",
    backdropFilter: "none",
    height: "90px",
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
      } else {
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
  }, []);

  return (
    <>
      <nav
        id="nav"
        className="navbar navbar-expand-lg fixed-top navbar-dark text-white"
        style={navStyles}
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="./img/logo.png" height="27.9px" />
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
            {currentPath !== "/login" && currentPath !== "/register" && (
              <InnerNav />
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
