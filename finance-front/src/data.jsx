import {
  FaHome,
  FaUser,
  FaCog,
  FaChartPie,
  FaTasks,
  FaCreditCard,
} from "react-icons/fa";

export const menuItems = [
  { icon: <FaHome />, text: "Home", path: "/" },
  { icon: <FaTasks />, text: "Transactions", path: "/transactions" },
  { icon: <FaCreditCard />, text: "Accounts", path: "/account" },
  { icon: <FaChartPie />, text: "Reports", path: "/reports" },
  { icon: <FaUser />, text: "Profile", path: "/profile" },
  { icon: <FaCog />, text: "Settings", path: "/settings" },
];
