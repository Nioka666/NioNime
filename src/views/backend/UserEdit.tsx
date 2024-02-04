/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverURL } from "@utils/anime";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

export const UserEdit = () => {
  const navigate = useNavigate();
  const { userIDs } = useParams();
  const { data: userDetail } = useSWR("fetchUserDetail", () =>
    axios
      .post(
        `${serverURL}/api/user-details`,
        { userIDs },
        { withCredentials: true }
      )
      .then((response) => response.data)
  );

  const handleLevelEdit = () => {
    
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },

          success: {
            duration: 2500,
          },
        }}
      />
      <div
        className="col-md-9 trx-edit h-auto"
        style={{
          padding: "90px 0px 50px 0",
          margin: "0 0px",
          width: "102%",
          marginRight: "-200px",
        }}
      >
        <div className="card bg-black text-white h-satus user-card">
          <div className="card-header text-lights">
            <h3 className="text-lighs">Transactions Details</h3>
            <h6 className="text-gray mt-2">
              All of customers transaction can be updated here
            </h6>
            <hr className="mt-4" />
          </div>
          <div className="card-body d-flex">
            <form>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <label htmlFor="trxId">User ID :</label>
                    </td>
                    <td>
                      <span>{userDetail?._id}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="username">Username :</label>
                    </td>
                    <td>
                      <span>{userDetail?.username}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="membership">Email :</label>
                    </td>
                    <td>
                      <span className="fw-bold">{userDetail?.email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="status">Membership Level :</label>
                    </td>
                    <td>
                      <select
                        id="status"
                        value={userDetail?.membership_level}
                        onChange={() => {}}
                        className="form-control bg-dark border-0 text-white"
                        style={{
                          padding: "12px 20px",
                          borderRadius: "17px",
                          cursor: "pointer",
                        }}
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        {["Unprocessed", "Process", "Success", "Failed"].map(
                          (status, index) => (
                            <option
                              key={index}
                              value={status}
                              style={{
                                fontSize: "17px",
                                padding: "150px 15px",
                              }}
                            >
                              {status}
                            </option>
                          )
                        )}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="amount">Amount :</label>
                    </td>
                    <td>
                      {/* <span>{trxDetail.amount.toLocaleString("ID-id")}</span> */}
                      <span>iii</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="date">Date :</label>
                    </td>
                    <td>
                      {/* <span>{trxDetail.date_transaction}</span> */}
                      <span>ooo</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="date">Expired Date :</label>
                    </td>
                    <td>
                      <span>uu</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ paddingTop: "70px" }}>
                      <p className="text-gray fs-6 mb-4">
                        * By changing Transaction status is impact to <br />
                        users level for explicit
                      </p>
                      <button
                        type="button"
                        className="btn btn-warning fw-semibold fw-semibold btn-noblefan"
                        style={{ width: "200px" }}
                        onClick={() => {}}
                        disabled={true}
                      >
                        Update Status
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger fw-semibold w-25 fw-semibold btn-cancel ms-4"
                        onClick={() => {}}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
