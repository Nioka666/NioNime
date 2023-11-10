/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { About } from "./views/pages/About";
import { ErrorPage } from "./views/pages/ErrorPage";
import { Home } from "./views/pages/Home";
import { Login } from "./views/pages/Login";
import { Register } from "./views/pages/Register";
import { Account } from "./views/pages/Account";
import { AnimeDetail } from "./views/pages/AnimeDetail";
import { MainLayout } from "./views/layouts/MainLayout";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />} />
            <Route path="about" element={<About />} />
            <Route path="anime-detail/:animeId" element={<AnimeDetail />} />
            <Route
              path="anime-detail/watch/:animeId"
              element={<AnimeDetail />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route
            path="*"
            element={<ErrorPage />}
            errorElement={<ErrorPage />}
          />
        </Routes>
      </Router>
    </>
  );
};
