import { AiFillProduct } from "react-icons/ai";
import { MdDashboard, MdCategory, MdAcUnit } from "react-icons/md";
import { FaUsers, FaCartPlus } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsCartX } from "react-icons/bs";
import { TbTax } from "react-icons/tb";
import { IoMicOffCircle } from "react-icons/io5";
import { useContext } from "react";
import { UserContext } from "../components/context/UserContext";

export const SidebarItemLists = [
  {
    tile: "Dashboard",
    url: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    tile: "Sales",
    url: "/sales",
    icon: <BsFillCartDashFill />,
  },
  {
    tile: "Customers",
    url: "/customers",
    icon: <FaUsers />,
  },
  {
    tile: "Purchase",
    url: "/purchase",
    icon: <FaCartPlus />,
  },
  {
    tile: "Suppliers",
    url: "/suppliers",
    icon: <FaCartPlus />,
  },
  {
    tile: "Product",
    url: "/products",
    icon: <AiFillProduct />,
  },
  {
    tile: "Category",
    url: "/categories",
    icon: <MdCategory />,
  },
  {
    tile: "Payment",
    url: "/payments",
    icon: <FaCartPlus />,
  },
  {
    tile: "Expenses",
    url: "/expenses",
    icon: <FaCartPlus />,
  },
  {
    tile: "Return/Refund",
    url: "#",
    icon: <FaCartPlus />,
    subMenu: [
      {
        title: "Sale Return",
        url: "/sale-return",
        icon: <IoMicOffCircle />,
      },
      {
        title: "Purchase Return",
        url: "/purchase-return",
        icon: <FaUsers />,
      },
    ],
  },
  {
    tile: "Reports",
    url: "/reports",
    icon: <BsCartX />,
  },
  {
    tile: "Setting",
    url: "#",
    icon: <HiUsers />,
    subMenu: [
      {
        title: "Company",
        url: "/company-profile",
        icon: <IoMicOffCircle />,
      },
      {
        title: "Users",
        url: "/users",
        icon: <FaUsers />,
      },
      {
        title: "TAX",
        url: "/tax",
        icon: <TbTax />,
      },
      {
        title: "Unit",
        url: "/units",
        icon: <MdAcUnit />,
      },
    ],
  },
];
