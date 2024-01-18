import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginFailModal } from "./Modals";
import { LoadingButton } from "./Loading";
import { Footer } from "@views/layouts/Footer";
import logo from '../../img/logo.png';
import coverLogin from '../../../public/img/blacks.jpg';

export const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone_number, setPhoneNumber] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isRegistered) {
      navigate("/auth/login");
      window.location.reload();
    }
  }, [isRegistered, navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoadingBtn(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(
        "http://localhost:3000/api/register",
        { username, email, password },
        { withCredentials: true }
      );
      console.log(response.data.message);

      setRegistered(true);
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

  return (
    <>
      <div className="container-login" style={{ gap: "80px" }}>
        <div className="register-banner">
          <figure style={{ position: "relative" }}>
            <img src={coverLogin} alt="" style={{ borderRadius: "15px", height: "550px", width: "500px", filter: "brightness(50%)" }} />

            {/* Overlay untuk quote */}
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "#fff" }}>
              <blockquote style={{ fontSize: "30px", fontWeight: "bold", width: "400px" }}>
                "Start and Sign up"
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
        <div className="login-form" style={{ paddingTop: "38px" }}>
          <center>
            <img src={logo} width={130} style={{ cursor: "pointer" }} />
            <h5 className="text-gray" style={{ fontSize: "18px", marginTop: "18px" }}>Please fill for register </h5>
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
                      <h6 className="mt-4 text-gray">Don't have an account?
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

          <LoginFailModal showModal={loginError} closeModal={closeModal} />
        </div>
      </div>
      <Footer />
    </>
  );
};
