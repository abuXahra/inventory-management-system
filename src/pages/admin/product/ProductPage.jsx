
import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { ProductPageContent, ProductPageWrapper } from './productPage.style'
import ProductTable from '../../../components/table/product_table/Product'
import ProductImage from '../../../images/necklace.jpeg'
import axios from 'axios'
import { List } from 'react-content-loader'


export default function ProductPage() {

   const [products, setProducts] = useState([]);
   const [allProducts, setAllProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   // fetch handler 
          useEffect(() => {
             const getProducts = async () => { 
             setIsLoading(true)  
             try {
                 const res = await axios.get(process.env.REACT_APP_URL + "/api/products")
                 console.log(res.data)
                 setProducts(res.data)
                 setAllProducts(res.data);
                 setIsLoading(false)
                 
                 console.log(res.data)
             } catch (err) {
                 console.log(err)
                 setIsLoading(false)
                 }
               }
               
             getProducts();
             
           }, [])
       
   

           
            // handle  delete
              const deleteProduct = async (productId,  updatedList = null) => {
                           
                           if (updatedList) {
                             setProducts(updatedList);
                             return { success: true };
                           }
                           
                           try {
                             await axios.delete(`${process.env.REACT_APP_URL}/api/products/${productId}`);
                             const updatedProduct = products.filter(products => products._id !== productId);
                             setProducts(updatedProduct);
                             return { success: true };
                           } catch (error) {
                             return { success: false, message: error.message };
                           }
                         };           
          

                // handle search query
                const handleSearchQueryOnChange = (e) => {
                  let query = e.target.value;
                  //  if query is empty, reset to all record
                  if(query === ''){
                    setProducts(allProducts);
                  }else{
                    // Filter records based on query
                    const filterRecords = allProducts.filter(item =>
                      item.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                    );
                    setProducts(filterRecords)
                  }
                }
                    
           
  
  // const data = [
  //   {
  //     id: 1,
  //     imgUrl: ProductImage,
  //     code: 'PT1001',
  //     name: 'Nivea Men',
  //     category: 'Necklace',
  //     sku: '56422',
  //     stock: "100",
  //     unit: "Piece",
  //     price: 35000,
  //     alertQty: '10',
  //     status: 'available',
  //   }, 
  //   {
  //     id: 2,
  //     imgUrl: ProductImage,
  //     code: 'PT1001',
  //     name: 'Nivea Men',
  //     category: 'Necklace',
  //     sku: '56422',
  //     stock: "100",
  //     unit: "Piece",
  //     price: 35000,
  //     alertQty: '10',
  //     status: 'available',
  //   }, 
  //   {
  //     id: 3,
  //     imgUrl: ProductImage,
  //     code: 'PT1001',
  //     name: 'Nivea Men',
  //     category: 'Necklace',
  //     sku: '56422',
  //     stock: "100",
  //     unit: "Piece",
  //     price: 35000,
  //     alertQty: '10',
  //     status: 'available',
  //   }, 
  // ];

  // const[records, setRecords] = useState(data);
  // const handleChange = (e) => {
  //   let query = e.target.value;  
  //   const newRecords = data.filter(item => item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  //   setRecords(newRecords);
  // }


  const navigate = useNavigate();
  return (
    <ProductPageWrapper>
        <PageTitle title={'Products'}/>

        {/* content */}
           {isLoading? <List/> :
        <ProductPageContent>
          <ListHeader 
            title={'Add Product'} 
            btnOnClick={()=>navigate('/add-product')}
            searQuery={'Name'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={products.length}
          />
          
          {/* Product Table */}
            <ProductTable 
                data={products}
                onDeleteProd = {deleteProduct}
            />
        </ProductPageContent>
} 
    </ProductPageWrapper>
  )
}




