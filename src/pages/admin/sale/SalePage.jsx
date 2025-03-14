
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { SalePageContent, SalePageWrapper } from './salePage.style'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import SalesTable from '../../../components/table/sale_table/Sale'

// import {DataTable} from 'react-data-table-component'


export default function SalePage() {
  
  const data = [
    {
      id: 1,
      date: '02-01-2021',
      code: 'SA1001',
      name: 'Walk-in Customer',
      status: 'Received',
      grandTotal: '$300',
      paymentStatus: 'Paid',
    },    {
      id: 2,
      date: '02-01-2022',
      code: 'SA1002',
      name: 'Yusuf Abdulazeez',
      status: 'Pending',
      grandTotal: '$500',
      paymentStatus: 'Paid',
    },
    {
      id: 3,
      date: '02-01-2024',
      code: 'SA1008',
      name: 'Helen Nwaosu',
      status: 'Received',
      grandTotal: '$700',
      paymentStatus: 'Paid',
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
    <SalePageWrapper>
        <PageTitle title={'Sale'}/>

        {/* content */}
        <SalePageContent>
          <ListHeader 
            title={'Add Sale'} 
            btnOnClick={()=>navigate('/add-sale')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
          />
          
          {/* Sales Table */}
            <SalesTable data={records}/>
        </SalePageContent>

        
    </SalePageWrapper>
  )
}




