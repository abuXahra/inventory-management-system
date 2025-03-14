




import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AddressWrapper, AnyItemContaineri, DateWrapper, Logo, LogoDateWrapper, LogoWrapper, ReportHeaderContent, ReportHeaderWrapper, SalesReportContent, SalesReportWrapper, SearchReportWrapper, SearchResultWrapper } from './salesReport.style'
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



export default function SalesReport() {


    const customerNames =[
        {
            title: "Select",
            value: ""
        },
        {
            title: "Isah Abdulmumin",
            value: "Isah Abdulummin"
        },
        {
            title: "Fatimah Onyiohu Idris",
            value: "Fatimah Onyiohu-Idris",
        },
        {
            title: "Isah Toyib",
            value: "Isah Toyib",
        }
    ]


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
        if (type === 'name') {
            setName(e.target.value)
            setNameError(false);
        }else if (type === 'from-date') {
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

        if(!name){
            setNameError(true)
            isValid = false;
        }

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
      code: 'SA1001',
      name: 'Isah Abdulmumin',
      mobile: '+2349055001663',
      totalAmount: 300,
      paidAmount: 300,
      paymentStatus: 'paid'
    }, 
    {
        id: 2,
        date: '02-01-2021',
        code: 'SA1001',
        name: 'Isah Abdulmumin',
        totalAmount: 300,
        paidAmount: 300,
        paymentStatus: 'Paid'
    }, 

    {
        id: 3,
        date: '02-01-2021',
        code: 'SA1001',
        name: 'Isah Abdulmumin',
        totalAmount: 300,
        paidAmount: 300,
        paymentStatus: 'Pending'
    }, 
    {
        id: 4,
        date: '02-01-2021',
        code: 'SA1001',
        name: 'Isah Abdulmumin',
        totalAmount: 300,
        paidAmount: 300,
        paymentStatus: 'Unpaid'
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
    <SalesReportWrapper>
        <PageTitle title={'Sales Report'}/>

        {/* Search Report */}
        <SearchReportWrapper>
            <form onSubmit={submitHandler}>
            <ItemContainer title={'Generate Report'}> 
                        
                        <AnyItemContainer>
                         <SelectInput 
                            onChange={(e)=>onChangeHandler('name', e)} 
                            error={nameError} 
                            options={customerNames} 
                            label={'Customer'}
                            title={'Customer'}    
                        />
                        
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
        <SalesReportContent>

            
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
                                <h3>SALES REPORT</h3>  
                                <span>{name && `Report for ${name}`}</span>                       
                                <span>{fromDate}<b> To </b>{toDate}</span>                                   
                            </DateWrapper> 
        
                </ReportHeaderContent>
        </ReportHeaderWrapper>

          {/* Sales Report Table Result */}
            <SaleReportTable data={records}/>
        </SalesReportContent>        
    </SalesReportWrapper>
  )
}







// BREAK TITLE INTO TWO LINE IF ITS TOO LONG 
// import React, { useState } from 'react'
// import PageTitle from '../../../components/page_title/PageTitle'
// import { FaArrowRight } from 'react-icons/fa'
// import { ArrowWrapper, ItemDetails, ItemIcon, ItemTitleStyle, ItemWrapper, ReportsPageContent, ReportsPageWrapper } from './reportsPage.style'
// import { PiInvoiceBold } from 'react-icons/pi'
// import { ReportItemList } from '../../../data/ReportItems'
// import { useNavigate } from 'react-router-dom'


// export default function ReportsPage() {
// const navigate =  useNavigate();
//   return (
//     <ReportsPageWrapper>
//     {/* Page title */}
//         <PageTitle title={'Reports'}/>

//         <ReportsPageContent>

//         { ReportItemList.map((data, i)=>(
//             <ItemWrapper bg={data.bg}>
//             <ItemTitleStyle><h3>{data.title}</h3></ItemTitleStyle> 
//                 <ItemIcon>{data.icon}</ItemIcon>
//                 <ItemDetails onClick={()=> navigate(`/${data.url}`)}>
//                     <span>Details Here</span>
//                     <ArrowWrapper>
//                         <FaArrowRight/>
//                     </ArrowWrapper>
//                 </ItemDetails>
//             </ItemWrapper>
//         ))
//         }
//         </ReportsPageContent>
//     </ReportsPageWrapper>
//   )
// }


