
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { customStyles } from '../TableCustomStyle.style';
import { ActionButton, ActionButtons, Container, TableWrapper } from './unitsTable.style';




const UnitsTable = ({ data }) => {

  const navigate = useNavigate();
  
  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
    },
    {
      name: 'Name',
      selector: (row) => row.name,
    },
    {
      name: 'Note',
      selector: (row) => row.note,
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
          <ActionButton clr='blue' onClick={() => navigate(`/edit-units/${row.id}`)}><FaEdit /></ActionButton>
          <ActionButton clr="red" onClick={() => handleDelete(row.id)}><FaTrash /></ActionButton>
        </ActionButtons>
      ),
    },
  ];

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

export default UnitsTable;
