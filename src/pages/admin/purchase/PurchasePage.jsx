
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { PurchasePageContent, PurchasePageWrapper } from './purchasePage.style'
import PurchaseTable from '../../../components/table/purchase_table/Purchase'



export default function PurchasePage() {
  
  const data = [
    {
      id: 1,
      date: '02-01-2021',
      code: 'SA1001',
      supplierName: 'Walk-in Customer',
      status: 'Received',
      grandTotal: '$300',
      paymentStatus: 'Paid',
    },    {
      id: 2,
      date: '02-01-2022',
      code: 'SA1002',
      supplierName: 'Yusuf Abdulazeez',
      status: 'Pending',
      grandTotal: '$500',
      paymentStatus: 'Paid',
    },
    {
      id: 3,
      date: '02-01-2024',
      code: 'SA1008',
      supplierName: 'Helen Nwaosu',
      status: 'Received',
      grandTotal: '$700',
      paymentStatus: 'Paid',
    },
  ];

  const[records, setRecords] = useState(data);
  const handleChange = (e) => {
    let query = e.target.value;  
    const newRecords = data.filter(item => item.supplierName.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    setRecords(newRecords);
  }


  const navigate = useNavigate();
  return (
    <PurchasePageWrapper>
        <PageTitle title={'Purchase'}/>

        {/* content */}
        <PurchasePageContent>
          <ListHeader 
            title={'Purchase'} 
            btnOnClick={()=>navigate('/add-purchase')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
          />
          
          {/* Purchase Table */}
            <PurchaseTable data={records}/>
        </PurchasePageContent>

        
    </PurchasePageWrapper>
  )
}




