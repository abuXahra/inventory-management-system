
import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { HomeSaleListWrapper } from './homeSale.style';
import TabeReusabComp from '../../TableReusabComp/TableReusabComp';
import { HomePurchaseListWrapper } from './homePurchaseList.style';
import { ProductItemList } from '../../../../data/productItems';
import axios from 'axios';



const HomePurchaseList = () => {
  

  const [data, setData] = useState([])
   const [isLoading, setIsLoading] = useState([])
  
     useEffect(() => {
                       const getPurchase = async () => { 
                       setIsLoading(true)  
                       try {
                        const res = await axios.get(process.env.REACT_APP_URL + "/api/purchase/")
                                
                                        setData(res.data)
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
        <TabeReusabComp productData={data} header={'Purchase Items'}/>
    </HomePurchaseListWrapper>
  );
};

export default HomePurchaseList;
