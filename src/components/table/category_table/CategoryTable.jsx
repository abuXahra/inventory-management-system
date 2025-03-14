
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, TableWrapper } from './categoryTable.style';
import { Container } from '@mui/material';
import { customStyles } from '../TableCustomStyle.style';



const CategoryTable = ({data}) => {
  
  const navigate = useNavigate();

  const columns = [

    {
      name: '#',
      selector: (row) => row.id,
      sortable: true,
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
      name: 'Note',
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
          <ActionButton clr='green' onClick={() => navigate(`/category-detail/${row.id}`)}><FaEye/></ActionButton>
          <ActionButton clr='blue' onClick={() => navigate(`/edit-category/${row.id}`)}><FaEdit/></ActionButton>
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

export default CategoryTable;
