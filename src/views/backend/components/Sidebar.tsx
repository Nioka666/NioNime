/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style/AdminNav.css";
// import { useState } from 'react';

export const Sidebar = ({onMenuClick, activeMenu,} : {
  onMenuClick: (menuId: string) => void;
  activeMenu: string;
}) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard" },
    { id: "customers", label: "Customers" },
    { id: "transactions", label: "Transactions" },
    { id: "memberships", label: "Memberships" },
  ];

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-2 bg-black"
        style={{ width: "260px", minHeight: "100vh", height: "auto" }}
      >
        <br />
        <br />
        <br />
        <center>
          <h6 className="text-gray">Admin Dashboard</h6>
          <hr />
        </center>
        <ul
          className="nav nav-pills flex-column mb-auto nav-padding"
          style={{ marginTop: "0px" }}
        >
          {menuItems.map((menuItem) => (
            <li key={menuItem.id} className="nav-item">
              <a
                href="#"
                className={`nav-link ${
                  activeMenu === menuItem.id
                    ? "active fw-semibold"
                    : "text-graylights"
                }`}
                style={{
                  backgroundColor: activeMenu === menuItem.id ? "#434343" : "",
                  borderRadius: "13px",
                }}
                onClick={() => onMenuClick(menuItem.id)}
              >
                <svg className="bi pe-none me-2" width="16" height="16">
                  <use xlinkHref={`#${menuItem.id}`}></use>
                </svg>
                {menuItem.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
