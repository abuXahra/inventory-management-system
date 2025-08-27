
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, TableWrapper } from './payment.style';
import { customStyles } from '../TableCustomStyle.style';
import axios from 'axios';
import { toast } from 'react-toastify';


const PaymentTable = ({ data, onDeletePayment }) => {

  const navigate = useNavigate();
  
    // fetching currency from db
    const [currencySymbol, setCurrencySymbol] =  useState('');
      useEffect(()=>{
          const fetchAllCompany = async() =>{
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`);
                  setCurrencySymbol(res.data[0].currencySymbol)
              } catch (error) {
                console.log(error)
              }
          }
          fetchAllCompany();
        },[]);
  
  
     const [showDeleteCard, setShowDeleteCard] = useState(false);
     const [grabId, setGrabId] = useState('');
     const [grabCode, setGrabCode] = useState('');
     const [grabPaymentFor, setGrabPaymentFor] = useState('');
     const [isLoading, setIsLoading] = useState(false);
    
     const handleGrabId = (paymentId, grabPaymentFor)=>{
                setShowDeleteCard(true);
                setGrabId(paymentId);
                setGrabPaymentFor(grabPaymentFor); 
                // setGrabCode(purchaseCode) 
            }
  
  // Handle delete
                 const handlePaymentDelete = async (purchaseId) => {
                    setIsLoading(true);
                    try {
                      const response = await onDeletePayment(purchaseId); // call parent function
                  
                      if (response.success) {
                        toast.success('Payment deleted successfully');
                        setShowDeleteCard(false); // Close modal
                      } else {
                        toast.error('Error deleting message: ' + response.message);
                      }
                    } catch (error) {
                      console.error(error);
                      toast.error('Unexpected error occurred');
                    } finally {
                      setIsLoading(false);
                    }
                  };
            
  
                  
                         // Handle bulk delete
                         const [selectedPayment, setSelectedPayment] = useState([]);
                         const [isDeleting, setIsDeleting] = useState(false);
                         const [showBulkDeleteCard, setShowBulkDeleteCard] = useState(false);
                         
                      //  to show bulk popup delete card
                         const handleBulkDelete = async () => {
                          setShowBulkDeleteCard(true);
                        };
                  
                        // to delete multiple selection
                        const confirmBulkDelete = async () => {
                          setIsDeleting(true);
                          try {
                            await axios.delete(`${process.env.REACT_APP_URL}/api/payment/bulk-delete`, {
                              data: { ids: selectedPayment.map((e) => e._id) },
                            });
                            toast.success(`${selectedPayment.length} purchases deleted successfully`);
                        
                            // remove deleted from UI
                              const deletedIds = selectedPayment.map((e) => e._id);
                              const updatedList = data.filter(purchase => !deletedIds.includes(purchase._id));
                              setSelectedPayment([]);
                              onDeletePayment(null, updatedList); // pass updated list to parent
                              setShowBulkDeleteCard(false);
                            } catch (err) {
                            console.error(err);
                            toast.error('Failed to delete selected purchases');
                          } finally {
                            setIsDeleting(false);
                          }
                        };
                  
  

  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
    },
        {
      name: 'Date',
      width: '15%',
      selector: (row) => {
        const date = new Date(row.paymentDate);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
    {
      name: 'Payment For',
      selector: (row) => row.paymentFor,
    },
    {
      name: 'Amount Paid',
      selector: (row) => `N${row.payableAmount.toLocaleString()}`,
      sortable: true,
    },
    {
      name: 'Payment Type',
      selector: (row) => row.paymentType,
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
          <ActionButton clr='blue' onClick={() => navigate(`/edit-payment/${row.id}`)}><FaEdit /></ActionButton>
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

export default PaymentTable;
