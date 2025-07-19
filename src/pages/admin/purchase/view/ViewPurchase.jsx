import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import JewelLogo from '../../../../images/logo1.png' 
import { SiPantheon } from 'react-icons/si'
import { ProductItemList } from '../../../../data/productItems'
import Button from '../../../../components/clicks/button/Button'
import { FaEdit, FaPrint } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import { ButtonsWrapper, ChargesWrapper, DateWrapper, InfoBillWrapper, InvoiceWrapper, LogoDateWrapper, LogoWrapper, NoteWrapper, TableStyled, TdStyled, ViewPurchaseContent, ViewPurchaseWrapper } from './viewPurchase.style'
import axios from 'axios'

export default function ViewPurchase() {
  const [itemList, setItemList] = useState(ProductItemList);

  const navigate = useNavigate();
  const {purchaseId} = useParams();
  const [supplierId, setSupplierId] = useState('')
  const [purchaseData, setPurchaseData] = useState('');
  const [supplierData, setSupplierData] = useState('');
  const [companyData, setCompanyData] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  // const [showDeleteCard, setShowDeleteCard] = useState(false);
  // const [grabId, setGrabId] = useState('');
  // const [grabTitle, setGrabTitle] = useState('');


  // Fetch invoice detail
                useEffect(()=>{
                  const fetchInvoice = async() =>{
                    setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/purchase/${purchaseId}`);        
                          console.log('====== purchase data: \n', res.data, '==================')
                          setPurchaseData(res.data);
                          setSupplierId(res.data.supplier)
                          setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                      }
                
                  }
                  fetchInvoice();

                const fetchSupplier = async() =>{
                  setIsLoading(true)
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/suppliers/${supplierId}`);        
                        console.log('====== supplier data: \n', res.data, '==================')
                        setSupplierData(res.data);
                        console.log('supplier data; ', res.data)
                        setIsLoading(false);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
              
                }
                fetchSupplier();                  

                 const fetchCompany = async() =>{
                    setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`);
                          setCompanyData(res.data)
                          setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                      }
                
                  }
                  fetchCompany();
                },[purchaseId, supplierId])

                // print invoice
                const printInoiceHanlder = () => {

                }

                // download invoice
                const downloadHandler = () => {

                }

  return (
    <ViewPurchaseWrapper>
    {/* Page title */}
    <PageTitle title={'Purchase'} subTitle={'/ View'}/>
    <ViewPurchaseContent>
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

           {/* supply info */}
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
                                <TdStyled><b>Quantity</b></TdStyled>
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
                                    <TdStyled>{data.qty}</TdStyled>
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
    </ViewPurchaseContent>
</ViewPurchaseWrapper>
  )
}
