/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { DragDropFiles } from "@views/components/DragDropFiles";
import gopayQR from "/src/img/gopay_qr.png";
import danaQR from "/src/img/dana_qr.png";
import { useParams } from "react-router-dom";
import { fetchUserData, serverURL } from "@utils/anime";
import useSWR from "swr";
import axios from "axios";

export const TrxProcess = () => {
  const { membershipSlug, method } = useParams();
  const [file, setFile] = useState(null);
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData());
  const { data: membershipFindBySlug } = useSWR("fetchMembershipBySlug", () =>
    axios
      .post(
        `${serverURL}/api/membership-find-slug`,
        { membershipSlug },
        { withCredentials: true }
      )
      .then((response) => response.data)
  );

  const membershipLevel = membershipFindBySlug?.level;
  const membershipPrice = membershipFindBySlug?.prices;
  const checkAndSetDateJump = () => {
    if (membershipLevel === "Noble Fans") {
      return 360;
    } else if (membershipLevel === "Ordinary Fans") {
      return 30;
    }
  };
  const isDateJump: any = checkAndSetDateJump();

  const getMethodLink = () => {
    if (method === "gopay") {
      return gopayQR;
    } else if (method === "dana") {
      return danaQR;
    }
  };
  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(`${serverURL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          console.log("File uploaded successfully");
          window.location.href = "/transaction/waiting";
        } else {
          console.error("File upload failed");
        }
      } catch (error) {
        console.error("Error during file upload", error);
      }
    } else {
      console.warn("No file selected");
    }
  };
  const handleSubmit = async () => {
    try {
      const currentDate = new Date();
      const expiredDate = new Date();
      expiredDate.setDate(currentDate.getDate() + isDateJump);
      const formattedDate = currentDate
        .toISOString()
        .slice(0, 10)
        .replace(/\s+/g, "_");
      const customFileName = `ss_evidence_${formattedDate}_${
        (file as unknown as { name?: string })?.name || ""
      }`;

      const response = await axios.post(
        `${serverURL}/api/transaction-add`,
        {
          userID: userData?.id,
          username: userData?.username,
          membershipLevel,
          membershipPrice,
          fileName: customFileName,
          membershipDateExpired: expiredDate,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        handleFileUpload();
      } else {
        console.error("Transaction failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container d-flex trx-proces-container">
        <section
          className="qr-code text-center"
          style={{ backgroundColor: "#292929", marginTop: "-10px" }}
        >
          <h2 style={{ marginBottom: "10px" }}>Scan QR Code : </h2>
          <h6 className="text-gray fw-light" style={{ fontSize: "13px" }}>
            please scan QR code bellow and after finish your payment, please put
            your transaction evidence
          </h6>
          {method === "dana" && (
            <img
              src={getMethodLink()}
              width={330}
              style={{ marginTop: "20px" }}
              alt="qr_method"
            />
          )}
          {method === "gopay" && (
            <img
              src={getMethodLink()}
              className="mt-3"
              width={350}
              alt="qr_method"
            />
          )}
        </section>
        <div className="div d-grid">
          <section className="file-upload d-grid evidence-file-sec text-gray">
            <div className="wrapp d-flex gap-4">
              <i
                className="fa-solid fa-image text-center text-gray"
                style={{ fontSize: "90px" }}
              ></i>
              <h4 className="text-gray mt-3">
                Upload evidence <br /> here
              </h4>
            </div>
            <br />
            <br />
            <DragDropFiles setFile={setFile} />
            <button
              type="button"
              className="w-75 btn btn-lg btn-light fw-semibold"
              style={{ margin: "75px auto", padding: "12px 10px", fontSize: "18px", borderRadius: "13px" }}
              onClick={handleSubmit}
              disabled={!file}
            >
              Submit Transaction
            </button>
          </section>
        </div>
      </div>
    </>
  );
};
