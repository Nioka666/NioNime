import { fetchUserMembershipData } from "@utils/anime";
import useSWR from "swr";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const Memberships = () => {
  const { data: trxData, error: errorTrxData } = useSWR(
    "fetchMembershipData",
    () => fetchUserMembershipData()
  );

  if (errorTrxData) {
    console.log(errorTrxData);
  }

  const handleDeleteTrx = (trxID: any) => {
    console.log(trxID);
  };

  const handleEditTrx = (trxID: any) => {
    console.log(trxID);
  };

  return (
    <div
      className="col-md-9"
      style={{ padding: "100px 0px", margin: "0 -20px", width: "80%" }}
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
              Special title treatmentless our commits
            </h6>
            <a
              href="#"
              className="btn fw-medium"
              style={{
                margin: "-20px 10px 0 0",
                backgroundColor: "#d1b200",
                borderRadius: "16px",
              }}
            >
              <i className="fa-solid fa-plus me-2"></i>Add new
            </a>
          </div>
          <hr />
          <table
            className="table table-dark bg-black table-borderless table-hover mt-3"
            style={{ marginRight: "200px" }}
          >
            <thead className="p-2">
              <tr>
                <td>No</td>
                <td>Membership Level</td>
                <td>Price</td>
                <td>Features</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody className="p-4">
              {trxData?.map((trx: any) => (
                <tr key={trx._id}>
                  <td>1</td>
                  <td>{trx?.level}</td>
                  <td>{trx?.prices}</td>
                  <td>{trx?.features.join(", ")}</td>
                  <td>{trx?.date_transaction}</td>
                  <td className="d-flex gap-3">
                    <button
                      className="button-action"
                      onClick={() => handleEditTrx(trx?._id)}
                    >
                      <i className="fa-solid fa-pen text-warning"></i>
                    </button>

                    <button
                      className="button-action"
                      onClick={() => handleDeleteTrx(trx?._id)}
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