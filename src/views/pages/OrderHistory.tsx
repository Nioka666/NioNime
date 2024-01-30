/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchTrxData, fetchTrxDetail } from "@utils/anime";
import useSWR from "swr";

export const OrderHistory = () => {
  const { data: trxData } = useSWR("fetchTrxData", () => fetchTrxData());
  const trxID = trxData?.[0]?.id;
  const { data: trxDetail } = useSWR("fetchTrxData", () =>
    fetchTrxDetail(trxID)
  );

  const trxDataID: string = trxDetail?.[0]?.id;
  const trxUserID: string = trxDetail?.[0]?.users_id;
  const trxDate = trxDetail?.[0]?.date_transaction;

  return (
    <>
      <div className="card bg-black text-white accountMenu">
        <h3>Order History</h3>
        <h6 className="text-gray mt-1">Your Membership Information</h6>
        <div
          className="input-groups d-grid gap-4 mt-5"
          style={{ textAlign: "left" }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <div className="gap-4">
              <h6>Transaction ID : </h6>
              <h6 className="text-gray">{trxDataID}</h6>
            </div>
            <div className="gap-4">
              <h6>User ID :</h6>
              <h6 className="text-gray">{trxUserID}</h6>
            </div>
            <div className="gap-4">
              <h6>Date Transaction</h6>
              <h6 className="text-gray">{trxDate}</h6>
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
          <label className="" htmlFor="">
            <i className="fa-solid fa-exclamation"></i> Your membership is being
            on for a lifetime..
          </label>
        </div>
      </div>
    </>
  );
};
