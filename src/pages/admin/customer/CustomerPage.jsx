
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { useNavigate } from 'react-router-dom'
import { CustomerPageContent, CustomerPageWrapper } from './customerPage.style'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import CustomerTable from '../../../components/table/customer_table/CustomerTable'




// import {DataTable} from 'react-data-table-component'


export default function CustomerPage() {
  
  const data = [
    {
      id: 1,
      code: 'CU1001',
      name: 'Mack Tyson',
      mobile: '09055001663',
      email: 'abdulmuminisah79@gmail.com',
      taxNumber: "54545545",
      address: "No 22, Back of Apostolic, Ajegule, Mpape, Abuja",
      status: "ON"
    },      {
        id: 2,
        code: 'CU1001',
        name: 'Mack Tyson',
        mobile: '09055001663',
        email: 'abdulmuminisah79@gmail.com',
        taxNumber: "54545545",
        address: "No 22, Back of Apostolic, Ajegule, Mpape, Abuja",
        status: "ON"
      }, 
      {
        id: 3,
        code: 'CU1001',
        name: 'Mack Tyson',
        mobile: '09055001663',
        email: 'abdulmuminisah79@gmail.com',
        taxNumber: "54545545",
        address: "No 22, Back of Apostolic, Ajegule, Mpape, Abuja",
        status: "ON"
      }, 
  ];


  const[customerRecords, setCustomerRecords] = useState(data);

  const handleChange = (e) => {
    let query = e.target.value;  
    const newRecords = data.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    setCustomerRecords(newRecords);
  }


  const navigate = useNavigate();
  return (
    <CustomerPageWrapper>
        <PageTitle title={'Customer'}/>

        {/* content */}
        <CustomerPageContent>
          <ListHeader 
            title={'Add Customer'} 
            btnOnClick={()=>navigate('/add-customer')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
          />
          
          {/* Sales Table */}
            <CustomerTable data={customerRecords}/>
        </CustomerPageContent>

        
    </CustomerPageWrapper>
  )
}




