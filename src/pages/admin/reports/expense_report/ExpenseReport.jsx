
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../../components/page_title/PageTitle';
import ListHeader from '../../../../components/page_title/list_header/ListHeader';
import { FaPrint } from 'react-icons/fa';
import { AnyItemContainer } from '../../sale/Add/addSale.style';
import SelectInput from '../../../../components/input/selectInput/SelectInput';
import Input from '../../../../components/input/Input';
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style';
import Button from '../../../../components/clicks/button/Button';
import ItemContainer from '../../../../components/item_container/ItemContainer';
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader';
import SaleReportTable from '../../../../components/table/report_table/sale_report_table/SaleReportTable';
import JewelLogo from '../../../../images/logo1.png'
import { AddressWrapper, DateWrapper, ExpenseReportContent, ExpenseReportWrapper, Logo, LogoWrapper, ReportHeaderContent, ReportHeaderWrapper, SearchReportWrapper } from './expenseReport.style';
import ExpenseReportTable from '../../../../components/table/report_table/expense_report_table/ExenpenseReportTable';



export default function ExpenseReport() {

    const [isLoading, setIsLoading] = useState(false);

    // today date
    const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState(false)

    const [fromDate, setFromDate] = useState(todayDate)
    const [fromDateError, setFromDateError] = useState(false)

    const [toDate, setToDate] = useState(todayDate)
    const [toDateError, setToDateError] = useState(false)
    

    const onChangeHandler = (type, e)=>{
       if (type === 'from-date') {
            setFromDate(e.target.value)
            setFromDateError(false);
        }else if (type === 'to-date') {
            setToDate(e.target.value)
            setToDateError(false);
        }
    }


    const submitHandler = (e) => {
        e.preventDefault();

        let isValid = true;

        if(!fromDate){
            setFromDateError(true)
            isValid = false;
        }

        if(!toDate){
            setToDateError(true)
            isValid = false;
        }

        if(isValid){
            setIsLoading(true);
        }
    }



  const data = [
    {
      id: 1,
      date: '02-01-2021',
      paymentFor: 'Tea Break',
      paidAmount: 300,
      note: 'For 5 persons'
    }, 
    {
        id: 2,
        date: '02-01-2021',
        paymentFor: 'Tea Break',
        paidAmount: 300,
        note: 'For 5 persons'
    }, 

    {
        id: 3,
        date: '02-01-2021',
        code: 'SA1001',
        paymentFor: 'Tea Break',
        paidAmount: 300,
        note: 'For 5 persons'
    }, 
  ];



  const[records, setRecords] = useState(data);
  const handleChange = (e) => {
    let query = e.target.value;  
    const newRecords = data.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    setRecords(newRecords);
  }


  const navigate = useNavigate();

  return (
    <ExpenseReportWrapper>
        <PageTitle title={'Expense Report'}/>

        {/* Search Report */}
        <SearchReportWrapper>
            <form onSubmit={submitHandler}>
            <ItemContainer title={'Generate Report'}> 
                        
                        <AnyItemContainer>
                         {/* <SelectInput 
                            onChange={(e)=>onChangeHandler('name', e)} 
                            error={nameError} 
                            options={customerNames} 
                            label={'Customer'}
                            title={'Customer'}    
                        /> */}
                        
                        <Input 
                              value={fromDate} 
                              title={'From Date'}
                              onChange={(e)=>onChangeHandler('from-date', e)}  
                              type={'date'} 
                              error={fromDateError}
                              label={'From Date'} 
                            />  
                        <Input 
                              value={toDate} 
                              title={'To Date'}
                              onChange={(e)=>onChangeHandler('to-date', e)}  
                              type={'date'} 
                              error={toDateError}
                              label={'To Date'} 
                            />  
                        </AnyItemContainer>    
                            
                    
                            <ItemButtonWrapper btnAlign={'flex-start'}>
                            <Button
                                btnText={isLoading? <ButtonLoader text={'Generating...'}/> : 'Generate'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                        </ItemButtonWrapper>
                    </ItemContainer>          
            </form>
        </SearchReportWrapper>

        {/* content */}
        <ExpenseReportContent>

            
          <ListHeader 
            title={'print'} 
            btnOnClick={()=>{}}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
            icon={<FaPrint/>}
            inputDisplay={'none'}
          />
          
          <ReportHeaderWrapper>
                <ReportHeaderContent>
                    {/* Logo */}
                            <LogoWrapper>
                                <Logo>
                                   <div>
                                        <img src={JewelLogo} alt="" srcset="" />
                                    </div> 
                                </Logo>

                            <AddressWrapper>
                                <h4>Inventory</h4>
                                <span><b>Address:</b> Marpur, Ohaka Bangladesh</span>
                                <span><b>Phone:</b> 08135701458</span>
                                <span><b>Email:</b> abdulmuminiisah79@gmaiil.com</span>
                            </AddressWrapper>
                            </LogoWrapper>
                            {/* date */}
                            <DateWrapper>
                                <h3>EXPENSE REPORT</h3>  
                                <span>{name && `Report for ${name}`}</span>                       
                                <span>{fromDate}<b> To </b>{toDate}</span>                                   
                            </DateWrapper> 
        
                </ReportHeaderContent>
        </ReportHeaderWrapper>

          {/* Expense Report Table Result */}
            <ExpenseReportTable data={records}/>
        </ExpenseReportContent>        
    </ExpenseReportWrapper>
  )
}





