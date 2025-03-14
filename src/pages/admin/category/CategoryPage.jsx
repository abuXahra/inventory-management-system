
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import ProductImage from '../../../images/necklace.jpeg'
import CategoryTable from '../../../components/table/category_table/CategoryTable'
import { CategoryPageContent, CategoryPageWrapper } from './categoryPage.style'


export default function CategoryPage() {
  
  const data = [
    {
      id: 1,
      code: 'CA1001',
      name: 'Necklace',
      note: 'Category of Necklace',
      status: 'on',
    }, 
    {
      id: 2,
      code: 'CA1002',
      name: 'Bungles',
      note: 'Category of Bungles',
      status: 'on',
    }, 
    {
      id: 3,
      code: 'CA1003',
      name: 'Wrist Watch',
      note: 'Category of Wrist Watch',
      status: 'on',
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
    <CategoryPageWrapper>
        <PageTitle title={'Categories'}/>

        {/* content */}
        <CategoryPageContent>
          <ListHeader 
            title={'Add Category'} 
            btnOnClick={()=>navigate('/add-category')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
          />
          
          {/* Product Table */}
            <CategoryTable data={records}/>
        </CategoryPageContent>

        
    </CategoryPageWrapper>
  )
}




