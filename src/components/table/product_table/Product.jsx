
import React from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './Product.style';
import { customStyles } from '../TableCustomStyle.style';


const ProductTable = ({ data }) => {

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
    // {
    //   name: 'Code',
    //   selector: (row) => row.code,
    //   sortable: true,
    // },
    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Category',
      selector: (row) => row.category,
      sortable: true,
    },
    // {
    //   name: 'SKU',
    //   selector: (row) => row.sku,
    //   sortable: true,
    // },
    {
      name: 'In Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: 'Unit',
      selector: (row) => row.unit,
      sortable: true,
      style: {
        width: '200px', // Set a different width
      },
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    // {
    //   name: 'Alert',
    //   selector: (row) => row.alertQty,
    //   sortable: true,
    // },
    // {
    //   name: 'Status',
    //   selector: (row) => row.status,
    //   sortable: true,
    // },
    {
      name: 'Actions',
      cell: (row) => (
        <ActionButtons>
          <ActionButton clr='green' onClick={() => navigate(`/product-detail/${row.id}`)}><FaEye /></ActionButton>
          <ActionButton clr='blue' onClick={() => navigate(`/edit-product/${row.id}`)}><FaEdit /></ActionButton>
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

export default ProductTable;
