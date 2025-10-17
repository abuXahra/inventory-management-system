
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { ProductPageContent, ProductPageWrapper } from './productPage.style'
import ProductTable from '../../components/table/product_table/Product'
import axios from 'axios'
import { List } from 'react-content-loader'


export default function ProductPage() {

   const [products, setProducts] = useState([]);
   const [allProducts, setAllProducts] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [company, setCompany] = useState('') 
   const token = localStorage.getItem('token');

   // fetch handler 
          useEffect(() => {

                   const fetchCompany = async () =>{
                          try {
                              const res =await axios.get(`${process.env.REACT_APP_URL}/api/company`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                              setCompany(res.data[0]);
                              console.log('company:\ln', res.data)
                          } catch (error) {
                              console.log(error)
                          }
                      }
                    fetchCompany()
                    
             const getProducts = async () => { 
             setIsLoading(true)  
             try {
                 const res = await axios.get(process.env.REACT_APP_URL + "/api/products", {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  })
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
                             await axios.delete(`${process.env.REACT_APP_URL}/api/products/${productId}`, {
                             headers: {
                                  Authorization: `Bearer ${token}`
                                }
                              });
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
                currencySymbol={company?.currencySymbol}
            />
        </ProductPageContent>
} 
    </ProductPageWrapper>
  )
}




