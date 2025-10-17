import React, {useState, useEffect} from 'react'

import TableReusabComp from '../TableReusabComp/TableReusabComp'
import { ProductItemList } from '../../../data/productItems'
import { AlertContentTableWrapper } from './alertContent.style'
import axios from 'axios'
import { token } from '../../context/UserToken'

export default function AlertContent() {

 const [productData, setProductData] = useState([])
 const [isLoading, setIsLoading] = useState(false)

  const getProducts = async () => {
    setIsLoading(true);
    try {
      // Fetch only products with stockQuantity <= quantityAlert
      const res = await axios.get(process.env.REACT_APP_URL + "/api/products/low-stock", {
                                                                            headers: {
                                                                              Authorization: `Bearer ${token}`
                                                                            }
                                                                      }) 
      console.log('low stocks: \n', res.data)
      setProductData(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  // Call getProducts once component mounts
  useEffect(() => {
    getProducts();
  }, []);

              

  return (
    <AlertContentTableWrapper>
        <TableReusabComp isLoading={isLoading} productData={productData} header={'Low Stock Items'}/>
    </AlertContentTableWrapper>
  )
}
