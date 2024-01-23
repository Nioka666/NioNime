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
import { Search } from "@views/pages/Search";
import { Transaction } from "@views/pages/Transaction";
import { AuthProvider } from "@views/components/AuthContext";
import { AdminLoginForm } from "@views/backend/AdminLogin";
import useSWR from "swr";
import { fetchAdminData, fetchUserData } from "@utils/anime";
import { TrxProcess } from "@views/pages/TrxProcess";
import { TrxWaiting } from "@views/pages/TrxWaiting";

export const App = () => {
  const { data: userData } = useSWR("fetchUserData", () => fetchUserData(), {
    revalidateOnFocus: false,
  });

  const { data: adminData } = useSWR("fetchAdminData", () => fetchAdminData(), {
    revalidateOnFocus: false,
  });

  const adminCheck = () => {
    if (adminData?.username) {
      return true;
    }
  };

  const userCheck = () => {
    if (userData?.username) {
      return true;
    }
  };

  const isUserLoggedIn = userCheck();
  const isAdminLoggedIn = adminCheck();

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<MainLayout />}
              errorElement={<ErrorPage />}
            >
              <Route path="/" element={<Home />} />
              <Route path="account" element={<Account />} />
              <Route path="about" element={<About />} />
              <Route path="anime-detail/:animeId" element={<AnimeDetail />} />
              <Route path="watch/:animeId" element={<Watch />} />
              <Route path="watch" element={<Watch />} />
              <Route path="search" element={<Search />} />
              <Route path="transaction" element={<Transaction />} />
              <Route
                path="transaction/process/:method"
                element={<TrxProcess />}
              />
              <Route path="transaction/waiting" element={<TrxWaiting />} />
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
              {!isAdminLoggedIn && (
                <Route
                  path="admin-portals"
                  element={<AdminLoginForm />}
                  errorElement={<ErrorPage />}
                />
              )}
            </Route>
            {/* admin path */}
            {isAdminLoggedIn === true && (
              <Route path="/admin/" element={<Dashboard />}>
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            )}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};
