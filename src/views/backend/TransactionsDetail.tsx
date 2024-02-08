/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchTransList, serverURL } from "@utils/anime";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { AlertConfirmDialog } from "@views/components/Modals";
import { useReactToPrint } from "react-to-print";

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
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [trxIdDeleted, setTrxIdDeleted] = useState("");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: any = trxData?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages: any = Math.ceil(trxData?.length / itemsPerPage);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  console.log(currentItems);

  const handleDelete = async (trxID: any) => {
    setDialogOpen(true);
    setTrxIdDeleted(trxID);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleDeleteConfirm = async (isConfirmed: any) => {
    const trxID = trxIdDeleted;
    if (isConfirmed) {
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
    } else {
      console.log("not ok");
    }
  };

  const componentRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.focus();
    }
  }, [componentRef]);

  const pageStyle = `{ size: 2.5in 4in }`;
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "NioNime Invoice",
    onAfterPrint: () => console.log("Printed PDF successfully!"),
    pageStyle: pageStyle,
  });

  return (
    <>
      <AlertConfirmDialog
        openDialog={isDialogOpen}
        handleCloseDialog={handleCloseDialog}
        handleConfirm={handleDeleteConfirm}
        headerMessageConfirmDialog={"Confirm for deleting this data?"}
        messageConfirmDialog={
          "By Confirm deleting this data, you can't reable this data again"
        }
      />
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
              duration: 3000,
            },
          }}
        />
        <div className="card bg-black text-white h-satus user-card">
          <div
            className="card-header"
            style={{ padding: "50px 30px 0px 45px" }}
          >
            <h4 className="text-lighs">Transactions data</h4>
            <div className="d-flex justify-content-between align-items-center mt-0">
              <h6 className="card-title text-gray">
                Special title treatmentless our commits
              </h6>
              <button
                className="btn btn-outline fw-semibold mt-4 text-lights"
                onClick={handlePrint}
                style={{
                  position: "relative",
                  top: "-50px",
                  padding: "12px 25px",
                  border: "2px solid gray",
                  borderRadius: "12px",
                  transition: "all ease-in-out 0.2s",
                }}
              >
                <i className="fa-solid fa-floppy-disk fs-5 me-2"></i>
                Save Invoice
              </button>
              {/* <AddButtonSM jumpTo="/admin/transactions/add" /> */}
            </div>
          </div>
          <div className="card-body" style={{ padding: "0 25px 25px 25px" }}>
            <hr />
            <div
              className="datamaster-table"
              style={{ maxWidth: "100%", overflowX: "auto" }}
              ref={componentRef}
            >
              <table
                className="table table-dark bg-black table-borderless table-hover mt-2"
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
                          onClick={() => handleDelete(trx?._id)}
                        >
                          <i className="fa-solid fa-trash text-danger"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
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
    </>
  );
};
