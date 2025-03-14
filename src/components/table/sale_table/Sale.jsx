
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { ActionButton, ActionButtons, Container, TableWrapper, Title } from './sale.style';
import { FaEdit, FaEnvelope, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../TableCustomStyle.style';


const SalesTable = ({data}) => {
  
  const navigate = useNavigate();


  const columns = [
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: 'Customer Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Grand Total',
      selector: (row) => row.grandTotal,
      sortable: true,
      style: {
        width: '200px', // Set a different width
      },
    },
    {
      name: 'Payment Status',
      selector: (row) => row.paymentStatus,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
          <ActionButton clr='green' onClick={() => navigate(`/invoice/${row.id}`)}><FaFileInvoice/></ActionButton>
          <ActionButton clr="red" onClick={() => handleDelete(row.id)}><FaTrash/></ActionButton>
        </ActionButtons>
      ),
    },
  ];

  const handleEdit = (rowData) => {
    alert(`Editing row with ID: ${rowData.id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting row with ID: ${id}`);
  };

  return (
    <Container>
      {/* <Title>Sales Data</Title> */}
      <TableWrapper>
        <DataTable
        //   title="Sales Table"
          columns={columns}
          data={data}
          pagination
          responsive
          customStyles={customStyles}
        />
      </TableWrapper>
    </Container>
  );
};

export default SalesTable;
