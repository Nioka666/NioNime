/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// For Customers
import { fetchAllUserData } from "@utils/anime";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AddButtonSM } from "./components/AddButton";

export const UserDetails = () => {
  const navigate = useNavigate();
  let no_asc: number = 1;
  const { data: userData, error: errorUserData } = useSWR(
    "fetchAllUserData",
    () => fetchAllUserData(),
    {
      revalidateOnFocus: false,
    }
  );

  if (errorUserData) {
    console.error(errorUserData);
  }
  // console.log(import.meta.env.VITE_BASEURL);
  const handleEditUser = (userId: any) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleDeleteUser = async (userId: any) => {
    try {
      await axios.post(
        "http://localhost:3000/api/user-delete",
        { userId },
        { withCredentials: true }
      );
      console.log(`success deleting user with id: ${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <div
      className="col-md-9"
      style={{ padding: "100px 0px", margin: "0 -20px", width: "80%" }}
    >
      <div className="card bg-black text-white h-satus user-card">
        <div className="card-header" style={{ padding: "50px 0px 0px 45px" }}>
          <h4 className="text-lighs">Table contents</h4>
        </div>
        <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h6
              className="card-title text-gray"
              style={{ paddingLeft: "20px" }}
            >
              Special title treatmentless our commits
            </h6>
            <AddButtonSM jumpTo="admin" />
          </div>
          <hr />
          <table
            className="table table-dark bg-black table-borderless table-hover mt-3"
            style={{ marginRight: "200px" }}
          >
            <thead className="p-2">
              <tr>
                <td>No</td>
                <td>Username</td>
                <td>Email</td>
                <td>Phone Number</td>
                <td>Membership Level</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody className="p-4">
              {userData?.map((user: any) => (
                <tr key={user._id}>
                  <td>{no_asc}</td>
                  <td>{user?.username}</td>
                  <td>{user?.email}</td>
                  <td>{user?.phone_number}</td>
                  <td>{user?.membership_level}</td>
                  <td className="d-flex gap-3">
                    <button
                      className="button-action"
                      onClick={() => handleEditUser(user?._id)}
                    >
                      <i className="fa-solid fa-pen text-warning"></i>
                    </button>

                    <button
                      className="button-action"
                      onClick={() => handleDeleteUser(user?._id)}
                    >
                      <i className="fa-solid fa-trash text-danger"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
