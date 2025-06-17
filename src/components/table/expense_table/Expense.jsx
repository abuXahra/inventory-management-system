
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { FaEdit, FaEnvelope, FaEye, FaFileInvoice, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionButton, ActionButtons, Container, SlideUpButton, TableWrapper } from './Expense.style';
import { customStyles } from '../TableCustomStyle.style';
import axios from 'axios';
import { toast } from 'react-toastify';
import Overlay from '../../overlay/Overlay';
import ButtonLoader from '../../clicks/button/button_loader/ButtonLoader';
import ToastComponents from '../../toast_message/toast_component/ToastComponents';
import Button from '../../clicks/button/Button';



const ExpensesTable = ({ data, onDeleteExpense }) => {

  const navigate = useNavigate();

  // fetching currency from db
  const [currencySymbol, setCurrencySymbol] =  useState('');
    useEffect(()=>{
        const fetchAllCompany = async() =>{
          
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`);
             
                setCurrencySymbol(res.data[0].currencySymbol)
  
               
            } catch (error) {
         
            }
      
        }
        fetchAllCompany();
      },[]);
  

            const [showDeleteCard, setShowDeleteCard] = useState(false);
            const [grabId, setGrabId] = useState('');
            const [grabExpenseName, setGrabExpenseName] = useState('');
            const [isLoading, setIsLoading] = useState(false);
    
            // 1506132590

            const handleGrabId = (expenseId, expenseName)=>{
              setShowDeleteCard(true);
              setGrabId(expenseId);
              setGrabExpenseName(expenseName);
          
          }


               const handleExpenseDelete = async (expenseId) => {
                  setIsLoading(true);
                  try {
                    const response = await onDeleteExpense(expenseId); // call parent function
                
                    if (response.success) {
                      toast.success('Expense deleted successfully');
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
       const [selectedExpenses, setSelectedExpenses] = useState([]);
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
          await axios.delete(`${process.env.REACT_APP_URL}/api/expense/bulk-delete`, {
            data: { ids: selectedExpenses.map((e) => e._id) },
          });
          toast.success(`${selectedExpenses.length} expenses deleted successfully`);
      
          // remove deleted from UI
            const deletedIds = selectedExpenses.map((e) => e._id);
            const updatedList = data.filter(exp => !deletedIds.includes(exp._id));
            setSelectedExpenses([]);
            onDeleteExpense(null, updatedList); // pass updated list to parent
            setShowBulkDeleteCard(false);
          } catch (err) {
          console.error(err);
          toast.error('Failed to delete selected expenses');
        } finally {
          setIsDeleting(false);
        }
      };



  const columns = [
    {
      name: 'Date',
      width: '15%',
      selector: (row) => {
        const date = new Date(row.expenseDate);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
      },
    },
    {
      name: 'Code',
      selector: (row) => row.code,
      width: '10%',
    },
    {
      name: 'Payment For',
      selector: (row) => row.expenseFor,
      width: '20%',
    },
    {
      name: 'Amount Paid',
      selector: (row) => <div>
        <span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{row.amount.toLocaleString()}
      </div>  ,
      sortable: true,
      // width: '15%',
    },
    {
      name: 'Note',
      selector: (row) => row.note,
      sortable: true,
      width: '25%',
    },
    {
      name: 'Actions',
      width: '10%',
      cell: (row) => (
        <ActionButtons>
          <ActionButton clr='blue' onClick={() => navigate(`/edit-expense/${row._id}`)}><FaEdit /></ActionButton>
          <ActionButton clr="red" onClick={() => handleGrabId(row._id, row.expenseFor)}><FaTrash /></ActionButton>
        </ActionButtons>
      ),
    },
  ];

  return (
    <Container>
          {/* <Title>Sales Data</Title> */}
          <TableWrapper>
            <DataTable
              //   title="Sales Table"
              columns={columns}
              data={data}
              pagination
              paginationPerPage={50} // Default rows per page
              paginationRowsPerPageOptions={[10, 25, 50, 100]} // Options in the dropdown
              responsive
              customStyles={customStyles}
              selectableRows
              onSelectedRowsChange={({ selectedRows }) => setSelectedExpenses(selectedRows)}
              selectableRowHighlight
            />
          </TableWrapper>

    {/* sliding button for delete bulk list */}
          {selectedExpenses.length > 0 && (
          <SlideUpButton>
            <Button 
              btnColor={'red'} 
              btnOnClick={handleBulkDelete} 
              btnText= {isDeleting ? <ButtonLoader text="Deleting..." /> : `Delete Selected (${selectedExpenses.length})`} 
              disabled={isDeleting}>             
            </Button>
          </SlideUpButton>
        )}

    {/* modal to delete single items */}
          {showDeleteCard &&
                              <Overlay 
                                contentWidth={'30%'}
                                overlayButtonClick={()=>handleExpenseDelete(grabId)}
                                closeOverlayOnClick={()=>setShowDeleteCard(false)}
                                btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                              >
                                <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                                        Are you sure You want to delete the unit <b>{grabExpenseName} </b> 
                                  </p>
                              </Overlay>
                            }
            
      {/* modal for bulk delete */}
      {showBulkDeleteCard && (
      <Overlay
        contentWidth="30%"
        overlayButtonClick={confirmBulkDelete}
        closeOverlayOnClick={() => setShowBulkDeleteCard(false)}
        btnText1={isDeleting ? <ButtonLoader text={'Deleting...'} /> : 'Yes'}
      >
        <p style={{ margin: "40px", textAlign: "center", fontSize: "12px", lineHeight: "25px" }}>
          Are you sure you want to delete <b>{selectedExpenses.length}</b> selected expenses?
        </p>
      </Overlay>
    )}

    {/* Toast message user component */}
      <ToastComponents/>
    </Container>
  );
};

export default ExpensesTable;
