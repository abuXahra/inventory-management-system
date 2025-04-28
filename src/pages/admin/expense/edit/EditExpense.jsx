import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import Input from '../../../../components/input/Input'
import SelectInput from '../../../../components/input/selectInput/SelectInput'
import TextArea from '../../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import Button from '../../../../components/clicks/button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AnyItemContainer, ItemListContent, TableStyled, TdStyled } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'
import { EditExpenseContent, EditExpenseWrapper } from './editExpense.style'
import axios from 'axios'
import { toast } from 'react-toastify'
import { List } from 'react-content-loader'


export default function EditExpenses() {

     const {expenseId} = useParams();

     // Payment for
const [itemList, setItemList] = useState([])

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
     const [isBtnLoading, setIsBtnLoading] = useState(false);


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

    
    // fetch expense data
    useEffect(()=>{
        const getUnit = async () =>{
            setIsLoading(true)
            try {
                const res = await axios.get(process.env.REACT_APP_URL+'/api/expense/'+ expenseId);
                console.log(res.data);
                setDate(res.data.expenseDate)
                setExpenseFor(res.data.expenseFor)
                setAmount(res.data.amount)
                setNote(res.data.note)
                setIsLoading(false)
    
            } catch (error) {
                console.log(error);
                setIsLoading(false)
            }
        }
        getUnit();
    }, [expenseId]);
    

// hand sumbit button
    const submitHandler = async (e) => {
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

          const updatedExpense = {
              expenseDate: date,  
              expenseFor: expenseFor, 
              amount: amount,
              note: note
            }

            setIsLoading(true)
    
            try {

                const res= await axios.put(process.env.REACT_APP_URL+"/api/expense/"+expenseId, updatedExpense);
                console.log(res.data)
                if(res.success){
                    toast.success(res.data.message)
                }
                
            } catch (error) {
                toast.error(error.data.message)
            }
        }
    }



  return (
    <EditExpenseWrapper>
    {/* Page title */}
        <PageTitle title={'Expense'} subTitle={'/ Add'}/>

   <>
        {isLoading? <List/> :
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

        </EditExpenseContent>}</>
    </EditExpenseWrapper>
  )
}


