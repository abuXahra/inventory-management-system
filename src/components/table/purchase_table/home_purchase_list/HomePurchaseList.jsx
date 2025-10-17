
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { HomeSaleListWrapper } from './homeSale.style';
import TabeReusabComp from '../../TableReusabComp/TableReusabComp';
import { HomePurchaseListWrapper } from './homePurchaseList.style';
import { ProductItemList } from '../../../../data/productItems';
import axios from 'axios';
import HomePurchaseTable from './home_purchase_table/HomePurchaseTable';
import { token } from '../../../context/UserToken';



const HomePurchaseList = () => {


  const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState([])
  
     useEffect(() => {
                       const getPurchase = async () => { 
                       setIsLoading(true)  
                       try {
                        const res = await axios.get(process.env.REACT_APP_URL + "/api/sale/", {
                                                                                    headers: {
                                                                                      Authorization: `Bearer ${token}`
                                                                                    }
                                                                              }) 
                        // Sort by saleAmount descending
                        const sortedData = res.data.sort((a, b) => b.saleAmount - a.saleAmount);
                                
                                        setData(sortedData)
                                        setIsLoading(false)
                      
                                        console.log(res.data)
                                    } catch (err) {
                                        console.log(err)
                                        setIsLoading(false)
                                    }
                                }
                                getPurchase();
                            }, [])
  
  return (
    <HomePurchaseListWrapper>
        <HomePurchaseTable productData={data} header={'Sale Items'} isLoading={isLoading}/>
    </HomePurchaseListWrapper>
  );
};

export default HomePurchaseList;



