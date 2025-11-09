

import path from "path";
import Permissions from "src/security/permissions";
const permissions = Permissions.values;

const privateRoutes = [
  {
    path: "/",
    loader: () => import("src/view/pages/Home/Home"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },


  {
    path: "/news",
    loader: () => import("src/view/pages/News/News"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/market",
    loader: () => import("src/view/pages/Market/Market"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/support",
    loader: () => import("src/view/pages/Support/Support"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/about",
    loader: () => import("src/view/pages/About/About"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: '/approval',
    loader: () => import('src/view/pages/About/Approval'),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/",
    loader: () => import("src/view/pages/Home/Home"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/market",
    loader: () => import("src/view/pages/Market/Market"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/trade",
    loader: () => import("src/view/pages/Trade/trade"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/futures",
    loader: () => import("src/view/pages/Futures/futures"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/wallets",
    loader: () => import("src/view/pages/wallet/wallet"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
];

const screenRoutes = [
  {
    path: "/invitation",
    loader: () => import("src/view/pages/invitation/invitation"),
    permissionRequired: permissions.categoryRead,
  },

  // {
  //   path: "/members",
  //   loader: () => import("src/view/pages/invitation/members"),
  //   permissionRequired: permissions.categoryRead,
  // },
  {
    path: "/wallets/:id",
    loader: () => import("src/view/pages/wallet/assetsDetail"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/conversion",
    loader: () => import("src/view/pages/conversion/Conversion"),
    permissionRequired: permissions.categoryRead,
  },
  {
    path: "/ordersPage",
    loader: () => import("src/view/pages/Order/OrdersPage"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/deposit",
    loader: () => import("src/view/pages/deposit/deposit"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },


  {
    path: "/history",
    loader: () => import("src/view/pages/History/History"),
    permissionRequired: permissions.categoryRead,
  },

  {
    path: "/withdrawaddress",
    loader: () => import("src/view/pages/withdraw/WirthdrawAddress"),
    permissionRequired: permissions.categoryRead,
  },
  {
    path: "/formwithdrawaddress/:id",
    loader: () => import("src/view/pages/withdraw/formWithdrawAdress"),
    permissionRequired: permissions.categoryRead,
  },

  {
    path: "/market/detail/:id",
    loader: () => import("src/view/pages/Market/MarketDetail"),
  },

  {
    path: "/Withdraw",
    loader: () => import("src/view/pages/withdraw/Withdraw"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/Withdrawaddress",
    loader: () => import("src/view/pages/withdraw/WirthdrawAddress"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/notification",
    loader: () => import("src/view/pages/Notification/Notification"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/passwordtype",
    loader: () => import("src/view/pages/profile/typepassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/loginpassword",
    loader: () => import("src/view/pages/LoginPassword/LoginPassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/withdrawPassword",
    loader: () => import("src/view/pages/LoginPassword/withdrawpassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/p2p",
    loader: () => import("src/view/pages/p2p/p2p"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/typepassword",
    loader: () => import("src/view/pages/profile/typepassword"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/profile",
    loader: () => import("src/view/pages/profile/profile"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/proof",
    loader: () => import("src/view/pages/proof/proof"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/stacking",
    loader: () => import("src/view/pages/stacking/stacking"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/security-tips",
    loader: () => import("src/view/pages/securitytips/securitytips"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/privacy-portal",
    loader: () => import("src/view/pages/Home/Privacy"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/terms-of-use",

    loader: () => import("src/view/pages/Home/Termeofuse"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },

  {
    path: "/termservice",
    loader: () => import("src/view/pages/termservice/termservice"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: "/auth/signin",
    loader: () => import("src/view/pages/Auth/Signin"),
  },
  {
    path: "/terms-of-uses",
    loader: () => import("src/view/pages/Terms/TermsofServicePage"),
  },
  {
    path: "/auth/signup",
    loader: () => import("src/view/pages/Auth/Signup"),
  },


  {
    path: "/impersonate",
    loader: () => import("src/view/pages/Auth/ImpersonatePage"),
  },

];
const simpleRoutes = [
  {
    path: "/403",
    loader: () => import("src/view/shared/errors/Error403Page"),
  },
  {
    path: "/500",
    loader: () => import("src/view/shared/errors/Error500Page"),
  },
  {
    path: "**",
    loader: () => import("src/view/shared/errors/Error404Page"),
  },
].filter(Boolean);

const emptyPermissionsRoutes = [
  {
    path: "/auth/empty-permissions",
    loader: () => import("src/view/pages/Auth/EmptyPermissionsPage"),
  },
].filter(Boolean);

const navRoutes = [
  {
    path: "/",
    loader: () => import("src/view/pages/Home/Home"),
  },
  {
    path: "/language",
    loader: () => import("src/view/pages/Language/Language"),
  },
  {
    path: "/Playstore",
    loader: () => import("src/view/pages/Playsotre/Playstore"),
  },
  {
    path: "/market",
    loader: () => import("src/view/pages/Market/Market"),
  },

  {
    path: "/liveChat",
    loader: () => import("src/view/pages/LiveChat/LiveChat"),
  },


  {
    path: "/faq-center",
    loader: () => import("src/view/pages/Home/Faq"),
  },

  {
    path: "/support",
    loader: () => import("src/view/pages/Support/Support"),
  },


].filter(Boolean);
export default {
  privateRoutes,
  publicRoutes,
  simpleRoutes,
  screenRoutes,
  navRoutes,
  emptyPermissionsRoutes,
};
