// import React from "react";
// import DataTable from "react-data-table-component";
// import styled from "styled-components";
// import {
//   FaEdit,
//   FaEnvelope,
//   FaEye,
//   FaFileInvoice,
//   FaTrash,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { ActionButton, ActionButtons, Container, TableWrapper } from "./saleReportTable.style";


// const SaleReportTable = ({ data }) => {
//   const navigate = useNavigate();

  
//       // Conditional background color based on paymentStatus
//       const getStatusBackgroundColor = (paymentStatus) => {
//         switch (paymentStatus.toLowerCase()) {
//           case "paid":
//             return "green"; // Greenish background for 'Paid'
//           case "pending":
//             return "orange"; // Yellowish background for 'Pending'
//           case "failed":
//             return "red"; // Red background for 'Failed'
//           default:
//             return "#FFFFFF"; // Default white background if status is unknown
//         }
//       };


//   const columns = [
//     {
//         name: "#",
//         selector: (row) => row.id,
//         sortable: true,
//       },
//     {
//       name: "Invoice No",
//       selector: (row) => row.code,
//       sortable: true,
//     },
//     {
//       name: "Date",
//       selector: (row) => row.date,
//       sortable: true,
//     },
//     {
//       name: "Customer Name",
//       selector: (row) => row.name,
//       sortable: true,
//     },
//     {
//       name: "Total Amount (N)",
//       selector: (row) => row.totalAmount,
//       sortable: true,
//     },
//     {
//       name: "Paid Amount (N)",
//       selector: (row) => row.paidAmount,
//       sortable: true,
//       style: {
//         width: "200px", // Set a different width
//       },
//     },
//     { name: "Status",
//         selector: (row) => row.paymentStatus,
//         sortable: true,
//         cell: (row) => (
//           <div
//             style={{
//               backgroundColor: getStatusBackgroundColor(row.paymentStatus),
//               padding: "5px 20px",
//               borderRadius: "5px",
//               textAlign: "center",
//               color: "white",
//               fontSize: "8px", 
//               width:" 75px"
//             }}
//           >
//             {row.paymentStatus}
//           </div>
//         ),
//       },
//   ];


//   return (
//     <Container>
//       {/* <Title>Sales Data</Title> */}
//       <TableWrapper>
//         <DataTable
//           //   title="Sales Table"
//           columns={columns}
//           data={data}
//         //   pagination
//           responsive
//           customStyles={{
//             table: {
//               style: {
//                 width: "100%", // Ensure the table takes up 100% of its container width
//                 tableLayout: "auto",
//                 padding: "0px", // Allow columns to adjust their width based on content
//                 margin: "0px",
//                 paddingBottom: '20px'
//               },
//             },
//             head: {
//               style: {
//                 fontWeight: "bold",
//                 fontSize: "12px", // Adjust font size if needed
//                 textAlign: "center", // Align text in the header cells
//                 height: "40px",
//               },
//             },
//             headCells: {
//               style: {
//                 whiteSpace: "normal", // Allow multi-line headers if needed
//                 fontSize: "10px",
//                 wordWrap: "break-word", // Ensure long text wraps within the cell
//                 fontWeight: "bold",
//                 paddingBottom: "0px", // Set padding for header row to 0
//                 paddingLeft: "0px", // Set padding for header row to 0
//                 paddingRight: "0px", // Set padding for header row to 0
//                 paddingTop: "0px", // Set padding for header row to 0
//               },
//             },
//             cells: {
//               style: {
//                 paddingBottom: "2px",
//                 paddingLeft: "2px",
//                 paddingRight: "2px",
//                 paddingTop: "2px", // Reduce padding for cells
//                 wordWrap: "break-word", // Ensure long text wraps within the cell
//                 whiteSpace: "normal", // Allow text to wrap inside cells
//               },
//             },
//             rows: {
//               style: {
//                 fontSize: "10px", // Smaller font size for rows
//                 minHeight: "20px",
//                 borderBottom: "none",
//               },
//             },
//           }}
//         />
//       </TableWrapper>
//     </Container>
//   );
// };

// export default SaleReportTable;



import React from "react";
import DataTable from "react-data-table-component";
import { Container, TableWrapper } from "./saleReportTable.style";
import { customStyles } from "../../TableCustomStyle.style";

const SaleReportTable = ({ data }) => {
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
      width: '6%',
    },
    {
      name: "Invoice No",
      selector: (row) => row.code,
      sortable: true,
      width: '10%',
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      width: '10%',
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
   {
      name: "Due Amount (N)",
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
              { name: "<b>Total</b>", colSpan: 3, align: "right" },
            ],
          }}
        />
      </TableWrapper>
    </Container>
  );
};

export default SaleReportTable;

