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
import { FaTrash } from 'react-icons/fa'
import { EditExpenseContent, EditExpenseWrapper } from './editExpense.style'


export default function EditExpenses() {

// Payment for
const [itemList, setItemList] = useState([])

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

    // date
    const [date, setDate] = useState('2025-04-25');
    const [dateError, setDateError] = useState(false);

// payment for
    const [expenseFor, setExpenseFor] = useState('Laptop');
    const [expenseForError, setExpenseForError] = useState(false);


    // payable amount
    const [amount, setAmount] = useState(50000)
    const [amountError, setAmountError] = useState(false);

    // note
    const [note, setNote] = useState('50 pieces')
       
    

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
            alert('updated');
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
    <EditExpenseWrapper>
    {/* Page title */}
        <PageTitle title={'Expense'} subTitle={'/ Add'}/>

        <EditExpenseContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Edit Expense'}>
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
                                btnColor={'green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={()=>{}}
                            />
                            </div>
                        </ItemButtonWrapper>


                    </ItemContainer>
                </form>

        </EditExpenseContent>
    </EditExpenseWrapper>
  )
}


