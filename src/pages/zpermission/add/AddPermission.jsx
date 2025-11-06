// import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import { token } from "../../components/context/UserToken";
// import PageTitle from "../../components/page_title/PageTitle";
// import Button from "../../components/clicks/button/Button";
// import ButtonLoader from "../../components/clicks/button/button_loader/ButtonLoader";
// import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/page_title/PageTitle";
import ButtonLoader from "../../../components/clicks/button/button_loader/ButtonLoader";
import Button from "../../../components/clicks/button/Button";

export default function AddPermission() {
  const token = localStorage.getItem('token');

  const [module, setModule] = useState("");
  const [canView, setCanView] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!module.trim()) {
      toast.error("Please enter a module name.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_URL}/api/permission/add`,
        { module, canView, canAdd, canEdit, canDelete },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Permission module added successfully!");
      navigate("/permission"); // redirect back to list page
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add permission module");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <PageTitle title="Add Permission Module" />
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          marginTop: "20px",
        }}
      >
        <div className="form-group mb-3">
          <label>Module Name</label>
          <input
            type="text"
            className="form-control"
            value={module}
            onChange={(e) => setModule(e.target.value)}
            placeholder="e.g. Product, Purchase, Category..."
          />
        </div>

        <div className="form-group mb-3">
          <label>Permissions</label>
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={canView}
                onChange={(e) => setCanView(e.target.checked)}
              />{" "}
              View
            </label>
            <label>
              <input
                type="checkbox"
                checked={canAdd}
                onChange={(e) => setCanAdd(e.target.checked)}
              />{" "}
              Add
            </label>
            <label>
              <input
                type="checkbox"
                checked={canEdit}
                onChange={(e) => setCanEdit(e.target.checked)}
              />{" "}
              Edit
            </label>
            <label>
              <input
                type="checkbox"
                checked={canDelete}
                onChange={(e) => setCanDelete(e.target.checked)}
              />{" "}
              Delete
            </label>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "30px" }}>
          <Button
            btnColor={"blue"}
            btnType="submit"
            btnText={loading ? <ButtonLoader text="Saving..." /> : "Add Module"}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}
