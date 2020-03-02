/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import UserForm from "views/UserProfile/UserForm.js";
import AddProduct from "views/UserProfile/AddProduct.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import { isParameter } from "typescript";


const dashboardRoutes = [
  // {
  //   path: "/profile",
  //   name: "Dashboard",
  //   rtlName: "لوحة القيادة",
  //   // icon: Profile,
  //   component: AddProduct,
  //   layout: "/publicity"
  // },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/publicity"
  },
  {
    path: "/addproduct",
    name: "Add Product",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "add_to_photos",
    // component: UserProfile,
    component: AddProduct,
    // component: UserForm,
    layout: "/publicity"
  },
  {
    path: "/viewproduct",
    name: "View Product",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: TableList,
    layout: "/publicity"
  },
  {
    path: "/report",
    name: "Report",
    rtlName: "طباعة",
    icon: LibraryBooks,
    component: Typography,
    layout: "/publicity"
  },
  {
    path: "/viewfeedback",
    name: "View Feedback",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Icons,
    layout: "/publicity"
  },
  {
    path: "/maps",
    name: "Maps",
    rtlName: "خرائط",
    icon: LocationOn,
    component: Maps,
    layout: "/publicity"
  },
  {
    path: "/addoffers",
    name: "Add Offers",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/publicity"
  },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
