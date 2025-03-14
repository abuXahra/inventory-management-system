import { AiFillProduct } from "react-icons/ai";
import { MdDashboard, MdCategory, MdAcUnit } from "react-icons/md";
import { FaUsers, FaCartPlus } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsCartX } from "react-icons/bs";
import { TbTax } from "react-icons/tb";
import { IoMicOffCircle } from "react-icons/io5";

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
    tile: "Reports",
    url: "/reports",
    icon: <BsCartX />,
  },
  {
    tile: "Setting",
    url: "#",
    subMenu: [
      {
        title: "TAX List",
        url: "/tax",
        icon: <TbTax />,
      },
      {
        title: "Unit List",
        url: "/units",
        icon: <MdAcUnit />,
      },
      {
        title: "Company Profile",
        url: "/company-profile",
        icon: <IoMicOffCircle />,
      },
      {
        title: "Users",
        url: "/users",
        icon: <FaUsers />,
      },
    ],
    icon: <HiUsers />,
  },
];
