import { Outlet } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export const MainLayout = () => {
  return (
    <>
      <Nav />   
      <Outlet />
      <Footer />
    </>
  );
};
