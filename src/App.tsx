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

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />} errorElement={<ErrorPage />}>
            <Route path="/" element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="about" element={<About />} />
            <Route path="anime-detail/:animeId" element={<AnimeDetail />} />
            <Route
              path="anime-detail/watch/:animeId"
              element={<AnimeDetail />}
            />
            <Route path="watch" element={<Watch />} />
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
        </Routes>
      </Router>
    </>
  );
};
