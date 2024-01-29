/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { UpdateTrxStatus, fetchTrxDetail, serverURL } from "@utils/anime";
import toast, { Toaster } from "react-hot-toast";
import { Loading } from "@views/components/Loading";
import axios from "axios";

export const TransactionEdit = () => {
  const navigate = useNavigate();
  const { trxID } = useParams();
  const { data: trxDetail } = useSWR(
    "fetchTrxDetail",
    () => fetchTrxDetail(trxID),
    { revalidateOnFocus: false }
  );

  const photoEvidence = `../../../public/img/evidence/${trxDetail?.photo_evidence}`;

  const [newStatus, setNewStatus] = useState(trxDetail?.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStatusChange = (event: any) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      setIsSubmitting(true);
      if (newStatus !== trxDetail?.status) {
        await UpdateTrxStatus(trxID, newStatus);
      }

      await toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            resolve("Successfully toasted!");
          }, 500);
        }),
        {
          loading: "Loading...",
          success: "Successfully Updated!",
          error: "Failed to Updated!",
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (trxDetail?.status) {
      setNewStatus(trxDetail.status);
    }
  }, [trxDetail]);

  const handleCancel = async () => {
    navigate("/admin/transactions");
  };

  const userID = trxDetail?.users_id;
  const checkIsValidNobleFans = () => {
    if (newStatus === "Success") {
      return trxDetail?.membership_level;
    } else {
      return false;
    }
  };

  const isValidNobleFans = checkIsValidNobleFans();
  const { data: memberStatusUpdate } = useSWR("updatingMemberStatus", () =>
    axios
      .post(
        `${serverURL}/api/membership-update`,
        { userID, isValidNobleFans },
        { withCredentials: true }
      )
      .then((response) => response.data)
  );

  if (!trxDetail) {
    return <Loading />;
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
            duration: 5000,
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
                      <label htmlFor="trxId">Transaction ID:</label>
                    </td>
                    <td>
                      <span>{trxDetail._id}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="username">Username:</label>
                    </td>
                    <td>
                      <span>{trxDetail.username}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="membership">Membership Lvl:</label>
                    </td>
                    <td>
                      <span className="fw-bold">
                        {trxDetail.membership_level}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="status">Trx Status:</label>
                    </td>
                    <td>
                      <select
                        id="status"
                        value={newStatus}
                        onChange={handleStatusChange}
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
                      <label htmlFor="amount">Amount:</label>
                    </td>
                    <td>
                      <span>{trxDetail.amount.toLocaleString("ID-id")}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor="date">Date:</label>
                    </td>
                    <td>
                      <span>{trxDetail.date_transaction}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} style={{ paddingTop: "50px" }}>
                      <p className="text-gray fs-6 mb-4">
                        * By changing Transaction status is impact to <br />
                        users level for explicit
                      </p>
                      <button
                        type="button"
                        className="btn btn-warning fw-semibold fw-semibold btn-noblefan"
                        style={{ width: "200px" }}
                        onClick={handleUpdateStatus}
                        disabled={isSubmitting}
                      >
                        Update Status
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger fw-semibold w-25 fw-semibold btn-cancel ms-4"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            <section className="photo_evidence">
              <h4 className="text-gray mb-3" style={{ fontSize: "26px" }}>
                Photo Evidence :
              </h4>
              <img src={`${photoEvidence}`} alt="Evidence" />
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
