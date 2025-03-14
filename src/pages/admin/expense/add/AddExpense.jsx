import React, { useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import Input from '../../../../components/input/Input'
import SelectInput from '../../../../components/input/selectInput/SelectInput'
import TextArea from '../../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import Button from '../../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer, ItemListContent, TableStyled, TdStyled } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { AddExpenseContent, AddExpenseWrapper } from './addExpense.style'
import { FaTrash } from 'react-icons/fa'


export default function AddExpenses() {

// Payment for
const [itemList, setItemList] = useState([])

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

    // date
    const [date, setDate] = useState(todayDate);
    const [dateError, setDateError] = useState(false);

// payment for
    const [expenseFor, setExpenseFor] = useState('');
    const [expenseForError, setExpenseForError] = useState(false);


    // payable amount
    const [amount, setAmount] = useState('')
    const [amountError, setAmountError] = useState(false);

    // note
    const [note, setNote] = useState('')
       
    

    const handleChange = (type, e) =>{
        if(type === 'date'){
            setDate(e.target.value);
            setDateError(false);
        }else if(type === 'expense'){
            setExpenseFor(e.target.value);
            setExpenseForError(false);
        }else if(type === 'amount'){
            setAmount(e.target.value);
            setAmountError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
        }
    }

    // add item to list
    const addToList = ()=>{
        const newItem = {date, expenseFor, amount, note};
        setItemList((prevItems)=>[...prevItems, newItem]);
    
        // clear form after adding
        setDate(todayDate);
        setExpenseFor('')
        setAmount('')
        setNote('')
    
    }


      // delete item from list
      const deleteItem = (index) => {
        const updatedList =  itemList.filter((_, i) => i !== index);
        setItemList(updatedList)
      }


    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = true;

        if(!date){
            setDateError(true);
            isValid = false;
        }

        if(!expenseFor){
            setExpenseForError(true);
            isValid = false;
        }

        if(!amount){
            setAmountError(true);
            isValid = false;
        }

        
        if(isValid){
            setIsLoading(true)
            addToList()
            setIsLoading(false);
        }
    }


// POST TO DB
    // const postItemsToAPI = async () => {
    //     try {
    //       setIsLoading(true);
    //       // Replace with your API endpoint
    //       const response = await fetch('/api/expenses', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ items: itemList }),
    //       });
    //       if (response.ok) {
    //         // Handle successful API response
    //         console.log('Items added successfully!');
    //         // Optionally redirect or reset
    //         navigate('/expenses'); // Example redirect
    //       } else {
    //         // Handle API error
    //         console.error('Error posting items');
    //       }
    //     } catch (error) {
    //       console.error('Error posting items to API:', error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
  return (
    <AddExpenseWrapper>
    {/* Page title */}
        <PageTitle title={'Expense'} subTitle={'/ Add'}/>

        <AddExpenseContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New Expense'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* date */}
                            <Input 
                                value={date} 
                                title={'Date'}
                                onChange={(e)=>handleChange('date', e)} 
                                error={dateError} 
                                type={'date'} 
                                label={'Date'} 
                            />


                      
                      {/* Invoice Number */}
                            <Input 
                                value={expenseFor} 
                                title={'Expenses For'}
                                onChange={(e)=>handleChange('expense', e)}  
                                type={'text'} 
                                error={expenseForError}
                                label={'Expenses For'} 
                            />     
                        {/* Due Amount */}
                            <Input 
                                value={amount} 
                                title={'Amount'}
                                onChange={(e)=>handleChange('amount', e)}  
                                type={'text'} 
                                label={'Amount'} 
                                error={amountError}
                            />
                        </AnyItemContainer>
                       
                        <AnyItemContainer justifyContent={'space-between'}>
                        {/* note */}
                            <TextArea  
                                label={'Note'}
                                title={'Note'}
                                onChange={(e)=> handleChange('note', e)}
                                value={note}
                            ></TextArea>                             {/* profile picture */}
                        </AnyItemContainer>
                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={'Add List'}
                                btnFontSize={'12px'}
                                btnColor={'grey'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={()=>{}}
                            />
                            </div>
                        </ItemButtonWrapper>


                    </ItemContainer>
                </form>

                              {/* Expense */}
                          { itemList.length > 0 
                          ? ( <ItemListContent>
                                <ItemContainer title={'Expense List'}>
                                <TableStyled>
                                    <thead>
                                        <TdStyled><b>#</b></TdStyled>
                                        <TdStyled><b>Date</b></TdStyled>
                                        <TdStyled><b>For</b></TdStyled>
                                        <TdStyled><b>Amount</b></TdStyled>
                                        <TdStyled><b>Note</b></TdStyled>
                                        <TdStyled><b>Action</b></TdStyled>
                                    </thead>
                                    <tbody>
                                    {itemList.map((data, i)=>(
                                        <tr key={i}>
                                            <TdStyled>{i+1}</TdStyled>
                                            <TdStyled>{data.date}</TdStyled>
                                            <TdStyled>{data.expenseFor}</TdStyled>
                                            <TdStyled>{data.amount}</TdStyled>
                                            <TdStyled>{data.note}</TdStyled>
                                            <TdStyled><span onClick={()=>deleteItem(i)}><FaTrash/></span></TdStyled>
                                        </tr>
                                    ))
                                }
                                    </tbody>
                                </TableStyled>
                                <div>
                                   <Button
                                    title={'Select Items'}
                                    btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add Expense'}
                                    btnFontSize={'12px'}
                                    btnColor={'green'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                />
                                </div>
 
                                </ItemContainer>
                            </ItemListContent>
                                ):(<></>)}
                        
        </AddExpenseContent>
    </AddExpenseWrapper>
  )
}





// BACKEND ENDPOINT
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // In-memory data (you can replace it with a database)
// let expenses = [
//   { id: 1, date: '02-01-2020', expenseFor: 'Office Launch', amount: '320', note: '5 persons' },
//   { id: 2, date: '02-02-2020', expenseFor: 'Tea Break', amount: '100', note: '5 persons' },
// ];

// // Route to get all expenses
// app.get('/api/expenses', (req, res) => {
//   res.json(expenses);
// });

// // Route to add a new expense
// app.post('/api/expenses', (req, res) => {
//   const { items } = req.body;

//   if (!items || !Array.isArray(items)) {
//     return res.status(400).json({ error: 'Invalid items format' });
//   }

//   // Add each item in the list
//   items.forEach((item) => {
//     const newItem = {
//       id: expenses.length + 1, // Simple ID generation
//       date: item.date,
//       expenseFor: item.expenseFor,
//       amount: item.amount,
//       note: item.note,
//     };
//     expenses.push(newItem);
//   });

//   res.status(201).json({ message: 'Expenses added successfully', expenses });
// });

// // Route to delete an expense
// app.delete('/api/expenses/:id', (req, res) => {
//   const expenseId = parseInt(req.params.id);
//   expenses = expenses.filter((expense) => expense.id !== expenseId);
//   res.json({ message: 'Expense deleted successfully' });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
