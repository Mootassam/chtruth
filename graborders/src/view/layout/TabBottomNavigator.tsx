import React from "react";
import { Link, useLocation } from "react-router-dom";
import { i18n } from "../../i18n";

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
      name: i18n("components.bottomNav.home"),
    },
    {
      icon: "fas fa-chart-line",
      path: "/market",
      name: i18n("components.bottomNav.market"),
    },
    {
      icon: "fas fa-exchange-alt",
      path: "/trade",
      name: i18n("components.bottomNav.trade"),
    },
    {
      icon: "fas fa-chart-bar",
      path: "/futures",
      name: i18n("components.bottomNav.futures"),
    },
    {
      icon: "fas fa-wallet",
      path: "/wallets",
      name: i18n("components.bottomNav.wallets"),
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