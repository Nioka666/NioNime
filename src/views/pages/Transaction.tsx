/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchAllUserData,
  fetchUserData,
  fetchUserMembershipData,
  serverURL,
} from "@utils/anime";
import useSWR from "swr";
import gopayLogo from "../../../public/img/Gopay.svg";
import danaLogo from "../../../public/img/Dana.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loading } from "@views/components/Loading";

export const Transaction = () => {
  const navigate = useNavigate();
  const { data: userData } = useSWR("fetchUserData", () => fetchAllUserData());
  const { data: currentUserData } = useSWR("fetchUserData", () =>
    fetchUserData()
  );
  const { data: membershipData } = useSWR("fetchMembershipData", () =>
    fetchUserMembershipData()
  );
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [activePayment, setActivePayment] = useState<string | null>(null);
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (userData) {
      setUserID(userData.id || "");
      setUsername(userData.username || "");
      setUserEmail(userData.email || "");
    }
  }, [userData]);

  const currentUserID: string = currentUserData?.id;
  const { data: currentTrx } = useSWR(
    currentUserID ? ["currentTrx", currentUserID] : null,
    () =>
      axios
        .post(
          `${serverURL}/api/user-transaction-find`,
          { currentUserID },
          { withCredentials: true }
        )
        .then((response) => response.data)
  );

  if (currentTrx) {
    navigate("/transaction/waiting");
  }

  const handlePaymentClick = (method: string) => {
    setActivePayment((prevMethod: string | null) =>
      prevMethod === method ? null : method
    );

    setSelectedPayment((prevMethod: any) =>
      prevMethod === method ? null : method
    );
  };

  const membershipLevel = membershipData?.[1]?.level;
  const membershipPriceLocale =
    membershipData?.[1]?.prices.toLocaleString("id-ID");

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <center>
        <h2 style={{ marginTop: "100px" }}>Last Step to Purchasing</h2>
      </center>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="container d-grid gap-3"
          style={{ marginTop: "50px", width: "160%" }}
        >
          <section>
            <div
              className="selected-option d-grid"
              style={{
                backgroundColor: "#292929",
                width: "100%",
                height: "80px",
                borderRadius: "10px",
              }}
            >
              <div
                className="detail-option d-flex"
                style={{ width: "100%", gap: "330px" }}
              >
                <h5
                  className="text-lights fw-medium"
                  style={{ margin: "auto 30px" }}
                >
                  {membershipLevel}
                </h5>
                <h5
                  className="text-lights fw-medium"
                  style={{ margin: "auto 30px" }}
                >
                  IDR {membershipPriceLocale}
                </h5>
              </div>
            </div>
          </section>
          <section>
            <div
              className="selected-option d-inline-block"
              style={{
                backgroundColor: "#292929",
                width: "100%",
                height: "700px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <h3
                className="text-lights fw-medium"
                style={{ margin: "30px 30px" }}
              >
                <i className="fa-regular fa-circle-question text-gray me-2"></i>{" "}
                Your Information
              </h3>
              <center></center>
              <br />
              <form action="" method="POST" className="trx-form">
                <label htmlFor="userID" className="form-label">
                  User ID
                </label>
                <input
                  type="text"
                  name="userID"
                  className="form-control text-white"
                  id="userID"
                  placeholder="name@example.com"
                  defaultValue={userID}
                  style={{ width: "75%" }}
                  disabled
                />
                <br />
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control text-white"
                  id="username"
                  placeholder="name@example.com"
                  defaultValue={username}
                  style={{ width: "99%" }}
                />
                <br />
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control text-white"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  defaultValue={userEmail}
                  style={{ width: "99%" }}
                />
                <br />
                <br />
                <p
                  style={{
                    fontWeight: "lighter",
                    color: "lightgray",
                    fontSize: "14px",
                  }}
                >
                  Your subscription starts immediately and you will be charged
                  IDR 50.000 VAT inclusive for lifetime. You can cancel by
                  logging <br /> into your account at crunchyroll.com.
                </p>
                <br />
                <center>
                  <a href={`/transaction/process/${selectedPayment}`}>
                    <button
                      type="button"
                      className="w-75 btn btn-lg btn-warning fw-semibold btn-noblefan"
                      defaultValue={userID}
                      disabled={!selectedPayment}
                      // onClick={handleNextStep}
                    >
                      Go Next Step
                    </button>
                  </a>
                </center>
              </form>
            </div>
          </section>
        </div>
        <div className="container">
          <section style={{ marginRight: "10px" }}>
            <div
              className="selected-option"
              style={{
                marginTop: "-340px",
                backgroundColor: "#292929",
                width: "103%",
                height: "405px",
                borderRadius: "10px",
              }}
            >
              <div className="detail-option d-grid">
                <h4
                  className="text-lights fw-medium"
                  style={{ margin: "30px auto" }}
                >
                  <i className="fa-solid fa-credit-card me-1 mt-1"></i> Payment
                  Methods
                </h4>
                <div className="btn-grupp d-grid gap-3 mt-3">
                  <button
                    className={`payment-method ${
                      selectedPayment === "gopay" ? "selected" : ""
                    } ${activePayment === "gopay" ? "active" : ""}`}
                    onClick={() => handlePaymentClick("gopay")}
                  >
                    <img
                      src={gopayLogo}
                      alt="Gopay Logo"
                      height={90}
                      style={{ transform: "scale(1.8)" }}
                    />
                  </button>
                  <button
                    className={`payment-method ${
                      selectedPayment === "dana" ? "selected" : ""
                    } ${activePayment === "dana" ? "active" : ""}`}
                    onClick={() => handlePaymentClick("dana")}
                  >
                    <img
                      src={danaLogo}
                      alt="Gopay Logo"
                      height={90}
                      style={{ transform: "scale(0.52)" }}
                    />
                  </button>
                  <p className="text-gray text-center mt-2">
                    Just Select a One E-Wallet
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
