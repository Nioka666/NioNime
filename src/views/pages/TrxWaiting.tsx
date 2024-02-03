/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import useSWR from "swr";
import { useState, useEffect } from "react";
import { fetchUserData, serverURL } from "@utils/anime";
import axios from "axios";
import logo from "../../../public/img/logo.png";
import "../../style/print.css";
import { Loading } from "@views/components/Loading";
import ProgressLoad from "@views/components/ProgressLoad";
import { calculateExpiredDate, formatingDate } from "@utils/utility";
import blobPattern from "../../../public/img/pattern.svg";

export const TrxWaiting = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData());
  const userID = userData?.id;
  const { data: trxDAT, isValidating: trxDATLoading } = useSWR(
    "fetchTrxDAT",
    () =>
      axios
        .post(
          `${serverURL}/api/transaction-latest`,
          { userID },
          { withCredentials: true }
        )
        .then((response) => response.data),
    { revalidateOnFocus: false }
  );
  const trxID = trxDAT?._id;
  console.log(trxID);

  const trxDetail = trxDAT;
  const trxStatus = trxDAT?.status;

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProgressLoad />;
  }

  return (
    <>
      {trxDATLoading && <Loading />}
      {!isConfirm && !trxDATLoading && (
        <center>
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
        </center>
      )}
      {isConfirm && !trxDATLoading && (
        <>
          <div
            className="nota d-flex"
            style={{ padding: "0 70px", marginTop: "-50px" }}
          >
            <section className="nota-section" style={{ width: "45%" }}>
              <div
                className="container text-lights"
                style={{ marginTop: "300px" }}
              >
                <div className="nota-typograph">
                  <h1 className="fw-bold">Your Invoice here!</h1>
                  <img
                    src={blobPattern}
                    width={600}
                    style={{
                      zIndex: "-999",
                      position: "absolute",
                      marginTop: "-200px",
                      marginLeft: "-290px",
                    }}
                  />
                  <h6 className="text-gray">
                    Lorem ipsum dolor sit amet, <br /> consectetur adipisicing
                    elit. Libero harum evenierspiciatis corporis maiores aliquid
                    quas eum.
                  </h6>
                  <br />
                  <h6 className="text-gray">
                    Lorem ipsum dolor sit amet, <br /> consectetur
                  </h6>
                </div>
                <div className="btn-groupp d-flex">
                  <button
                    className="btn btn-outline fw-semibold mt-4 text-lights"
                    onClick={handlePrint}
                    style={{
                      padding: "12px 25px",
                      border: "2px solid gray",
                      borderRadius: "12px",
                      transition: "all ease-in-out 0.2s",
                    }}
                  >
                    <i className="fa-solid fa-floppy-disk fs-5"></i>
                    Save Invoice
                  </button>
                </div>
              </div>
            </section>
            <section
              style={{
                width: "60%",
                display: "grid",
                backgroundSize: "cover",
                padding: "100px 20px 100px 20px",
                borderRadius: "25px",
              }}
            >
              <div
                className="container printable text-lights"
                style={{
                  marginTop: "100px",
                  backgroundColor: "#1f1f1fe7",
                  backgroundSize: "cover",
                  padding: "100px 20px 100px 0px",
                  borderRadius: "25px",
                  border: "4.2px solid #323232",
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
                            marginBottom: "25px",
                          }}
                        >
                          <img src={logo} width={130} />
                          <h6 className="text-gray mt-3">
                            (Membershihps Invoice)
                          </h6>
                          <h6 className="text-gray">
                            This Invoice is never be able to recharge your
                            subscriptions
                          </h6>
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
                        <span>
                          {trxDetail?.amount?.toLocaleString("ID-id")}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="id">Date:</label>
                      </td>
                      <td>
                        <span>
                          {formatingDate(trxDetail?.date_transaction)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label htmlFor="id">Date Expired:</label>
                      </td>
                      <td>
                        <span>
                          {calculateExpiredDate(trxDetail?.date_transaction)}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};
