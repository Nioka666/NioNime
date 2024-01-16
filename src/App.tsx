/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "@pages/About";
import { ErrorPage } from "@pages/ErrorPage";
import { Home } from "@pages/Home";
import { Login } from "@pages/Login";
import { Register } from "@pages/Register";
import { Account } from "@pages/Account";
import { AnimeDetail } from "@pages/AnimeDetail";
import { MainLayout } from "@views/layouts/MainLayout";
import { Watch } from "@views/pages/Watch";
import { Dashboard } from "@views/backend/Dashboard";
import { UserDetail } from "./views/backend/UsersDetail";
import { Search } from "@views/pages/Search";
import useSWR from "swr";
import { fetchUserData } from "@utils/anime";
import { Transaction } from "@views/pages/Transaction";
import { AuthProvider } from "@views/components/AuthContext";

export const App = () => {
  const {
    data: userData,
    error: errorUserData,
  } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: false,
  });

  if (errorUserData) {
    console.error(errorUserData);
  }

  const checkLoginStatus = () => {
    if (userData?.username) {
      return true;
    } else {
      return false;
    }
  }

  const isLoggedIn = checkLoginStatus();

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
              <Route path="/" element={<Home />} />
              <Route path="account" element={<Account />} />
              <Route path="about" element={<About />} />
              <Route path="anime-detail/:animeId" element={<AnimeDetail />} />
              <Route
                path="watch/:animeId"
                element={<Watch />}
              />
              <Route path="watch" element={<Watch />} />
              <Route path="search" element={<Search />} />
              <Route path="transaction" element={<Transaction />} />
              <Route
                path="*"
                element={<ErrorPage />}
                errorElement={<ErrorPage />}
              />
            </Route>
            {/* auth paths */}
            <Route path="/auth/" errorElement={<ErrorPage />}>
              <Route
                path="login"
                element={<Login />}
                errorElement={<ErrorPage />}
              />
              <Route
                path="register"
                element={<Register />}
                errorElement={<ErrorPage />}
              />
            </Route>
            {/* admin path */}
            {isLoggedIn && (
              <Route
                path="/admin/"
                element={<Dashboard />}
                errorElement={<ErrorPage />}
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="userDetail" element={<UserDetail />} />
              </Route>
            )}
            {/* user path */}
            <Route
              path="/user/"
              element={<Account />}
              errorElement={<ErrorPage />}
            >
              <Route path="info" element={<UserDetail />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};
