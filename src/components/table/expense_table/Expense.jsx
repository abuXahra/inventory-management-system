
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './payment.style';
import { customStyles } from '../TableCustomStyle.style';



const ExpensesTable = ({ data }) => {

  const navigate = useNavigate();

  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
    },
    {
      name: 'Date',
      selector: (row) => row.date,
    },
    {
      name: 'Payment For',
      selector: (row) => row.paymentFor,
    },
    {
      name: 'Amount Paid',
      selector: (row) => `N${row.amount.toLocaleString()}`,
      sortable: true,
    },
    {
      name: 'Note',
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
          <ActionButton clr='blue' onClick={() => navigate(`/edit-expense/${row.id}`)}><FaEdit /></ActionButton>
          <ActionButton clr="red" onClick={() => handleDelete(row.id)}><FaTrash /></ActionButton>
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

export default ExpensesTable;
