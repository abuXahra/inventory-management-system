
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './customerTable.style';
import { customStyles } from '../TableCustomStyle.style';


const CustomerTable = ({data}) => {
  
  const navigate = useNavigate();
  const columns = [
    {
        name: 'S/N',
        selector: (row) => row.id,
        sortable: true,
      },
    {
      name: 'Code',
      selector: (row) => row.code,
      sortable: true,
      style: {
        width: '50px', // Set a different width
      },
    },
    {
      name: 'Customer Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
        name: 'Mobile',
        selector: (row) => row.mobile,
        sortable: true,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
        sortable: true,
    },
    // {
    //     name: 'Tax Number',
    //     selector: (row) => row.taxNumber,
    //     sortable: true,
    // },
    {
        name: 'Address',
        selector: (row) => row.address,
        sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
          <ActionButton clr='green' onClick={() => navigate(`/edit-customer/${row.id}`)}><FaEdit/></ActionButton>
          <ActionButton clr="blue" onClick={() => navigate(`/customers/${row.id}`)}><FaEye/></ActionButton>
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

export default CustomerTable;
