/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchUserMembershipData } from "@utils/anime";
import useSWR from "swr";
import { AddButtonSM } from "./components/AddButton";

export const Memberships = () => {
  const { data: trxData, error: errorTrxData } = useSWR(
    "fetchMembershipData",
    () => fetchUserMembershipData()
  );

  if (errorTrxData) {
    console.log(errorTrxData);
  }

  // const handleDeleteTrx = (trxID: any) => {
  //   console.log(trxID);
  // };

  // const handleEditTrx = (trxID: any) => {
  //   console.log(trxID);
  // };

  return (
    <div
      className="col-md-9"
      style={{
        padding: "100px 0px",
        margin: "0 -20px",
        width: "80%",
        cursor: "pointer",
      }}
    >
      <div className="card bg-black text-white h-satus user-card">
        <div className="card-header" style={{ padding: "50px 0px 0px 45px" }}>
          <h4 className="text-lighs">Memberships data</h4>
        </div>
        <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
          <div className="d-flex justify-content-between align-items-center">
            <h6
              className="card-title text-gray"
              style={{ paddingLeft: "20px" }}
            >
              Available Subscription Data of Memberships Options
            </h6>
            <AddButtonSM jumpTo="admin" />
          </div>
          {/* Membership */}
          <div className="card-wrapper d-flex gap-4 mt-5 ms-3 mb-5">
            {trxData?.map((trx: any) => (
              <div
                className="card text-white h-satus user-card"
                style={{
                  margin: "0",
                  border: "none",
                  padding: "20px 20px",
                  width: "300px",
                  backgroundColor: "#292a2b",
                }}
              >
                <div className="card-header border-0 d-flex justify-content-between">
                  <h4 className="text-lighs">{trx?.level.toUpperCase()} </h4>
                  <i className="fa-solid fa-pen-to-square mt-1 text-gray fs-4"></i>
                </div>
                <div className="card-body text-lights">
                  <h5>IDR {trx?.prices.toLocaleString("ID-id")}</h5>
                  <ul className="list-unstyled text-gray">
                    {trx?.features.map((feature: any) => (
                      <li>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
