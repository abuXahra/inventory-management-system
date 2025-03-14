import React, { useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import { ButtonsWrapper, ChargesWrapper, DateWrapper, InfoBillWrapper, InvoiceWrapper, LogoDateWrapper, LogoWrapper, NoteWrapper, TableStyled, TdStyled, ViewSalesContent, ViewSalesWrapper } from './viewSale.style'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import JewelLogo from '../../../../images/logo1.png' 
import { SiPantheon } from 'react-icons/si'
import { ProductItemList } from '../../../../data/productItems'
import Button from '../../../../components/clicks/button/Button'
import { FaEdit, FaPrint } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function ViewSale() {
  const [itemList, setItemList] = useState(ProductItemList);

  const navigate = useNavigate();

  return (
    <ViewSalesWrapper>
    {/* Page title */}
    <PageTitle title={'Sale'} subTitle={'/ View'}/>
    <ViewSalesContent>
      {/* invoice wrapper */}
      <InvoiceWrapper>
        
        {/* Logo AND dATE */}
        <LogoDateWrapper>
          {/* logo */}
            <LogoWrapper>
              <div>
                <img src={JewelLogo} alt="" srcset="" />
              </div>
            </LogoWrapper>
            {/* date */}
            <DateWrapper>
              <h3>INVOICE</h3>
              <hr />
              <div>
                  <div>
                      <span><b>INVOICE NO.:</b></span>
                      <span>SA1001</span>                  
                  </div>
                  <div>
                      <span><b>INVOICE DATE:</b></span>
                      <span>02-Jan-2020</span>                  
                  </div>
                  <div>
                      <span><b>SALES STATUS:</b></span>
                      <span>Received</span>                  
                  </div>
                  <div>
                      <span><b>Payment STATUS:</b></span>
                      <span><div>Paid</div></span>                  
                  </div>
              </div>
             
            </DateWrapper>
        </LogoDateWrapper>

        <InfoBillWrapper>
          {/* our info */}
           <div>
              <h3>OUR INFORMATION</h3>
              <hr />
              <div>
                  <span><b>Inventory</b></span>
                  <span>Address: Mirpur, Daghaka Bangladesh</span>
                  <span>Phone: 09055001663</span>
                  <span>Email: morningunit@gmail.com</span>
              </div>
           </div>

           {/* customer info */}
           <div>
              <h3>BILLING TO</h3>
              <hr />
              <div>
                  <span><b>Walk-in Customer</b></span>
                  <span>Address: Mirpur, Daghaka Bangladesh</span>
                  <span>Phone: 09055001663</span>
                  <span>Email: morningunit@gmail.com</span>
              </div>
           </div>
        </InfoBillWrapper>

        {/* table of items */}
           <TableStyled>
                            <thead>
                                <TdStyled><b>#</b></TdStyled>
                                <TdStyled><b>Item Name</b></TdStyled>
                                <TdStyled><b>Price</b></TdStyled>
                                <TdStyled><b>Tax(%)</b></TdStyled>
                                <TdStyled><b>Tax Amount</b></TdStyled>
                                <TdStyled><b>Unit Cost</b></TdStyled>
                                <TdStyled><b>Amount</b></TdStyled>
                            </thead>
                            <tbody>
                            {itemList.map((data, i)=>(
                                <tr key={i}>
                                    <TdStyled>{i+1}</TdStyled>
                                    <TdStyled>{data.title}</TdStyled>
                                    <TdStyled>{data.price}</TdStyled>
                                    <TdStyled>None</TdStyled>
                                    <TdStyled>0.00</TdStyled>
                                    <TdStyled>{data.price}</TdStyled>
                                    <TdStyled>{data.qty + data.price }</TdStyled>
                                </tr>
                            ))
                        }
                            </tbody>
                        </TableStyled>
              
              {/* Total Charges */}
              <ChargesWrapper>
                <div>
                  <h3>Payment</h3>
                  <hr />
                  <TableStyled pd="0px">
                            <thead>
                                <TdStyled><b>Date</b></TdStyled>
                                <TdStyled><b>Amount</b></TdStyled>
                                <TdStyled><b>Payment Type</b></TdStyled>
                                <TdStyled><b>Note</b></TdStyled>
                            </thead>
                            <tbody>
                                   <tr>
                                        <TdStyled>02-Jan-2020</TdStyled>
                                        <TdStyled>{'N300,000'}</TdStyled>
                                        <TdStyled>{'Cash'}</TdStyled>
                                        <TdStyled>{''}</TdStyled>
                                    </tr>
                            </tbody>
                        </TableStyled>
                </div>

                {/* Total Charges */}
                <div>

                <h3>Charges</h3>
                <hr />

                  {/* subtotal */}
                  <div>
                    <span><b>Sub Total</b></span>
                    <span>N300,000</span>
                  </div>
                        {/* Other Charges */}
                  <div>
                    <span><b>Other Charges</b></span>
                    <span>N0.00</span>
                  </div>

                        {/* Disacount*/}
                  <div>
                    <span><b>Discount</b></span>
                    <span>N600</span>
                  </div>
  
                    {/* Disacount*/}
                  <div>
                    <span><b>Grand Total</b></span>
                    <span>N300,500</span>
                  </div>
                </div>
              </ChargesWrapper>

              {/* Note */}
              <NoteWrapper>
                <span>Note:</span>
                <hr />
              </NoteWrapper>
      </InvoiceWrapper>
  
    {/* Action buttons */}
      <ButtonsWrapper>

        {/* Edit */}
        <Button
          btnColor={'rgb(35, 139, 0)'}
          btnText={'Edit'}
          btnPd={'5px 10px'}
          btnFontSize={'12px'}
          btnLeftIcon={<FaEdit/>}
          btnBdRd={'2px'}
          btnOnClick={()=>navigate('/edit/:salesId')}
        />

        {/* print */}
        <Button
          btnColor={'#0284c7'}
          btnText={'Print'}
          btnPd={'5px 10px'}
          btnFontSize={'12px'}
          btnLeftIcon={<FaPrint/>}
          btnOnClick={()=>{}}
          btnBdRd={'2px'}
        />

        {/* download */}
        <Button
          btnColor={'#0284c7'}
          btnText={'Download'}
          btnPd={'5px 10px'}
          btnFontSize={'12px'}
          btnLeftIcon={<FaDownload/>}
          btnBdRd={'2px'}
        />
      </ButtonsWrapper>
    </ViewSalesContent>
</ViewSalesWrapper>
  )
}
