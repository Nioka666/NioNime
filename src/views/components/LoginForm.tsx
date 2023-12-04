import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginFailModal } from "./Modals";
import { LoadingButton } from "./Loading";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
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
        { username, password },
        { withCredentials: true }
      );
      console.log(response.data.message);

      setLoggedIn(true);
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
      <center>
        <br />
        <br />
        <img src="../../../public/img/logo.png" width={130} />
      </center>
      <div className="container-login">
        <div className="login-form">
          <h1>Please Sign in</h1>
          <form onSubmit={handleLogin}>
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
                      {loadingBtn ? <LoadingButton /> : "SIGN IN"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <LoginFailModal showModal={loginError} closeModal={closeModal} />
        </div>
      </div>
    </>
  );
};
