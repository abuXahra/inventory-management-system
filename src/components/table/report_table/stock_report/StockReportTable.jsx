
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Container, TableWrapper } from './stockReportTable.style';


const StockReportTable = ({ data, tbWidth }) => {

  const navigate = useNavigate();

  const columns = [
    {
      name: 'S/N',
      selector: (row) => row.id,
    },
    {
      name: 'Photo',
      selector: (row) => row.imgUrl,
      cell: (row) => <img src={row.imgUrl} alt={row.name} style={{ width: '20px', borderRadius: '100%', height: '20px', objectFit: 'cover' }} />,
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Categories',
      selector: (row) => row.category,
      sortable: true,
    },
    {
        name: 'Unit',
        selector: (row) => row.unit,
        sortable: true,
        style: {
          width: '150px', // Set a different width
        },
      },
    {
        name: 'Tax',
        selector: (row) => row.tax,
        sortable: true,
      },
    {
      name: 'In Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  return (
    <Container tbWidth={tbWidth}>
      {/* <Title>Sales Data</Title> */}
      <TableWrapper>
        <DataTable
          //   title="Sales Table"
          columns={columns}
          data={data}
          responsive
          customStyles={{
            table: {
              style: {
                width: '100%', // Ensure the table takes up 100% of its container width
                tableLayout: 'auto',
                padding: "0px", // Allow columns to adjust their width based on content
                margin: "0px",
                border: '1px solid #cccccc47'
              },

            },
            head: {
              style: {
                fontWeight: 'bold',
                fontSize: '12px', // Adjust font size if needed
                textAlign: 'start', // Align text in the header cells
                height: "20px",
              }
            },
            headCells: {
              style: {
                whiteSpace: 'normal', // Allow multi-line headers if needed
                fontSize: "10px",
                wordWrap: 'break-word', // Ensure long text wraps within the cell
                fontWeight: 'bold',
                paddingBottom: "0px", // Set padding for header row to 0
                paddingLeft: "20px",    // Set padding for header row to 0
                paddingRight: "0px",   // Set padding for header row to 0
                paddingTop: "0px",    // Set padding for header row to 0
                backgroundColor: '#cccccc47',
                height: "20px",
              },
            },
            cells: {
              style: {
                paddingBottom: "2px",
                paddingLeft: "20px",
                paddingRight: "2px",
                paddingTop: "2px",// Reduce padding for cells
                wordWrap: 'break-word', // Ensure long text wraps within the cell
                whiteSpace: 'normal', // Allow text to wrap inside cells
              },
            },
            rows: {
              style: {
                fontSize: '10px', // Smaller font size for rows
                minHeight: "20px",
              },
            },
          }}
        />
      </TableWrapper>
    </Container>
  );
};

export default StockReportTable;
