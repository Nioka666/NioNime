/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  fetchUserData,
  fetchUserMembershipData,
  serverURL,
} from "@utils/anime";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";

const PricingHeader = () => {
  return (
    <>
      <header>
        <div className="pricing-header p-3 pb-md-4 mx-auto text-center text-white">
          <h1 className="display-5 fw-normal text-white fw-bold">
            Membership Plans
          </h1>
          <p className="fs-5 text-gray mt-4" style={{ padding: "0 100px" }}>
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It’s built with default
            Bootstrap components and utilities with little customization.
          </p>
        </div>
      </header>
    </>
  );
};

export const Pricing = () => {
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData());
  const userID = userData?.id;
  const currentUserID = userData?.id;
  const { data: userDetail } = useSWR(
    userID ? ["userDetails", userID] : null,
    () =>
      axios
        .post(
          `${serverURL}/api/user-details`,
          { userID },
          { withCredentials: true }
        )
        .then((response) => response.data)
  );

  const [isNobleFan, setNobleFan] = useState(false);
  const { data: membershipList, error: errorMembershipList } = useSWR(
    "fetchMembershipList",
    () => fetchUserMembershipData(),
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    setNobleFan(userDetail?.membership_level === "Noble Fans");
  }, [userDetail]);

  if (errorMembershipList) {
    console.log(errorMembershipList);
  }

  const isLoggedIn = (() => {
    if (userData) {
      return true;
    } else {
      return false;
    }
  })();

  // console.log(window.location.pathname);
  console.log(isLoggedIn);

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

  const checkAvailableTrx = (() => {
    if (currentTrx) {
      return true;
    } else {
      return false;
    }
  })();

  const isAvailableTrx = checkAvailableTrx;

  return (
    <>
      <div className="container mt-5">
        <PricingHeader />
        <main>
          <div
            className="row row-cols-1 row-cols-md-3 d-flex mb-3 text-center mt-4"
            style={{ justifyContent: "center", gap: "10px" }}
          >
            <div className="col fan-col">
              <div className="card mb-4 rounded-0 shadow-sm bg-gray-blue text-white h-90">
                <div className="card-body p-5">
                  <h2 className="my-0 fw-bold">{membershipList?.[0].level}</h2>
                  <br />
                  <h1 className="card-title pricing-card-title">
                    IDR {membershipList?.[0].prices.toLocaleString("id-ID")}
                    <small className="text-gray fw-light">/mo</small>
                  </h1>
                  <hr />
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>{membershipList?.[0].features[1]}</li>
                    <li>{membershipList?.[0].features[2]}</li>
                    <li>{membershipList?.[0].features[3]}</li>
                  </ul>
                  {isLoggedIn && (
                    <button
                      type="button"
                      className="w-100 btn btn-lg btn-outline-warning rounded-0 fw-medium border-2 btn-fan"
                      disabled
                    >
                      You're Registered
                    </button>
                  )}
                  {!isLoggedIn && (
                    <Link to={"/auth/register"}>
                      <button
                        type="button"
                        className="w-100 btn btn-lg btn-outline-warning rounded-0 fw-medium border-2 btn-fan"
                      >
                        Start be a Fans !
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="col fan-col">
              <h1
                className="text-yellow"
                style={{
                  position: "relative",
                  transform: "rotate(28deg)",
                  left: "170px",
                  top: "32px",
                  zIndex: "2",
                  fontSize: "50px",
                }}
              >
                <i className="fa-solid fa-crown"></i>
              </h1>
              <div className="card mb-4 rounded-0 shadow-sm bg-gray-blue text-white h-90">
                <div className="card-body p-5">
                  <h2 className="fw-bold">{membershipList?.[1].level}</h2>
                  <br />
                  <h1 className="card-title pricing-card-title">
                    IDR {membershipList?.[1].prices.toLocaleString("id-ID")}
                    <small className="text-gray fw-light">
                      / <br /> lifetime
                    </small>
                  </h1>
                  <hr />
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>{membershipList?.[1].features[1]}</li>
                    <li className="">{membershipList?.[1].features[3]}</li>
                    <li className="text-yellow">
                      {membershipList?.[1].features[2]}
                    </li>
                    <li className="text-yellow">
                      {membershipList?.[1].features[4]}
                    </li>
                    <li className="text-yellow">
                      {membershipList?.[1].features[5]}
                    </li>
                  </ul>
                  {isNobleFan && (
                    <button
                      type="button"
                      className="w-100 btn btn-lg rounded-0 btn-warning fw-semibold btn-noblefan"
                      value={membershipList?.[1].level}
                      disabled
                    >
                      Purchased
                      <i className="fa-solid text-success fa-check ms-2"></i>
                    </button>
                  )}
                  {!isNobleFan && !isAvailableTrx && isLoggedIn && (
                    <a href={`/transaction/`}>
                      <button
                        type="button"
                        className="w-100 btn btn-lg rounded-0 btn-warning fw-semibold btn-noblefan"
                        value={membershipList?.[1].level}
                      >
                        Purchase
                      </button>
                    </a>
                  )}
                  {!isLoggedIn && (
                    <a href={`/auth/login`}>
                      <button
                        type="button"
                        className="w-100 btn btn-lg rounded-0 btn-warning fw-semibold btn-noblefan"
                        value={membershipList?.[1].level}
                      >
                        Purchase
                      </button>
                    </a>
                  )}
                  {isAvailableTrx && (
                    <a href={`/transaction/waiting`}>
                      <button
                        type="button"
                        className="w-100 btn btn-lg rounded-0 btn-warning fw-semibold btn-noblefan"
                        value={membershipList?.[1].level}
                      >
                        Purchase
                      </button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
