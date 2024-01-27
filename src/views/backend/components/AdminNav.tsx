import { fetchAdminData } from "@utils/anime";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

const InnerNav = () => {
  const navigate = useNavigate();
  const { data: adminData } = useSWR("fetchAdminData", () => fetchAdminData(), {
    revalidateOnFocus: false,
  });

  const checkLoginStatus = () => {
    if (adminData?.username) {
      return true;
    } else {
      return false;
    }
  };

  const isLoggedIn = checkLoginStatus();
  const avatarUrl = "../../../../public/img/blacks.jpg";

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
      <ul
        className="navbar-nav me-auto mb-2 mb-lg-0 fw-bold mt-1"
        style={{ marginLeft: "700px", gap: "20px" }}
      >
        <li className="nav-item">
          <form
            className="d-flex mt-3 mt-lg-0"
            role="search"
            style={{ marginLeft: "-130px" }}
          >
            <div className="input-group" style={{ marginTop: "3.5px" }}>
              <input
                className="form-control admin-nav-search"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{
                  borderRadius: "15px 0 0 15px",
                  color: "white",
                  border: "none",
                  backgroundColor: "#2e2f32",
                }}
                disabled
              />
              <button
                className="btn btn-secondary"
                type="button"
                style={{
                  borderRadius: "0 15px 15px 0",
                  backgroundColor: "#2e2f32",
                  border: "none",
                }}
              >
                <i
                  className="fa-solid fa-magnifying-glass font-nav-icon text-gray"
                  style={{ fontSize: "14px" }}
                ></i>
              </button>
            </div>
          </form>
        </li>
        <li className="nav-item dropstart" style={{ marginTop: "-8px" }}>
          <a
            className="nav-link dropdown"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ marginTop: "1px" }}
          >
            {/* <i className="fa-solid fa-circle-user" style={{ fontSize: "32px", color: "gray" }}></i> */}
            <img
              src={avatarUrl}
              alt=""
              width="40"
              height="40"
              className="rounded-circle"
            />
          </a>
          <ul
            className="dropdown-menu dropdown-menu-dark bg-dark text-lights"
            style={{ position: "absolute", top: "50px", right: "-10px" }}
          >
            {isLoggedIn && (
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
                      style={{ transform: "rotate(180deg)", color: "#cf0000" }}
                    ></i>
                    <span
                      className="ml-12 fw-semibold"
                      style={{ color: "#cf0000" }}
                    >
                      Sign out
                    </span>
                  </a>
                </li>
              </>
            )}
            {!isLoggedIn && (
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

export const AdminNav: React.FC = () => {
  return (
    <>
      <nav
        id="nav"
        className="navbar navbar-expand-lg text-white"
        style={{
          width: "75%",
          borderRadius: "15px",
          padding: "0 15px 0 70px",
          position: "absolute",
          height: "75px",
          margin: "17px 0 0 280px",
        }}
      >
        <div className="container">
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
          <div
            className="collapse navbar-collapse d-flex"
            id="navbarTogglerDemo02"
          >
            <InnerNav />
          </div>
        </div>
      </nav>
    </>
  );
};
