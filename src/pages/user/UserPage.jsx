
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import profileHolder from '../../images/placeholder_image.png'
import UserTable from '../../components/table/user_table/UserTable'
import { UserPageContent, UserPageWrapper } from './userPages.style'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import PageTitle from '../../components/page_title/PageTitle'




// import {DataTable} from 'react-data-table-component'


export default function UserPage() {
  
  const data = [
    {
      id: 1,
      imgUrl: profileHolder,
      name: 'Abdulmumin Isah',
      email: 'abdulmuminisah79@gmail.com',
      mobile: '09055001663',
      role: 'admin',
      address: "No 22, Back of Apostolic, Ajegule, Mpape, Abuja",
    },
  ];


  const[userRecords, setUserRecords] = useState(data);

  const handleChange = (e) => {
    let query = e.target.value;  
    const newRecords = data.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    setUserRecords(newRecords);
  }


  const navigate = useNavigate();
  return (
    <UserPageWrapper>
        <PageTitle title={'Users'}/>

        {/* content */}
        <UserPageContent>
          <ListHeader 
            title={'Add User'} 
            btnOnClick={()=>navigate('/add-user')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
          />
          
          {/* User Table */}
            <UserTable data={userRecords}/>
        </UserPageContent>

        
    </UserPageWrapper>
  )
}




