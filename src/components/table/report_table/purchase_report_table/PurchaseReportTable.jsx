

import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";
import { Container, TableWrapper } from "./purchaseReportTable.style";

const PurchaseReportTable = ({ data }) => {
  // Calculate the total amounts and other sums as needed
  const totalAmount = data.reduce((sum, row) => sum + row.totalAmount, 0);
  const paidAmount = data.reduce((sum, row) => sum + row.paidAmount, 0);
  const status = ""; // Placeholder for merged row status


//   payment status bg color:
const getStatusBackgroundColor = (paymentStatus) => {
            switch (paymentStatus.toLowerCase()) {
              case "paid":
                return "green"; // Greenish background for 'Paid'
              case "pending":
                return "orange"; // Yellowish background for 'Pending'
              case "unpaid":
                return "red"; // Red background for 'Failed'
              default:
                return "#FFFFFF"; // Default white background if status is unknown
            }
          };


          
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Invoice No",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Total Amount (N)",
      selector: (row) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Paid Amount (N)",
      selector: (row) => row.paidAmount,
      sortable: true,
    },
    { name: "Status",
                selector: (row) => row.paymentStatus,
                sortable: true,
                cell: (row) => (
                  <div
                    style={{
                      backgroundColor: getStatusBackgroundColor(row.paymentStatus),
                      padding: "5px 20px",
                      borderRadius: "5px",
                      textAlign: "center",
                      color: "white",
                      fontSize: "8px", 
                      width:" 75px"
                    }}
                  >
                    {row.paymentStatus}
                  </div>
                ),
              },
  ];

  // Merged row data (with total row)
  const mergedRow = {
    // id: "total-row", // Unique ID for this merged row
    code: "Total",  // This will span across the merged columns
    date: "",       // Empty value for date
    name: "",       // Empty value for customer name
    totalAmount: totalAmount,  // Total amount
    paidAmount: paidAmount,    // Paid amount
    paymentStatus: "",     // The status (total)
  };

  // Combine the data with the merged row
  const combinedData = [...data, mergedRow];

  return (
    <Container>
      <TableWrapper>
        <DataTable
          columns={columns}
          data={combinedData}
          responsive
          customStyles={customStyles}
          // Custom footer row for merged cells
          footer={{
            columns: [
              { name: "Invoice No.", colSpan: 3 },
              { name: "Total", colSpan: 3, align: "right" },
            ],
          }}
        />
      </TableWrapper>
    </Container>
  );
};

export default PurchaseReportTable;

