import React from 'react'
import { Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { TableReusableHeader, TableReusableWrapper } from './tableReusabComp.style'
import { TableStyled, TdStyled } from '../../../pages/admin/sale/Add/addSale.style'
import { FaLongArrowAltRight } from 'react-icons/fa'

export default function TabeReusabComp({productData, header, tableHeaderData}) {

  return (
        <TableReusableWrapper>
           <TableReusableWrapper>
                          <TableReusableHeader>
                              {header}
                              <span>View <FaLongArrowAltRight /></span>
                          </TableReusableHeader>
              <TableStyled>
                  <thead>
                  
                      <TdStyled><b>#</b></TdStyled>
                      <TdStyled><b>Title</b></TdStyled>
                      <TdStyled><b>Category</b></TdStyled>
                      <TdStyled><b>Price</b></TdStyled>
                      <TdStyled><b>Quantity</b></TdStyled>
                      <TdStyled><b>Amount</b></TdStyled>
                 </thead>
                 <tbody>
                  {productData.slice(0, 5).map((data, i)=>(
                      <tr key={data._id}>
                              <TdStyled>{i+1}</TdStyled>
                              <TdStyled>{data?.title}</TdStyled>
                              <TdStyled>{data.category.title}</TdStyled>
                              <TdStyled>{data.salePrice}</TdStyled>
                              <TdStyled>{data.stockQuantity}</TdStyled>
                              <TdStyled>{data.stockQuantity * data.salePrice }</TdStyled>
                      </tr>
                                      ))
                         }
                  </tbody>
              </TableStyled>
              </TableReusableWrapper> 
        </TableReusableWrapper>
  )
}
