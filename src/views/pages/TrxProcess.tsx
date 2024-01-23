/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { DragDropFiles } from "@views/components/DragDropFiles";
import gopayQR from "../../../public/img/gopay_qr.png";
import danaQR from "../../../public/img/dana_qr.png";
import { useParams } from "react-router-dom";

export const TrxProcess = () => {
  const { method } = useParams();
  const [file, setFile] = useState(null);
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
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("File uploaded successfully");
          window.location.reload();
        } else {
          console.error("File upload failed");
        }
        return response.ok;
      } catch (error) {
        console.error("Error during file upload", error);
      }
    } else {
      console.warn("No file selected");
    }
  };

  const handleSubmit = () => {
    handleFileUpload();
  };

  return (
    <>
      <div
        className="container d-flex"
        style={{
          marginTop: "100px",
          gap: "50px",
          justifyContent: "center",
          alignItems: "center",
          width: "77%",
          backgroundColor: "#292929",
          padding: "50px 40px",
          borderRadius: "15px",
        }}
      >
        <section
          className="qr-code text-center"
          style={{ backgroundColor: "#292929", marginTop: "-10px" }}
        >
          <h2 style={{ marginBottom: "10px" }}>Scan QR Code : </h2>
          <img src={getMethodLink()} width={330} alt="qr_method" />
        </section>
        <div className="div d-grid">
          <section
            className="file-upload d-grid"
            style={{
              marginTop: "85px",
              border: "2px dashed gray",
              paddingTop: "40px",
              paddingBottom: "40px",
              padding: "50px",
              borderStyle: "dashed",
              borderRadius: "10px",
            }}
          >
            <div className="wrapp d-flex gap-4">
              <i
                className="fa-solid fa-image text-center text-gray"
                style={{ fontSize: "100px" }}
              ></i>
              <h3 className="text-gray mt-3">
                Upload evidence <br /> here
              </h3>
            </div>
            <br />
            <br />
            <DragDropFiles setFile={setFile} />
          </section>
          <button
            type="button"
            className="w-75 btn btn-lg btn-light fw-semibold"
            style={{ margin: "30px 0 0 115px", padding: "9px 10px" }}
            onClick={handleSubmit}
          >
            Submit Transaction
          </button>
        </div>
      </div>
    </>
  );
};
