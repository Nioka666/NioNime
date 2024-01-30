import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "./Loading";
import { Footer } from "@views/layouts/Footer";
import logo from "../../img/logo.png";
import coverLogin from "../../../public/img/blacks.jpg";
import { serverURL } from "@utils/anime";
import toast, { Toaster } from "react-hot-toast";

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      // navigate("/auth/login");
      // window.location.reload();
    }
  }, [isRegistered, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoadingBtn(true);

      const response = await axios.post(
        `${serverURL}/api/register`,
        { username, email, password },
        { withCredentials: true }
      );

      console.log(response?.status);

      if (response?.status === 200) {
        setRegistered(true);
        await toast.promise(
          new Promise((resolve) => {
            setTimeout(resolve, 2000);
          }),
          {
            loading: "Loading...",
            success: "Your Register is Successfully!",
            error: "Your Register is FAIL",
          }
        );

        navigate("/auth/login");
      } else {
        setRegistered(false);

        await toast.promise(
          new Promise((resolve) => {
            setTimeout(resolve, 2000);
          }),
          {
            loading: "Loading...",
            success: "Your Register is Successfully!",
            error: "Your Register is FAIL",
          }
        );

        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      setRegistered(true);
    } finally {
      setLoadingBtn(false);
    }
  };

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
      <div className="container-login" style={{ gap: "80px", marginLeft: "100px" }}>
        <div className="register-banner">
          <figure style={{ position: "relative" }}>
            <img
              src={coverLogin}
              alt=""
              style={{
                borderRadius: "15px",
                height: "550px",
                width: "500px",
                filter: "brightness(40%)",
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <blockquote
                style={{ fontSize: "32px", fontWeight: "bold", width: "400px" }}
              >
                "Start and Sign up"
                <br />
                <p
                  className="text-silver fw-medium mt-1"
                  style={{ fontSize: "18px" }}
                >
                  To be a Part of Us and Exploring Further
                  <br />
                  Please sign up first
                </p>
              </blockquote>
            </div>
          </figure>
        </div>
        <div className="login-form" style={{ paddingTop: "38px" }}>
          <center>
            <img src={logo} width={130} style={{ cursor: "pointer" }} />
            <h5
              className="text-gray"
              style={{ fontSize: "18px", marginTop: "18px" }}
            >
              Please fill for register your own
            </h5>
          </center>
          <form onSubmit={handleRegister}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      autoFocus
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </td>
                </tr>
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
                        style={{ backgroundColor: "black", border: "2px solid gray", cursor: "pointer" }}
                        // checked={rememberMe}
                        // onChange={handleCheckboxChange}
                      />
                      <label
                        className="form-check-label text-gray"
                        htmlFor="flexCheckDefault"
                        style={{ fontSize: "15px" }}
                      >
                        I agree the Terms and Conditions
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
                      {loadingBtn ? <LoadingButton /> : "SIGN UP"}
                    </button>
                    <center>
                      <h6 className="mt-4 text-gray">
                        Don't have an account?
                        <a className="text-lights" href="/auth/login">
                          <b> Sign in</b>
                        </a>
                      </h6>
                    </center>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};
