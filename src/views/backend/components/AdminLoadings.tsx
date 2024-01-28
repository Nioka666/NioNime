import { AdminNav } from "./AdminNav";
import { Sidebar } from "./Sidebar";

export const AdminLoadings = () => {
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
};
