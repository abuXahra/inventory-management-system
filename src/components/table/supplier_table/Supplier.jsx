
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './supplier.style';
import { customStyles } from '../TableCustomStyle.style';


const SupplierTable = ({data}) => {
  
  const navigate = useNavigate();


  const columns = [
    {
        name: 'Code',
        selector: (row) => row.code,
        sortable: true,
      },
    {
      name: 'Date',
      selector: (row) => row.date,
      sortable: true,
    },
    {
        name: 'Supplier Name',
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
    {
      name: 'Tax No.',
      selector: (row) => row.taxNo,
      sortable: true,
      style: {
        width: '200px', // Set a different width
      },
    },
    {
        name: 'Address',
        selector: (row) => row.address,
        sortable: true,
      },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
          <ActionButton clr='green' onClick={() => navigate(`/supplier-detail/${row.id}`)}><FaEye/></ActionButton>
          <ActionButton clr='blue' onClick={() => navigate(`/edit-supplier/${row.id}`)}><FaEdit/></ActionButton>
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

export default SupplierTable;
