import React, { useEffect, useState } from 'react'
import { TableReusableHeader, TableReusableWrapper } from '../../../TableReusabComp/tableReusabComp.style';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { TableStyled, TdStyled } from '../../../../../pages/sale/Add/addSale.style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const HomePurchaseTable = ({productData, header, tableHeaderData, isLoading}) => {


     const navigate = useNavigate();
     const token = localStorage.getItem('token');
      // fetching currency from db
      const [currencySymbol, setCurrencySymbol] =  useState('');
        useEffect(()=>{
            const fetchAllCompany = async() =>{
                try {
                    const res = await axios.get(`${process.env.REACT_APP_URL}/api/company` , {
                                    headers: {
                                      Authorization: `Bearer ${token}`
                                    }
                              });
                    setCurrencySymbol(res.data[0]?.currencySymbol)
                } catch (error) {
                  console.log(error)
                }
            }
            fetchAllCompany();
          },[]);
  return (
        <TableReusableWrapper>
           <TableReusableWrapper>
                          <TableReusableHeader>
                              {header}
                              <span onClick={()=>navigate('/sales')}>View Sales <FaLongArrowAltRight /></span>
                          </TableReusableHeader>
          {isLoading ? (
                    <div style={{height: "250px", width: "100%", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                        <p>Loading</p>
                    </div>
                    ) : (  
              <TableStyled>
                  <thead>
                  
                      <TdStyled><b>Date</b></TdStyled>
                      {/* <TdStyled><b>Code</b></TdStyled> */}
                      <TdStyled><b>Customer</b></TdStyled>
                      {/* <TdStyled><b>Status</b></TdStyled> */}
                      <TdStyled><b>Amount</b></TdStyled>
                 </thead>
                 <tbody>
                  {productData.slice(0, 5).map((data, i)=>(
                      <tr key={data?._id}>
                              <TdStyled>{data.saleDate && new Date(data.saleDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                })}</TdStyled>
                              {/* <TdStyled>{data?.code}</TdStyled> */}
                              <TdStyled>{data.customer?.name}</TdStyled>
                              {/* <TdStyled>{data?.saleStatus}</TdStyled> */}
                              <TdStyled><span style={{color:  'black'}} dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{data?.saleAmount.toLocaleString()}</TdStyled>
                      </tr>
                                      ))
                         }
                  </tbody>
              </TableStyled>
            )}
              </TableReusableWrapper> 
        </TableReusableWrapper>
  )
}


export default HomePurchaseTable;
