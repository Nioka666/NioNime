/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import { Footer } from "@views/layouts/Footer";
import logo from "/src/img/logo.png";
import coverLogin from "/src/img/dark_war.jpg";
import ErrorToast from "@views/components/Toast";
import { LoadingButton } from "@views/components/Loading";
import { serverURL } from "@utils/anime";
import toast, { Toaster } from "react-hot-toast";
import useSWR from "swr";

// https://secure.crunchyroll.com/freetrial/checkout
export const AdminLoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState<string | boolean>("");
  const { data: currentAdmin } = useSWR("fetchCurrentAdmin", () =>
    axios
      .get(`${serverURL}/api/admin-data`, { withCredentials: true })
      .then((response) => response.data)
  );

  useEffect(() => {
    if (currentAdmin) {
      setLoggedIn(true);
      navigate("/admin/dashboard");
    } else {
      setLoggedIn(false);
    }
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoadingBtn(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(
        `${serverURL}/api/auth/admin-sign-in`,
        { email, password },
        { withCredentials: true }
      );

      if (response?.status === 200) {
        setLoggedIn(true);
        setLoginError("");
        await toast.promise(
          new Promise((resolve) => {
            setTimeout(resolve, 2000);
          }),
          {
            loading: "Loading . .",
            success: "Sign in successfully !",
            error: "Sign in error, please try again",
          }
        );
        navigate("/admin/dashboard");
        window.location.reload();
      }
    } catch (error) {
      setLoggedIn(false);
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setLoadingBtn(false);
    }
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  console.log(isLoggedIn);

  return (
    <>
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
            duration: 2500,
          },
          error: {
            duration: 2500,
          },
        }}
      />
      <div
        className="container-login d-grid"
        style={{ gap: "80px", width: "75%", backgroundSize: "cover" }}
      >
        <div className="login-banner">
          <figure style={{ position: "relative" }}>
            <img
              src={coverLogin}
              alt=""
              style={{
                borderRadius: "15px",
                height: "250px",
                width: "100%",
                filter: "brightness(50%)",
              }}
            />
          </figure>
        </div>
        <div
          className="login-form"
          style={{ marginTop: "-300px", backdropFilter: "none", zIndex: "666" }}
        >
          <center>
            <img src={logo} width={130} />
            <h5
              className="text-gray"
              style={{
                fontSize: "18px",
                marginTop: "20px",
                lineHeight: "30px",
              }}
            >
              Please Login here's, if yours a admin <br /> for NioNime sites
            </h5>
            <form onSubmit={handleLogin} style={{ marginTop: "50px" }}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="email"
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
                          style={{
                            backgroundColor: "black",
                            cursor: "pointer",
                            border: "2px solid gray",
                          }}
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
                        <h6 className="mt-4 text-gray">
                          You not an Admin?
                          <a className="text-lights" href="/auth/login">
                            <b> Sign in Users</b>
                          </a>
                        </h6>
                      </center>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </center>
          <ErrorToast errorMessage={loginError} />
        </div>
      </div>
      <Footer />
    </>
  );
};
