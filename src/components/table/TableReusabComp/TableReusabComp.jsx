import React from 'react'
import { Paper, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { TableReusableHeader, TableReusableWrapper } from './tableReusabComp.style'
import { TableStyled, TdStyled } from '../../../pages/admin/sale/Add/addSale.style'

export default function TabeReusabComp({productData, header, tableHeaderData}) {

  return (
        <TableReusableWrapper>
           <TableReusableWrapper>
                          <TableReusableHeader>
                              {header}
                          </TableReusableHeader>
              <TableStyled>
                  <thead>
                  
                      <TdStyled><b>#</b></TdStyled>
                      <TdStyled><b>Title</b></TdStyled>
                      <TdStyled><b>Category</b></TdStyled>
                      <TdStyled><b>Price</b></TdStyled>
                      <TdStyled><b>Quanty</b></TdStyled>
                      <TdStyled><b>Amount</b></TdStyled>
                 </thead>
                 <tbody>
                  {productData.map((data, i)=>(
                      <tr key={i}>
                              <TdStyled>{i+1}</TdStyled>
                              <TdStyled>{data.title}</TdStyled>
                              <TdStyled>{data.category}</TdStyled>
                              <TdStyled>{data.price}</TdStyled>
                              <TdStyled>{data.qty}</TdStyled>
                              <TdStyled>{data.qty + data.price }</TdStyled>
                      </tr>
                                      ))
                         }
                  </tbody>
              </TableStyled>
              </TableReusableWrapper> 
        </TableReusableWrapper>
  )
}
