/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// For Customers
import { fetchAllUserData } from "@utils/anime";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AddButtonSM } from "./components/AddButton";
import { Key, useEffect, useState } from "react";
import { Loading } from "@views/components/Loading";

export const UserLists = () => {
  const [loadingPage, setLoadingPage] = useState(true);

  const navigate = useNavigate();
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
    navigate(`/admin/edit-user/${userId}`);
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

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: any = userData?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages: any = Math.ceil(userData?.length / itemsPerPage);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingPage(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loadingPage) {
    return (
      <>
        <div
          className="col-md-10"
          style={{
            padding: "90px 0px 50px 0",
            margin: "0 0px",
            width: "102%",
            marginRight: "-200px",
          }}
        >
          <Loading />
        </div>
      </>
    );
  }

  return (
    <div
      className="col-md-10"
      style={{
        padding: "90px 0px 50px 0",
        margin: "0 0px",
        width: "102%",
        marginRight: "-200px",
      }}
    >
      <div className="card bg-black text-white h-satus user-card">
        <div className="card-header" style={{ padding: "50px 30px 0px 45px" }}>
          <h4 className="text-lighs">Users Data</h4>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-title text-gray">
              Special title treatmentless our commits
            </h6>
            <AddButtonSM jumpTo="admin" />
          </div>
        </div>
        <div
          className="card-body"
          style={{ padding: "0 25px 25px 25px", overflowX: "auto" }}
        >
          <hr />
          <div
            className="datamaster-table"
            style={{ maxWidth: "100%", overflowX: "auto" }}
          >
            <table
              className="table table-dark bg-black table-borderless table-hover mt-2"
              style={{ whiteSpace: "nowrap" }}
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
                {currentItems?.map(
                  (
                    user: {
                      _id: Key | null | undefined | any;
                      username: any;
                      email: any;
                      phone_number: any;
                      membership_level: any;
                    },
                    index: number
                  ) => (
                    <tr key={user._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>{user?.username}</td>
                      <td>{user?.email}</td>
                      <td>{user?.phone_number}</td>
                      <td>{user?.membership_level}</td>
                      <td className="d-flex gap-3">
                        <button
                          className="button-action btn-icon-crud"
                          onClick={() => handleEditUser(user?._id)}
                        >
                          <i className="fa-solid fa-info text-infos"></i>
                        </button>
                        <button
                          className="button-action btn-icon-crud"
                          onClick={() => handleDeleteUser(user?._id)}
                        >
                          <i className="fa-solid fa-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="data-master-pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
