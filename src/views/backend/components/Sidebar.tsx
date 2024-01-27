/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import "./style/AdminNav.css";
import logo from "../../../../public/img/logo.png";

export const Sidebar = () => {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "fa-solid fa-house me-2 ",
    },
    { id: "users", label: "Users", icon: "fa-regular fa-address-book me-2" },
    {
      id: "transactions",
      label: "Transactions",
      icon: "fa-solid fa-money-bills me-2",
    },
    {
      id: "memberships",
      label: "Memberships",
      icon: "fa-regular fa-id-badge me-2",
    },
  ];

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-2 bg-black"
        style={{
          width: "260px",
          minHeight: "100vh",
          height: "auto",
          borderRadius: "0 20px 20px 0",
        }}
      >
        <div className="sidebar-head text-center">
          <a className="admin-navbar-brand" href="/">
            <img src={logo} height="25px" />
          </a>
        </div>
        <ul className="nav nav-pills flex-column mb-auto nav-padding mt-5">
          {menuItems.map((menuItem: any) => (
            <li key={menuItem.id} className="nav-item">
              <Link to={menuItem.id} className={`nav-link text-lights`}>
                <i className={`${menuItem.icon} fs-5 ms-3`}></i>{" "}
                {menuItem.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
