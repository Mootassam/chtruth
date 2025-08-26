import React from "react";
import { Link, useLocation } from "react-router-dom";

interface TabItem {
  icon: string;
  path: string;
  name: string;
}

function TabBottomNavigator() {
  const location = useLocation();

  const isActive = (pathname: string) => location.pathname === pathname;

  const tabs: TabItem[] = [
    {
      icon: "fas fa-home",
      path: "/",
      name: "Home",
    },
    {
      icon: "fas fa-chart-line",
      path: "/market",
      name: "Market",
    },
    {
      icon: "fas fa-exchange-alt",
      path: "/trade",
      name: "Trade",
    },
    {
      icon: "fas fa-bullhorn nav-icon",
      path: "/futures",
      name: "Futures",
    },
    {
      icon: "fas fa-wallet",
      path: "/wallets",
      name: "Wallets",
    },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((item, index) => (
        <Link key={index} to={item.path} className={`nav-item ${isActive(item.path) ? 'active' : ''}`}>
          <i className={`${item.icon} nav-icon`} />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default TabBottomNavigator;