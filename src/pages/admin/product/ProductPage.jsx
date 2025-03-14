
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { ProductPageContent, ProductPageWrapper } from './productPage.style'
import ProductTable from '../../../components/table/product_table/Product'
import ProductImage from '../../../images/necklace.jpeg'


export default function ProductPage() {
  
  const data = [
    {
      id: 1,
      imgUrl: ProductImage,
      code: 'PT1001',
      name: 'Nivea Men',
      category: 'Necklace',
      sku: '56422',
      stock: "100",
      unit: "Piece",
      price: 35000,
      alertQty: '10',
      status: 'available',
    }, 
    {
      id: 2,
      imgUrl: ProductImage,
      code: 'PT1001',
      name: 'Nivea Men',
      category: 'Necklace',
      sku: '56422',
      stock: "100",
      unit: "Piece",
      price: 35000,
      alertQty: '10',
      status: 'available',
    }, 
    {
      id: 3,
      imgUrl: ProductImage,
      code: 'PT1001',
      name: 'Nivea Men',
      category: 'Necklace',
      sku: '56422',
      stock: "100",
      unit: "Piece",
      price: 35000,
      alertQty: '10',
      status: 'available',
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
    <ProductPageWrapper>
        <PageTitle title={'Products'}/>

        {/* content */}
        <ProductPageContent>
          <ListHeader 
            title={'Add Product'} 
            btnOnClick={()=>navigate('/add-product')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
          />
          
          {/* Product Table */}
            <ProductTable data={records}/>
        </ProductPageContent>

        
    </ProductPageWrapper>
  )
}




