
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { UnitsPageContent, UnitsPageWrapper } from './unitsPage.style'
import UnitsTable from '../../../components/table/units_table/UnitsTable'


export default function UnitsPage() {
  

  const data = [
    {
      id: 1,
      name: 'Pieces',
      note: 'Unit of Piece',
      status: 'ON'
    }, 
    {
      id: 2,
      name: 'Carton',
      note: 'Unit of Carton',
      status: 'OFF'
    }, 
    {
      id: 3,
      name: 'Box',
      note: 'Unit of Box',
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
    <UnitsPageWrapper>
        <PageTitle title={'Units'}/>

        {/* content */}
        <UnitsPageContent>
          <ListHeader 
            title={'Add Units'} 
            btnOnClick={()=>navigate('/add-units')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
          />
          
          {/* Payment Table */}
            <UnitsTable data={records}/>
        </UnitsPageContent>
    </UnitsPageWrapper>
  )
}




