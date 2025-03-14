
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import PaymentTable from '../../../components/table/payment_table/Payment'
import TaxTable from '../../../components/table/tax_table/TaxTable'
import { TaxPageContent, TaxPageWrapper } from './taxPage.style'


export default function TaxPage() {
  

  const data = [
    {
      id: 1,
      name: 'None',
      taxNumber: 0,
      status: 'ON'
    }, 
    {
      id: 2,
      name: 'TAX(5%)',
      taxNumber: 5,
      status: 'ON'
    }, 
    {
      id: 3,
      name: 'Vat+Tax(7%)',
      taxNumber: 7,
      status: 'ON'
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
    <TaxPageWrapper>
        <PageTitle title={'Tax'}/>

        {/* content */}
        <TaxPageContent>
          <ListHeader 
            title={'Add Tax'} 
            btnOnClick={()=>navigate('/add-tax')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
          />
          
          {/* Payment Table */}
            <TaxTable data={records}/>
        </TaxPageContent>
    </TaxPageWrapper>
  )
}




