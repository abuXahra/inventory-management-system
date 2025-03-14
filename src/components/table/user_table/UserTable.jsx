
import React from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './usertable.style';
import { customStyles } from '../TableCustomStyle.style';


const UserTable = ({ data }) => {

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
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: 'Email',
    //   selector: (row) => row.email,
    //   sortable: true,
    // },
    {
      name: 'Phone',
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
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
          <ActionButton clr='green' onClick={() => navigate(`/users/${row.id}`)}><FaEye /></ActionButton>
          <ActionButton clr='blue' onClick={() => navigate(`/edit-user/${row.id}`)}><FaEdit /></ActionButton>
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

export default UserTable;
