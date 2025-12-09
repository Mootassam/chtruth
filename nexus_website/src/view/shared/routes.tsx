import Permissions from "src/security/permissions";
const permissions = Permissions.values;


const publicRoutes = [
  {
    path: "/",
    loader: () => import("src/view/pages/Home/Home"),
  },

    {
    path: "/services",
    loader: () => import("src/view/pages/AboutUs/aboutus"),
  },

    {
    path: "/privacy",
    loader: () => import("src/view/pages/Privacy/Privacy"),
  },

      {
    path: "/terms-of-use",
    loader: () => import("src/view/pages/terms/TermsOfUse"),
  },
      {
    path: "/market",
    loader: () => import("src/view/pages/market/Market"),
  },

      {
    path: "/faqs",
    loader: () => import("src/view/pages/Faqs/FAQs"),
  },

        {
    path: "/helpcenter",
    loader: () => import("src/view/pages/HelpCenter/HelpCenter"),
  },

];


export default {
  publicRoutes,

};
