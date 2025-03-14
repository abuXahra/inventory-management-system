import React, { useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import Input from '../../../../components/input/Input'
import SelectInput from '../../../../components/input/selectInput/SelectInput'
import TextArea from '../../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import Button from '../../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { EditPaymentContent, EditPaymentWrapper } from '../../payment/edit/EditPayment.style'

export default function EditPayment() {


// Payment For
const paymentForItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'SA1001',
        value: 'SA1001'
    },
    {
        title: 'SA1002',
        value: 'SA1002'
    },
    {
        title: 'PCA1001',
        value: 'PCA1001'
    },
    {
        title: 'PCA1002',
        value: 'PCA1002'
    },
]



const paymentTypeItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'Cash',
        value: 'Cash'
    },
    {
        title: 'Transfer',
        value: 'Transfer'
    },
    {
        title: 'Check-payment',
        value: 'Check-payment'
    },
]


    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    
    // Date 2025-02-04 (year-month-day) 
    const [date, setDate] = useState('2025-02-20');
    const [dateError, setDateError] = useState(false);

    // Payment For
    const [paymentFor, setPaymentFor] = useState(paymentForItems[1].value);
    console.log('==========================\n', paymentForItems[1].value, '==========================\n');
    const [paymentForError, setPaymentForError] = useState(false);

    // Invoice No.
    const [invoiceNo, setInvoiceNo] = useState(paymentForItems[1].value);
    const [invoiceNoError, setInvoiceNoError] = useState(false);

    // Due Amount
    const [dueAmount, setDueAmount] = useState('35000');
    const [dueAmountError, setDueAmountError] = useState(false);

  
    // Payment Type
    const [paymentType, setPaymentType] = useState(paymentTypeItems[1].value)
    const [paymentTypeError, setPaymentTypeError] = useState(false);


    // Payable amount
    const [payableAmount, setPayableAmount] = useState('35000')
    const [payableAmountError, setPayableAmountError] = useState(false);


    // Note
    const [note, setNote] = useState('Full Payment')
       
    
    const handleChange = (type, e) =>{
        if(type === 'date'){
            setDate(e.target.value);
            setDateError(false);
        }else if(type === 'payment-for'){
            setPaymentFor(e.target.value);
            setInvoiceNo(e.target.value)
            setPaymentForError(false);
        }else if(type === 'due-amount'){
            setDueAmount(e.target.value);
            setDueAmountError(false);
        }else if(type === 'payment-type'){
            setPaymentType(e.target.value);
            setPaymentTypeError(false);
        }else if(type === 'payable-amount'){
            setPayableAmount(e.target.value);
            setPayableAmountError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
        }
    }


        // { 
            // else if(type === 'invoice')
            // setInvoiceNo(e.target.value)
            // setInvoiceNoError(false)
        // } 


    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = true;

        if(!date){
            setDateError(true);
            isValid = false;
        }

        if(!paymentFor){
            setPaymentForError(true);
            isValid = false;
        }

        if(!invoiceNo){
            setInvoiceNoError(true);
            isValid = false;
        }

        
        if(!dueAmount){
            setDueAmountError(true);
            isValid = false;
        }

        if(!paymentType){
            setPaymentTypeError(true);
            isValid = false;
        }

      
        if(!payableAmount){
            setPayableAmountError(true);
            isValid = false;
        }

        if(isValid){
            setIsLoading(true)
            navigate(`/payments`)
        }
    }

  return (
    <EditPaymentWrapper>
    {/* Page title */}
        <PageTitle title={'Payment'} subTitle={'/ Edit'}/>

        <EditPaymentContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Edit Payment'}>
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

                            {/* Payment for */}
                            <SelectInput 
                                onChange={(e)=>handleChange('payment-for', e)} 
                                error={paymentForError} 
                                options={paymentForItems} 
                                label={'Payment For'}
                                title={'Payment For'}
                                value={paymentFor}
                            />
                      
                        {/* Invoice Number */}
                            <Input 
                                value={invoiceNo} 
                                title={'Invoice No'}
                                // onChange={(e)=>handleChange('due-amount', e)}  
                                type={'text'} 
                                label={'Invoice No.'} 
                            />     </AnyItemContainer>

                        <AnyItemContainer justifyContent={'space-between'}>
                            
                            {/* Due Amount */}
                            <Input 
                                value={dueAmount} 
                                title={'Due Amount (N)'}
                                onChange={(e)=>handleChange('due-amount', e)}  
                                type={'text'} 
                                label={'Due Amount'} 
                            />

                             {/* Payment Type */}
                             <SelectInput 
                                onChange={(e)=>handleChange('payment-type', e)} 
                                error={paymentTypeError} 
                                options={paymentTypeItems} 
                                label={'Payment Type'}
                                title={'Payment Type'}
                                value={paymentType}
                            />
                      
                           {/* Payable Amount ($) */}
                           <Input 
                                value={payableAmount} 
                                title={'Payable Amount'}
                                onChange={(e)=>handleChange('payable-amount', e)} 
                                error={payableAmountError} 
                                type={'text'} 
                                label={'Payable Amount'} 
                            />
      
                        </AnyItemContainer>
                       
                        <AnyItemContainer justifyContent={'space-between'}>
                        {/* note */}
                            <TextArea  
                                label={'Note'}
                                title={'Note'}
                                onChange={(e)=> handleChange('note', e)}
                                value={note}
                            ></TextArea>                             
                            {/* profile picture */}
                        </AnyItemContainer>
                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Update Payment'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditPaymentContent>
    </EditPaymentWrapper>
  )
}

