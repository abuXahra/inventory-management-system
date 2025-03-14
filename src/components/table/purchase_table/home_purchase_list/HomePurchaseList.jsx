
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { HomeSaleListWrapper } from './homeSale.style';
import TabeReusabComp from '../../TableReusabComp/TableReusabComp';
import { HomePurchaseListWrapper } from './homePurchaseList.style';
import { ProductItemList } from '../../../../data/productItems';



const HomePurchaseList = () => {
  

  const [data, setData] = useState(ProductItemList) 

  return (
    <HomePurchaseListWrapper>
        <TabeReusabComp productData={data} header={'Purchase'}/>
    </HomePurchaseListWrapper>
  );
};

export default HomePurchaseList;
