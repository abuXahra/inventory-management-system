import { useNavigate } from "react-router-dom";
import { ActionButton, ActionButtons, Container, TableWrapper } from "./purchase.style";
import { FaEdit, FaFileInvoice, FaTrash } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { customStyles } from "../TableCustomStyle.style";




const PurchaseTable = ({data}) => {
  
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
      name: 'Supplier Name',
      selector: (row) => row.supplierName,
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
        width: '300px', // Set a different width
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
          <ActionButton clr='green' onClick={() => navigate(`/purchase-invoice/${row.id}`)}><FaFileInvoice/></ActionButton>
          <ActionButton clr='blue' onClick={() => navigate(`/edit-purchase/${row.id}`)}><FaEdit/></ActionButton>
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

export default PurchaseTable;
