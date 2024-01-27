import { Outlet } from "react-router-dom";
import { AdminNav } from "./components/AdminNav";
import { Sidebar } from "./components/Sidebar";

export const Dashboard = () => {
  return (
    <>
      <style>
        {`
        body {
          background-color: #323236;
        }
      `}
      </style>
      <AdminNav />
      <div className="container-fluid">
        <div className="row d-flex gap-1 flex-lg-nowrap">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
