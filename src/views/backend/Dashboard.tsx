import { Outlet } from "react-router-dom";
import { AdminNav } from "./components/AdminNav";
import { Sidebar } from "./components/Sidebar";

export const Dashboard = () => {
  return (
    <>
      <style>
        {`
        body {
          background-color: #2c2c2f;
        }
      `}
      </style>
      <div className="container-fluid">
        <AdminNav />
        <div className="row d-flex gap-1 flex-lg-nowrap">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
