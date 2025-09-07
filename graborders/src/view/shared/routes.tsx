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
    loader: () => import("src/view/pages/Trade/Trade"),
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
    loader: () => import("src/view/pages/wallet/MyWallet"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/deposit",
    loader: () => import("src/view/pages/deposit/deposit"),
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
 {
    path: "/ordersPage",
    loader: () => import("src/view/pages/Order/OrdersPage"),
    permissionRequired: permissions.categoryRead,
    exact: true,
  },
  {
    path: "/language",
    loader: () => import("src/view/pages/Language/Language"),
    permissionRequired: permissions.categoryRead,
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
    path: "/wallet",
    loader: () => import("src/view/pages/wallet/Wallet"),
    permissionRequired: permissions.categoryRead,
    exact: true,
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
    path: "/securitytips",
    loader: () => import("src/view/pages/securitytips/securitytips"),
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
    path: "/auth/signup",
    loader: () => import("src/view/pages/Auth/Signup"),
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
    path: "/market",
    loader: () => import("src/view/pages/Market/Market"),
  },

  {
    path: "/support",
    loader: () => import("src/view/pages/Support/Support"),
  },

  {
    path: "/news",
    loader: () => import("src/view/pages/News/News"),
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
