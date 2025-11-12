

import React from "react";
import DataTable from "react-data-table-component";
import { customStyles } from "../../TableCustomStyle.style";
import { Container, TableWrapper } from "../sale_report_table/saleReportTable.style";

const ItemsDailyReportTable = ({ data, currencySymbol }) => {

  console.log('symbol======= ',currencySymbol)
  // Calculate the total amounts and other sums as needed
  // const totalAmount = data.reduce((sum, row) => sum + row.totalAmount, 0);
  // const paidAmount = data.reduce((sum, row) => sum + row.paidAmount, 0);

  const totalAmount = data.reduce((sum, row) => sum + (row.saleAmount || 0), 0);
  const paidAmount = data.reduce((sum, row) => sum + (row.amountPaid || 0), 0);

  const status = ""; // Placeholder for merged row status


//   payment status bg color:
const getStatusBackgroundColor = (paymentStatus) => {
            switch (paymentStatus.toLowerCase()) {
              case "paid":
                return "green"; // Greenish background for 'Paid'
              case "partial":
                return "orange"; // Yellowish background for 'Pending'
              case "unpaid":
                return "red"; // Red background for 'Failed'
              default:
                return "#FFFFFF"; // Default white background if status is unknown
            }
          };


          
  const columns = [
    {
  name: 'Date',
  width: '13%',
  sortable: true,
  selector: (row) => {
    const date = new Date(row.saleDates);
    const parts = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).split(' ');
    parts[0] = parts[0].replace(/([A-Za-z]+)/, '$1.'); // Add period
    return parts.join(' ');
  },
},

       {
      name: "Code",
      selector: (row) => row.productCode,
      sortable: true,
      width: '13%',
    },
    {
      name: "Title",
      selector: (row) => row.productTitle,
      sortable: true,
        width: '20%',
    },
  {
      name: "Invoice No.",
      selector: (row) => row.invoiceCode,
      sortable: true,
      width: '13%',
    },
    {
      name: "Customer",
      selector: (row) => row.customerName,
      sortable: true,
      width: '13%',
    },
    {
      name: `Quantity Sold`,
      selector: (row) => row.totalQuantitySold,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalSalesAmount,
      sortable: true,
    },
  ];

const mergedRow = {
  code: <strong>Total</strong>,
  saleAmount: <strong><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{totalAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>,
  amountPaid: <strong><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{paidAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>,
  dueBalance: <strong><span dangerouslySetInnerHTML={{ __html: currencySymbol }} />{(totalAmount - paidAmount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong>,
  paymentStatus: "",
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
           pagination
            paginationPerPage={50} // Default rows per page
            paginationRowsPerPageOptions={[10, 25, 50, 100]} // Options in the dropdown
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

export default ItemsDailyReportTable;

