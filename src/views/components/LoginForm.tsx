/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginFailModal } from "./Modals";
import { LoadingButton } from "./Loading";
import { ChangeEvent } from 'react';
import { useAuth } from "./AuthContext";
import { Footer } from "@views/layouts/Footer";

const saveUserDataToLocal = (userData: any) => {
  const userDataString = JSON.stringify(userData);
  localStorage.setItem("userData", userDataString);
};

// https://secure.crunchyroll.com/freetrial/checkout

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [userData, setUserData] = useState(null);
  const { isLoggedIn, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  console.log(isLoggedIn)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/user", { withCredentials: true });

        if (response.data) {
          console.log("User data fetched successfully:", response.data);
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (isLoggedIn && !userData) {
      fetchData();
    }
  }, [isLoggedIn, userData]);

  // useEffect(() => {
  //   if (userData) {
  //     console.log("User data:", userData);
  //   }
  // }, [userData]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/account");
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoadingBtn(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(
        "http://localhost:3000/api/login",
        { email, password },
        { withCredentials: true }
      );
      console.log(response.data.message);

      setLoggedIn(true);
      const userData = response.data.userData;
      if (rememberMe) {
        saveUserDataToLocal(userData);
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(true);
    } finally {
      setLoadingBtn(false);
    }
  };

  const closeModal: React.MouseEventHandler<HTMLButtonElement> = () => {
    setLoginError(false);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <>
      <div className="container-login" style={{ gap: "80px" }}>
        <div className="login-form">
          <center>
            <img src="../../../public/img/logo.png" width={130} />
            <h5 className="text-gray" style={{ fontSize: "18px", marginTop: "18px" }}>Please Login heres</h5>
          </center>
          <form onSubmit={handleLogin}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter Email"
                      autoFocus
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="form-check text-start my-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="remember-me"
                        id="flexCheckDefault"
                        style={{ backgroundColor: "black" }}
                        checked={rememberMe}
                        onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button
                      type="submit"
                      className="btn-loginPage"
                      disabled={loadingBtn}
                    >
                      {loadingBtn ? <LoadingButton /> : "Sign in"}
                    </button>
                    <center>
                      <h6 className="mt-4 text-gray">Don't have an account?
                        <a className="text-lights" href="/auth/register">
                          <b> Sign up</b>
                        </a>
                      </h6>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <LoginFailModal showModal={loginError} closeModal={closeModal} />
        </div>
        <div className="login-banner">
          <figure style={{ position: "relative" }}>
            <img src="../../../public/img/blacks.jpg" alt="" style={{ borderRadius: "15px", height: "550px", width: "500px", filter: "brightness(50%)" }} />

            {/* Overlay untuk quote */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "#fff" }}>
              <blockquote style={{ fontSize: "30px", fontWeight: "bold", width: "400px" }}>
                "Start and Sign in"
                <br />
                <p className="text-gray fw-medium" style={{ fontSize: "19px" }}>
                  Lorem ipsum dolor sit amet consectet.
                  <br />
                  for exploring further
                </p>
              </blockquote>
            </div>
          </figure>
        </div>
      </div>
      <Footer />
    </>
  );
};
