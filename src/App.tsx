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
import { fetchAdminData } from "@utils/anime";
import { TrxProcess } from "@views/pages/TrxProcess";
import { TrxWaiting } from "@views/pages/TrxWaiting";
import { TransactionEdit } from "@views/backend/TransactionEdit";
import { TransactionsDetail } from "@views/backend/TransactionsDetail";
import { CardsRow } from "@views/backend/components/CardsRow";
import { Memberships } from "@views/backend/Memberships";
import { UserLists } from "@views/backend/UserLists";
import { AdminLoadings } from "@views/backend/components/AdminLoadings";
import { UserInfo } from "@views/pages/UserInfo";
import { ChangePasswordForm } from "@views/pages/ChangePassword";
import { MembershipInfo } from "@views/pages/MembershipInfo";
import { OrderHistory } from "@views/pages/OrderHistory";
import { PlayerVid } from "@views/pages/VideoPlayer";
import { UserEdit } from "@views/backend/UserEdit";
import { MembershipEdit } from "@views/backend/MembershipEdit";

export const App = () => {
  const { data: adminData } = useSWR("fetchAdminData", () => fetchAdminData(), {
    revalidateOnFocus: true,
  });
  const adminCheck = () => {
    if (adminData) {
      return true;
    } else {
      return false;
    }
  };
  const isAdminLoggedIn = adminCheck();

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="account" element={<Account />} />
              <Route path="account/" element={<Account />}>
                <Route path="user-info" element={<UserInfo />} />
                <Route path="membership-info" element={<MembershipInfo />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordForm />}
                />
                <Route path="order-history" element={<OrderHistory />} />
              </Route>
              <Route path="about" element={<About />} />
              <Route path="anime-detail/:animeId" element={<AnimeDetail />} />
              <Route path="watch/:animeId" element={<Watch />} />
              <Route path="watch" element={<Watch />} />
              <Route path="search" element={<Search />} />
              <Route path="testt" element={<PlayerVid />} />
              <Route
                path="transaction/:memberLevel"
                element={<Transaction />}
              />
              <Route
                path="transaction/process/:membershipSlug/:method"
                element={<TrxProcess />}
              />
              <Route path="transaction/waiting" element={<TrxWaiting />} />
              {/* <Route path="transaction/invoice" element={<InvoicePage />} /> */}
              <Route
                path="/*"
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
              <Route
                path="admin-portals"
                element={<AdminLoginForm />}
                errorElement={<AdminLoadings />}
              />
            </Route>
            {/* admin path */}
            {isAdminLoggedIn === true && (
              <Route
                path="/admin/*"
                element={<Dashboard />}
                errorElement={<AdminLoadings />}
              >
                <Route path="admin/" element={<CardsRow />} />
                <Route path="dashboard" element={<CardsRow />} />
                <Route path="transactions" element={<TransactionsDetail />} />
                <Route path="users" element={<UserLists />} />
                <Route path="memberships" element={<Memberships />} />
                <Route
                  path="memberships/edit/:membershipSlug"
                  element={<MembershipEdit />}
                />
                <Route path="edit-user/:userIDs" element={<UserEdit />} />
                <Route
                  path="transaction-edit/:trxID"
                  element={<TransactionEdit />}
                />
              </Route>
            )}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
};
