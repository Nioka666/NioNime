/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchUserData, serverURL } from "@utils/anime";
import axios from "axios";
import { Link } from "react-router-dom";
import useSWR from "swr";

export const OrderHistory = () => {
  // trx session
  const { data: userDetail } = useSWR("fetchUserDetail", () => fetchUserData());
  const currentUserID = userDetail?.id;
  const { data: trxData } = useSWR("fetchTrxData", () =>
    axios
      .post(
        `${serverURL}/api/user-transaction-find`,
        { currentUserID },
        { withCredentials: true }
      )
      .then((response) => response.data)
  );
  const trxID = trxData?._id;
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

  const checkAvailableTrx = () => {
    if (trxDetail !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  let isAvailableTrx = checkAvailableTrx();

  const trxDataID: string = trxDetail?._id;
  const trxDataStatus: string = trxDetail?.status;
  const trxType: string = trxDetail?.membership_level;
  const trxDate = trxDetail?.date_transaction
    ? new Date(trxDetail?.date_transaction)
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
        {!isAvailableTrx && (
          <>
            <div className="card bg-black text-white child-card">
              <center>
                <div
                  className="empty-order mt-5"
                  style={{ padding: "20px 150px" }}
                >
                  <i className="fa-solid fa-clock-rotate-left text-klawu fs-1 rotating-waiting-order-history"></i>
                  <h3 className="text-klawu fw-semibold mt-4">
                    Your Order History still <br /> empty right now
                  </h3>
                </div>
              </center>
            </div>
          </>
        )}
        {isAvailableTrx && (
          <>
            <div
              className="card bg-black text-white child-card"
              style={{ padding: "0px 20px" }}
            >
              <div className="card-body"></div>
              <div className="input-groups d-grid gap-4 mt-5 card-order-history">
                <div className="d-flex justify-content-between">
                  <h4 className="text-warning fw-bold">{trxType}</h4>
                  <Link to={"/transaction/waiting"}>
                    <i className="fa-regular fa-circle-question text-gray mt-2 fs-5"></i>
                  </Link>
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
                <h1 className="text-white fw-bold"></h1>
              </div>
            </div>
            <label className="text-gray mt-5" htmlFor="">
              <i className="fa-solid fa-exclamation text-gray"></i> Your
              membership is being on for a lifetime..
            </label>
          </>
        )}
      </div>
    </>
  );
};
