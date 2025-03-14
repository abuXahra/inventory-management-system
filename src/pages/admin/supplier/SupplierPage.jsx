
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { SupplierPageContent, SupplierPageWrapper } from './supplierPage.style'
import SupplierTable from '../../../components/table/supplier_table/Supplier'



export default function SupplierPage() {
  
  const data = [
    {
      id: 1,
      date: '02-01-2021',
      code: 'SU1001',
      name: 'Himeel Raw',
      mobile: '+2349055001663',
      email: 'himeelraw@gmail.com',
      taxNo: '15648618541',
      address: 'Dikhusa, CTG, BD',
    }, 
    {
        id: 2,
        date: '02-01-2021',
        code: 'SU1002',
        name: 'Hawawu Rabi',
        mobile: '+2349055001663',
        email: 'hawar@gmail.com',
        taxNo: '15648618541',
        address: 'Dutse, Alhaji, Abuja',
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
    <SupplierPageWrapper>
        <PageTitle title={'Supplier'}/>

        {/* content */}
        <SupplierPageContent>
          <ListHeader 
            title={'Add Supplier'} 
            btnOnClick={()=>navigate('/add-supplier')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
          />
          
          {/* Supplier Table */}
            <SupplierTable data={records}/>
        </SupplierPageContent>

        
    </SupplierPageWrapper>
  )
}




