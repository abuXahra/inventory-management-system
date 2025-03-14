
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import PaymentTable from '../../../components/table/payment_table/Payment'
import { PaymentPageContent, PaymentPageWrapper } from './paymentPage.style'


export default function PaymentPage() {
  

  const data = [
    {
      id: 1,
      date: '02-01-2020',
      paymentFor: 'PT1001',
      amount: 35000,
      paymentType: "Cash",
      note: 'Partial payment',
    }, 
    {
      id: 2,
      date: '02-01-2020',
      paymentFor: 'PC1001',
      amount: 35000,
      paymentType: "Transfer",
      note: 'Full payment',
    }, 
    {
      id: 3,
      date: '02-01-2020',
      paymentFor: 'SA1001',
      amount: 45000,
      paymentType: "Cash",
      note: 'Partial payment',
    }, 
  ];

  const[records, setRecords] = useState(data);
  const handleChange = (e) => {
    let query = e.target.value;  
    const newRecords = data.filter(item => item.paymentFor.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    setRecords(newRecords);
  }


  const navigate = useNavigate();
  return (
    <PaymentPageWrapper>
        <PageTitle title={'Payments'}/>

        {/* content */}
        <PaymentPageContent>
          <ListHeader 
            title={'Add Payment'} 
            btnOnClick={()=>navigate('/add-payments')}
            searQuery={'Payment For'}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
          />
          
          {/* Payment Table */}
            <PaymentTable data={records}/>
        </PaymentPageContent>
    </PaymentPageWrapper>
  )
}




