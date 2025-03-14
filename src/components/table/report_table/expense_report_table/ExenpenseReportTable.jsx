


import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";
import { Container, TableWrapper } from "./expenseReportTable";

const ExpenseReportTable = ({ data }) => {
  // Calculate the total amounts and other sums as needed
  const paidAmount = data.reduce((sum, row) => sum + row.paidAmount, 0);

          
  
          
  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Payment For",
      selector: (row) => row.paymentFor,
      sortable: true,
    },
    {
      name: "Paid Amount (N)",
      selector: (row) => row.paidAmount,
      sortable: true,
    },
    {
        name: "Note",
        selector: (row) => row.note,
        sortable: true,
      },
  ];


 
  // Merged row data (with total row)
  const mergedRow = {
    id: "",  // Unique ID for this merged row
    date: "",    // Add "Total" text to the Date column
    paymentFor: <b>{`Total`}</b>,   // Leave it empty as it's not needed in the total row
    paidAmount: <b>{paidAmount}</b>, // The total of the paid amounts
    note: "",         // Leave note empty for the total row
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
              { name: "Date", colSpan: 2 },
              { name: "Total", colSpan: 2, align: "right" },
            ],
          }}
        />
      </TableWrapper>
    </Container>
  );
};

export default ExpenseReportTable;

