/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import logo from "../../../public/img/logo.png";
import axios from "axios";
import { fetchTrxData, fetchUserData, serverURL } from "@utils/anime";
import useSWR from "swr";

export const Invoice = () => {
  const [isConfirm, setIsConfirm] = useState(false);
  const { data: trxDAT } = useSWR("fetchTrxDAT", () => fetchTrxData());
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData());
  console.log(userData);
  const trxID = trxDAT?.[0]?.id;
  const { data: trxList } = useSWR(
    trxID ? [`${serverURL}/api/trans/${trxID}`] : null,
    (url: any) =>
      axios.get(`${url}`, { withCredentials: true }).then((res) => res.data),
    {
      revalidateOnFocus: true,
    }
  );

  const trxDetail = trxList;
  const trxStatus = trxList?.status;
  console.log(trxStatus);

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
                <span className="fw-bold">{trxDetail?.membership_level}</span>
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
                <span>{trxDetail?.amount?.toLocaleString("ID-id")}</span>
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
    </>
  );
};
