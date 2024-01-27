/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from "swr";
import { useState, useEffect } from "react";
import { fetchTrxData, fetchUserData } from "@utils/anime";
import axios from "axios";
import logo from "../../../public/img/logo.png";
import "../../style/print.css";

export const TrxWaiting = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const { data: trxDAT } = useSWR("fetchTrxDAT", () => fetchTrxData());
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData());
  console.log(userData);
  const trxID = trxDAT?.[0]?.id;
  const { data: trxList } = useSWR(
    trxID ? [`http://localhost:3000/api/trans/${trxID}`] : null,
    (url: any) =>
      axios.get(`${url}`, { withCredentials: true }).then((res) => res.data),
    {
      revalidateOnFocus: true,
    }
  );

  const trxDetail = trxList;
  const trxStatus = trxList?.status;

  useEffect(() => {
    if (trxStatus === "Success") {
      setIsConfirm(true);
    } else {
      setIsConfirm(false);
    }
  }, [trxStatus]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <center>
        {!isConfirm && (
          <div
            className="container printable d-grid"
            style={{ marginTop: "200px" }}
          >
            <i
              className="fa-regular fa-hourglass-half text-gray"
              style={{ fontSize: "140px", transform: "rotate(10deg)" }}
            ></i>
            <h4 className="mt-5 text-gray">
              Please wait until admin confirms <br /> your subscription.
            </h4>
          </div>
        )}
        {isConfirm && (
          <div
            className="container printable"
            style={{
              marginTop: "100px",
              width: "43%",
              backgroundImage: "url(../../public/img/inv.jpg)",
              backgroundSize: "cover",
              padding: "100px 0px",
              borderRadius: "20px",
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <div
                      className="heads"
                      style={{
                        display: "grid",
                        gap: "4px",
                        marginBottom: "20px",
                      }}
                    >
                      <img src={logo} width={130} />
                      <h6 className="text-gray mt-3">(Membershihps Invoice)</h6>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="id">Transaction ID:</label>
                  </td>
                  <td>
                    <span>{trxDetail?._id}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="id">Username:</label>
                  </td>
                  <td>
                    <span>{trxDetail?.username}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="id">Membership Purchased:</label>
                  </td>
                  <td>
                    <span className="fw-bold">
                      {trxDetail?.membership_level}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="id">Transaction Status:</label>
                  </td>
                  <td>
                    <span>{trxDetail?.status}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="id">Amount:</label>
                  </td>
                  <td>
                    <span>{trxDetail?.amount.toLocaleString("ID-id")}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="id">Date:</label>
                  </td>
                  <td>
                    <span>{trxDetail?.date_transaction}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Print button */}
        {isConfirm && (
          <button
            className="btn btn-lg btn-light fw-semibold w-25"
            onClick={handlePrint}
            style={{ marginTop: "30px" }}
          >
            Print Invoice
          </button>
        )}
      </center>
    </>
  );
};
