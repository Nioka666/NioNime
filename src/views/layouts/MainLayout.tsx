import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import ProgressLoad from "@views/components/ProgressLoad";

export const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <ProgressLoad />;
  }
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};
