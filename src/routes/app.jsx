import HomePage from "views/Home/Home.jsx";
import BugsIndexPage from "views/Bugs/BugsIndex.jsx";
import BugProfilePage from "views/Bugs/BugProfile.jsx";
import BugWithTCIndex from "views/BugWithTCs/BugWithTCIndex.jsx";
import TestPlanIndexPage from "views/TestPlan/TestPlanIndex.jsx";
import TestPlanPage from "views/TestPlan/TestPlanProfile.jsx";
import Statistics from "views/Statistic/Statistics";
import ReportPage from "views/TestSuite/Report.jsx";

import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import TableList from "views/TableList/TableList.jsx";
import Typography from "views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Maps from "views/Maps/Maps.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";

import {
  Dashboard,
  Person,
  ContentPaste,
  LibraryBooks,
  BubbleChart,
  LocationOn,
  Notifications,
  BugReport,
  Home,
  TrendingUp,
  AccountBalance,
} from "material-ui-icons";

const appRoutes = [
  {
    path: "/home",
    sidebarName: "Home",
    navbarName: "Home Bug Manager",
    icon: Home,
    component: HomePage
  },
  {
    path: "/bugs",
    sidebarName: "Bugs",
    navbarName: "Bugs",
    icon: BugReport,
    component: BugsIndexPage
  },
  {
    path: "/addbugs",
    sidebarName: "Link Bug - Test Case",
    navbarName: "Link Bug - Test Case",
    icon: BugReport,
    component: BugProfilePage
  },
  {
    path: "/bugtestcases",
    sidebarName: "Bug with Test Cases",
    navbarName: "Bug with Test Cases",
    icon: AccountBalance,
    component: BugWithTCIndex
  },
  {
    path: "/statistics",
    sidebarName: "Statistics",
    navbarName: "Statistics",
    icon: TrendingUp,
    component: Statistics
  },
];

export default appRoutes;
