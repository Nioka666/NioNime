import { AdminNav } from "./components/AdminNav";
import { Sidebar } from "./components/Sidebar";
import { SetStateAction, useState } from "react";
import { UserDetails } from "./UserDetail";
import { TransactionsDetail } from "./TransactionsDetail";
import { Memberships } from "./Memberships";
import { CardsRow } from "./components/CardsRow";

export const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const handleMenuClick = (menu: SetStateAction<string>) => {
    setActiveMenu(menu);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <CardsRow />;
      case "transactions":
        return <TransactionsDetail />;
      case "memberships":
        return <Memberships />;
      default:
        return <UserDetails />;
    }
  };

  return (
    <>
      <style>
        {`
        body {
          background-color: #323236;
        }
      `}
      </style>
      <AdminNav />
      <div className="container-fluid">
        <div className="row d-flex gap-1 flex-lg-nowrap">
          <Sidebar onMenuClick={handleMenuClick} activeMenu={activeMenu} />
          {renderContent()}
        </div>
      </div>
    </>
  );
};
