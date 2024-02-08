/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR from "swr";
import { LoginForm } from "../components/LoginForm";
import axios from "axios";
import { serverURL } from "@utils/anime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { data: currentUser } = useSWR(
    "fetchCurrentUser",
    () =>
      axios
        .get(`${serverURL}/api/user`, { withCredentials: true })
        .then((response) => response.data),
    { revalidateOnFocus: false }
  );

  console.log(isLoggedIn);

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
      navigate("/account/user-info");
      window.location.reload();
    }
  }, [currentUser, navigate]);

  return (
    <>
      <LoginForm />
    </>
  );
};
