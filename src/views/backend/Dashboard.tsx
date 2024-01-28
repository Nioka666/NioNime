import { Outlet } from "react-router-dom";
import { AdminNav } from "./components/AdminNav";
import { Sidebar } from "./components/Sidebar";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <>
        <style>
          {`
        body {
          background-color: #2c2c2f;
          margin: 0;
        }

        .container-fluid {
          display: flex;
          min-height: 100vh;
        }

        .contents {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          margin-left: 240px;
          width: calc(100% - 370px); /* Menyesuaikan dengan lebar sidebar */
        }

        `}
        </style>
        <div className="container-fluid">
          <AdminNav />
          <div className="row d-flex gap-1 flex-lg-nowrap">
            <Sidebar />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <style>
        {`
        body {
          background-color: #2c2c2f;
          margin: 0;
        }

        .container-fluid {
          display: flex;
          min-height: 100vh;
        }

        .contents {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          margin-left: 240px;
          width: calc(100% - 370px); /* Menyesuaikan dengan lebar sidebar */
        }

        `}
      </style>
      <div className="container-fluid">
        <AdminNav />
        <div className="row d-flex gap-1 flex-lg-nowrap">
          <Sidebar />
        </div>
        <div className="contents d-flex gap-3" style={{ transition: "all ease-in-out 0.2s" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
