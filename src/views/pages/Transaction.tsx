/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchAllUserData, fetchUserMembershipData } from "@utils/anime";
import useSWR from "swr";
import gopayLogo from "../../../public/img/Gopay.svg";
import seaBankLogo from "../../../public/img/SeaBank.svg";
import { Link } from "react-router-dom";

export const Transaction = () => {
  const { data: userData } = useSWR("fetchUserData", () => fetchAllUserData());
  const { data: membershipData } = useSWR("fetchMembershipData", () =>
    fetchUserMembershipData()
  );

  const userID: any = userData?.id;
  const userNick: any = userData?.username;
  const userEmail: any = userData?.email;

  const membershipLevel = membershipData?.[1]?.level;
  const membershipPrice = membershipData?.[1]?.prices.toLocaleString("id-ID");

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
          style={{ marginTop: "50px", width: "75%" }}
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
              <div className="detail-option d-flex" style={{ gap: "380px" }}>
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
                  IDR {membershipPrice}
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
                height: "680px",
                borderRadius: "10px",
              }}
            >
              <h3
                className="text-lights fw-medium"
                style={{ margin: "30px 30px" }}
              >
                Your Information
              </h3>
              <center></center>
              <br />
              <form action="" method="POST" className="trx-form">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  User ID
                </label>
                <input
                  type="email"
                  className="form-control text-white"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={userID}
                  style={{ width: "75%" }}
                />
                <br />
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Username
                </label>
                <input
                  type="email"
                  className="form-control text-white"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                  value={userNick}
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
                  value={userEmail}
                  style={{ width: "99%" }}
                />
                <br />
                <p
                  style={{
                    fontWeight: "lighter",
                    color: "lightgray",
                    fontSize: "14px",
                  }}
                >
                  Your subscription starts immediately and you will be charged
                  IDR39,000 VAT inclusive every 30 days until cancellation. You
                  can cancel by logging into your account at crunchyroll.com.
                </p>
                <br />
                <center>
                  <Link to={'/transaction/processing'}>
                    <button
                      type="button"
                      className="w-75 btn btn-lg rounded-0 btn-warning fw-semibold btn-noblefan"
                      value={userID}
                    >
                      Go Next Step
                    </button>
                  </Link>
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
                marginTop: "-325px",
                backgroundColor: "#292929",
                width: "100%",
                height: "400px",
                borderRadius: "10px",
              }}
            >
              <div className="detail-option d-grid">
                <h4
                  className="text-lights fw-medium"
                  style={{ margin: "30px auto" }}
                >
                  Payment Methods
                </h4>
                <div className="btn-grupp d-grid gap-4">
                  <button className="payment-method">
                    <img
                      src={gopayLogo}
                      alt="Gopay Logo"
                      height={90}
                      style={{ transform: "scale(1.6)" }}
                    />
                  </button>
                  <button className="payment-method">
                    <img
                      src={seaBankLogo}
                      alt="Gopay Logo"
                      height={90}
                      style={{ transform: "scale(0.52)" }}
                    />
                  </button>
                  <p className="text-gray text-center">
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
