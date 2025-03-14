import {
  FaUsers,
  FaCartPlus,
  FaPeopleCarry,
  FaTrash,
  FaChartPie,
} from "react-icons/fa";
import { BsFillCartDashFill } from "react-icons/bs";
import { BsCartX } from "react-icons/bs";
import { BiBarChart } from "react-icons/bi";
import { PiInvoiceBold } from "react-icons/pi";
import { IoIosPeople } from "react-icons/io";
import { IoBagSharp, IoPricetagsSharp } from "react-icons/io5";

export const TopCardItemList = [
  {
    title: "Customer",
    count: "0",
    icon: <IoIosPeople />,
    bg: "#2563eb",
  },
  {
    title: "Sales Invoice",
    count: "0",
    icon: <PiInvoiceBold />,
    bg: "#16a34a",
  },
  {
    title: "Suppliers",
    count: "0",
    icon: <FaPeopleCarry />,
    bg: "#2563eb",
  },
  {
    title: "Purchase Invoice",
    count: "0",
    icon: <PiInvoiceBold />,
    bg: "#16a34a",
  },
  {
    title: "Items",
    count: "0",
    icon: <IoBagSharp />,
    bg: "#16a34a",
  },

  {
    title: "Items Category",
    count: "0",
    icon: <IoPricetagsSharp />,
    bg: "#2563eb",
  },
  {
    title: "Wastage Items",
    count: "0",
    icon: <FaTrash />,
    bg: "#f59e0b",
  },
  {
    title: "Expenses",
    count: "0",
    icon: <FaChartPie />,
    bg: "#ef4444",
  },
];
