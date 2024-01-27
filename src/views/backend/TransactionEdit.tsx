/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { UpdateTrxStatus, fetchTrxDetail } from "@utils/anime";

export const TransactionEdit = () => {
  const { trxID } = useParams();
  const { data: trxDetail } = useSWR(
    "fetchTrxDetail",
    () => fetchTrxDetail(trxID),
    { revalidateOnFocus: false }
  );

  const photoEvidence = `../../../public/img/evidence/${trxDetail?.photo_evidence}`;

  const [newStatus, setNewStatus] = useState(trxDetail?.status);

  const { data: trxStatusUpdate, mutate: updateTrxStatus } = useSWR(
    ["updateTrxStatus", trxID, newStatus],
    () => UpdateTrxStatus(trxID, newStatus)
  );

  console.log(trxStatusUpdate);

  useEffect(() => {
    // Set the default value of newStatus to the current status when trxDetail is available
    if (trxDetail?.status) {
      setNewStatus(trxDetail.status);
    }
  }, [trxDetail]);

  const handleStatusChange = (event: any) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    updateTrxStatus();
  };

  if (!trxDetail) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="col-md-9 trx-edit h-auto">
        <div className="card bg-black text-white h-satus user-card">
          <div className="card-header text-lights">
            <h4 className="text-lighs">Transactions data</h4>
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
                      <label htmlFor="status">Transaction Status:</label>
                    </td>
                    <td>
                      <select
                        id="status"
                        value={newStatus}
                        onChange={handleStatusChange}
                        className="form-control dark rounded"
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        {["Unprocessed", "Process", "Success", "Failed"].map(
                          (status, index) => (
                            <option key={index} value={status}>
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
                    <td colSpan={2} style={{ paddingTop: "10px" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateStatus}
                      >
                        Update Status
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            <section className="photo_evidence">
              <h3>Photo Evidence</h3>
              <img src={`${photoEvidence}`} alt="Evidence" />;
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
