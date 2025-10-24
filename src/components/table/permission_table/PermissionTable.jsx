import { useNavigate } from "react-router-dom";
import { ActionButton, ActionButtons, Container, TableWrapper } from "./permissionTable.style";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { customStyles } from "../TableCustomStyle.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SlideUpButton } from "../expense_table/Expense.style";
import Button from "../../clicks/button/Button";
import ButtonLoader from "../../clicks/button/button_loader/ButtonLoader";
import Overlay from "../../overlay/Overlay";
import ToastComponents from "../../toast_message/toast_component/ToastComponents";
import { token } from "../../context/UserToken";



const PermissionTable = ({ data, onPermissionsUpdated }) => {
  const [permissionState, setPermissionState] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setPermissionState(data);
  }, [data]);

  const handleCheckboxChange = (index, permissionType) => (e) => {
    const updated = [...permissionState];
    updated[index] = { ...updated[index], [permissionType]: e.target.checked };
    setPermissionState(updated);
  };

  const handleUpdatePermissions = async () => {
    setIsUpdating(true);
    try {
      await axios.put(
        `${process.env.REACT_APP_URL}/api/permission/update-all`,
        { permissions: permissionState },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Permissions updated successfully!");

      // 🔄 Refresh latest permission data from backend
      if (onPermissionsUpdated) {
        await onPermissionsUpdated();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update permissions");
    } finally {
      setIsUpdating(false);
    }
  };

  const columns = [
  { 
    name: "Module", 
    selector: (row) => row.title, 
    width: "20%" 
  },
  {
    name: "Visit Page",
    width: "16%",
    cell: (row, index) => (
      <input
        type="checkbox"
        checked={permissionState[index]?.visit || false}
        onChange={handleCheckboxChange(index, "visit")}
      />
    ),
  },
  {
    name: "Add",
    width: "16%",
    cell: (row, index) => {
      // ✅ Hide Add for Report and Permission
      if (["Report", "Permission"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.add || false}
          onChange={handleCheckboxChange(index, "add")}
        />
      );
    },
  },
  {
    name: "Edit",
    width: "16%",
    cell: (row, index) => {
      // ✅ Hide Edit for Report and Permission
      if (["Report"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.edit || false}
          onChange={handleCheckboxChange(index, "edit")}
        />
      );
    },
  },
  {
    name: "View",
    width: "16%",
    cell: (row, index) => {
      // ✅ Hide View for Report and Permission
      if (["Report"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.view || false}
          onChange={handleCheckboxChange(index, "view")}
        />
      );
    },
  },
  {
    name: "Delete",
    width: "16%",
    cell: (row, index) => {
      // ✅ Hide Delete for Report and Permission
      if (["Report", "Permission"].includes(row.title)) return null;
      return (
        <input
          type="checkbox"
          checked={permissionState[index]?.delete || false}
          onChange={handleCheckboxChange(index, "delete")}
        />
      );
    },
  },
];

  return (
    <Container>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={permissionState}
          responsive
          customStyles={customStyles}
        />
      </TableWrapper>

      <div
        style={{
          paddingRight: "20px",
          paddingBottom: "20px",
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <Button
          btnColor={"blue"}
          btnOnClick={handleUpdatePermissions}
          btnText={isUpdating ? <ButtonLoader text="Updating Permission" /> : "Update Permission"}
          disabled={isUpdating}
        />
      </div>

      <ToastComponents />
    </Container>
  );
};
export default PermissionTable;
