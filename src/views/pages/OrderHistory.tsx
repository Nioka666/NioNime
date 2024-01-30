/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchTrxData, fetchTrxDetail, serverURL } from "@utils/anime";
import axios from "axios";
import useSWR from "swr";

export const OrderHistory = () => {
  // trx session
  const { data: trxData } = useSWR("fetchTrxData", () => fetchTrxData());
  const trxID = trxData?.[0]?.id;
  // trx live
  const { data: trxDetail } = useSWR("fetchTrxData", () =>
    axios
      .post(
        `${serverURL}/api/transaction-find/`,
        { trxID },
        { withCredentials: true }
      )
      .then((response) => response.data)
  );

  console.log(trxDetail);
  const trxDataID: string = trxDetail?.[0]?.id;
  const trxDataStatus: string = trxDetail?.[0]?.status;
  // const trxUserID: string = trxDetail?.[0]?.users_id;
  const trxType: string = trxDetail?.[0]?.membership_level;
  const trxDate = trxDetail?.[0]?.date_transaction
    ? new Date(trxDetail[0].date_transaction)
    : null;

  let dayname = "";
  let formattedDate = "N/A";

  if (trxDate instanceof Date) {
    const day = trxDate.getDate().toString().padStart(2, "0");
    const month = (trxDate.getMonth() + 1).toString().padStart(2, "0");
    const year = trxDate.getFullYear();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    dayname = daysOfWeek[trxDate.getDay()];
    formattedDate = `${dayname}, ${day}-${month}-${year}`;
  }

  return (
    <>
      <div className="card bg-black text-white accountMenu">
        <h3>Order History</h3>
        <h6 className="text-gray mt-1">Your Membership Information</h6>
        <div className="card bg-black text-white child-card">
          <div className="card-body"></div>
          <div className="input-groups d-grid gap-4 mt-5 card-order-history">
            <div className="d-flex justify-content-between">
              <h4 className="text-warning fw-bold">{trxType}</h4>
              <i className="fa-regular fa-circle-question text-gray mt-2 fs-5"></i>
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              <div className="gap-4">
                <h6>Transaction ID : </h6>
                <h6 className="text-gray">{trxDataID}</h6>
              </div>
              <div className="gap-4">
                <h6>Status : </h6>
                <h6 className="text-gray">{trxDataStatus}</h6>
              </div>

              <div className="gap-4">
                <h6>Date Trx :</h6>
                <h6 className="text-gray">{formattedDate}</h6>
              </div>
            </div>
            {/* <table>
            <tbody>
              <tr>
                <td>
                  <div
                    className="heads"
                    style={{
                      display: "grid",
                      marginBottom: "20px",
                    }}
                  >
                    <h6 className="text-gray mt-3">(Membershihps Invoice)</h6>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="id">Transaction ID:</label>
                </td>
                <td>
                  <span>pp</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="id">Username:</label>
                </td>
                <td>
                  <span>ookoko</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="id">Membership Purchased:</label>
                </td>
                <td>
                  <span className="fw-bold">kokoko</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="id">Transaction Status:</label>
                </td>
                <td>
                  <span>okokok</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="id">Amount:</label>
                </td>
                <td>
                  <span>okokoko</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="id">Date:</label>
                </td>
                <td>
                  <span>ijijij</span>
                </td>
              </tr>
            </tbody>
          </table> */}
            <h1 className="text-white fw-bold"></h1>
          </div>
        </div>
        <label className="text-gray mt-5" htmlFor="">
          <i className="fa-solid fa-exclamation text-gray"></i> Your membership
          is being on for a lifetime..
        </label>
      </div>
    </>
  );
};
