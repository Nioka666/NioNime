/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { AdminNav } from "./components/AdminNav";
import { Sidebar } from "./components/Sidebar";
import { fetchAllUserData } from "@utils/anime";

export const Dashboard = () => {
  const {
    data: userData,
    error: errorUserData,
  } = useSWR("fetchAllUserData", () => fetchAllUserData(), {
    revalidateOnFocus: false,
  });

  if (errorUserData) {
    console.error(errorUserData);
  }

  let no_asc: number = 1;

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
          <div className="col-md-9" style={{ padding: "100px 0px", margin: "0 -10px", width: "78%" }}>
            <div className="card bg-black text-white h-satus user-card">
              <div className="card-header" style={{ padding: "50px 0px 0px 45px" }}>
                <h3 className="text-lighs">Table contents</h3>
              </div>
              <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title text-gray" style={{ paddingLeft: "20px" }}>Special title treatmentless our commits</h5>
                  <a href="#" className="btn btn-warning fw-medium" style={{ margin: "-20px 50px 0 0" }}>Add Data</a>
                </div>
                <br />
                <table className="table table-dark bg-black table-borderless table-hover mt-3" style={{ marginRight: "200px" }}>
                  <thead className="p-2">
                    <tr>
                      <td>No</td>
                      <td>Username</td>
                      <td>Email</td>
                      <td>Phone Number</td>
                      <td>Membership Level</td>
                    </tr>
                  </thead>
                  <tbody className="p-4">
                    {userData?.map((user: any) => (
                      <tr>
                        <td>{no_asc}</td>
                        <td>{user?.username}</td>
                        <td>{user?.email}</td>
                        <td>{user?.phone_number}</td>
                        <td>{user?.membership_level}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

