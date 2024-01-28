/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchTransList, serverURL } from "@utils/anime";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { AddButtonSM } from "./components/AddButton";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const TransactionsDetail = () => {
  const navigate = useNavigate();
  const { data: trxData, error: errorTrxData } = useSWR("fetchTrxData", () =>
    fetchTransList()
  );

  if (errorTrxData) {
    console.log(errorTrxData);
  }

  const handleEditTrx = async (trxID: any) => {
    navigate(`/admin/transaction-edit/${trxID}`);
  };

  let no_asc = 1;

  const handleDeleteTrx = async (trxID: any) => {
    try {
      const isDeleted = await axios.post(
        `${serverURL}/api/transaction-delete`,
        { trxID },
        { withCredentials: true }
      );
      if (isDeleted.status === 200) {
        console.log(`success deleted trx with id: ${trxID}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="col-md-10"
      style={{
        padding: "90px 0px 50px 0",
        margin: "0 0px",
        width: "102%",
        marginRight: "-200px",
        height: "auto",
      }}
    >
      <div className="card bg-black text-white h-satus user-card">
        <div className="card-header" style={{ padding: "50px 30px 0px 45px" }}>
          <h4 className="text-lighs">Transactions data</h4>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-title text-gray">
              Special title treatmentless our commits
            </h6>
            <AddButtonSM jumpTo="/admin/transactions/add" />
          </div>
        </div>
        <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
          <hr />
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <table
              className="table table-dark bg-black table-borderless table-hover mt-3"
              style={{ whiteSpace: "nowrap" }}
            >
              <thead className="p-2">
                <tr>
                  <td>No</td>
                  <td>Username</td>
                  <td>Membership Level</td>
                  <td>Amount</td>
                  <td>Status</td>
                  <td>Date Transaction</td>
                  <td>Actions</td>
                </tr>
              </thead>
              <tbody className="p-4">
                {trxData?.map((trx: any) => (
                  <tr key={trx._id}>
                    <td>{no_asc++}</td>
                    <td>{trx?.username}</td>
                    <td>{trx?.membership_level}</td>
                    <td>{trx?.amount}</td>
                    <td>{trx?.status}</td>
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
    </div>
  );
};
