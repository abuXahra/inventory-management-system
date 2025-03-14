import React from 'react'

import TableReusabComp from '../TableReusabComp/TableReusabComp'
import { ProductItemList } from '../../../data/productItems'
import { AlertContentTableWrapper } from './alertContent.style'

export default function AlertContent() {

 const [productData, setProductData] = React.useState(ProductItemList)
  return (
    <AlertContentTableWrapper>
        <TableReusabComp productData={productData} header={'Alert Item'}/>
    </AlertContentTableWrapper>
  )
}
