import React, { useEffect, useRef, useState } from 'react'
import CompanyLogo from '../../../../../images/product_placeholder.jpg'  
import { FaEdit, FaPrint } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useReactToPrint } from 'react-to-print'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { List } from 'react-content-loader'
import { ButtonsWrapper, ChargesWrapper, DateWrapper, InfoBillWrapper, InvoiceWrapper, LogoDateWrapper, LogoWrapper, NoteWrapper, PartialPaymentWrapper, PurchaseReturnViewContent, PurchaseReturnViewWrapper, SaleReturnViewContent, SaleReturnViewWrapper, TableStyled, TdStyled } from './purchaseReturnView.style'
import PageTitle from '../../../../../components/page_title/PageTitle'
import Button from '../../../../../components/clicks/button/Button'
import ButtonLoader from '../../../../../components/clicks/button/button_loader/ButtonLoader'


export default function PurchaseReturnView() {
  

  const navigate = useNavigate();
    const {returnId} = useParams();
    const [supplierId, setSupplierId] = useState('')
    const [purchaseReturnData, setPurchaseReturnData] = useState('');
    const [supplierData, setSupplierData] = useState('');
    const [companyData, setCompanyData] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
  

// Fetch invoice detail
                useEffect(()=>{
                  const fetchInvoice = async() =>{
                    setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/purchaseReturn/${returnId}`);        
                          setPurchaseReturnData(res.data);
                          setSupplierId(res.data.supplier._id)
                          setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          setIsLoading(false);
                      }
                  }
                  fetchInvoice();
                             

                 const fetchCompany = async() =>{
                    // setIsLoading(true)
                      try {
                          const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`);
                          setCompanyData(res.data[0])
                          // setIsLoading(false);
                      } catch (error) {
                          console.log(error);
                          // setIsLoading(false);
                      }
                
                  }
                  fetchCompany();
                },[returnId])

               

        useEffect(()=>{
                 
          // if (!customerId) return;

                const fetchSupplier = async() =>{
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/suppliers/${supplierId}`);        
                        console.log('====== customer data: \n', res.data, '==================')
                        setSupplierData(res.data);
                        console.log('customer data; ', res.data)

                    } catch (error) {
                        console.log(error);
                        // setIsLoading(false);
                    }
              
                }
            fetchSupplier()
                },[supplierId])

               
                
  // for printing
  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({contentRef})

  // for download pdf invoice
  const pdfRef = useRef(null)
  const downloadPDF = () => {
    const input = pdfRef.current;
    setIsBtnLoading(true)
    return html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth =  canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio );
      pdf.save('invoice.pdf')
      setIsBtnLoading(false);
    })
  }

  const handleBtnClick = (type) => {

    if (type === 'print') {
      return reactToPrintFn();
    }else if(type === 'pdf'){
      return downloadPDF();
    }

  }
  return (
    <PurchaseReturnViewWrapper>
    {/* Page title */}
    <PageTitle title={'Purchase Return'} subTitle={'/ View'}/>

    {/* content */}
    <>
      {isLoading?
       <List/> :

    <PurchaseReturnViewContent>
      {/* invoice wrapper */}
        
    <InvoiceWrapper ref={(el) => {
      contentRef.current = el;
      pdfRef.current = el;
    }}>
        
        {/* Logo AND dATE */}
        <LogoDateWrapper>
          {/* logo */}
            <LogoWrapper>
              <div>
                <img src={companyData ? 
                  process.env.REACT_APP_URL+'/images/'+ companyData.companyLogo:
                  CompanyLogo} alt="" srcset="" />
              </div>
            </LogoWrapper>
            {/* date */}
            <DateWrapper>
              <h3>PURCHASE RETURN</h3>
              <hr />
              <div>
                  <div>
                      <span><b>RETURN NO.:</b></span>
                      <span>{purchaseReturnData?.code}</span>                  
                  </div>
                  <div>
                      <span><b>RETURN DATE:</b></span>
                      <span>{new Date(purchaseReturnData?.returnDate).toDateString()}</span>                                    
                  </div>
                  {/* <div>
                      <span><b>RETURN STATUS:</b></span>
                      <span>{purchaseReturnData?.purchaseStatus}</span>                  
                  </div> */}
                  <div>
                      <span><b>PAYMENT STATUS:</b></span>
                      <span><div>{purchaseReturnData?.paymentStatus}</div></span>                  
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
                  <span><b>{companyData?.companyName?.toUpperCase()}</b></span>
                  <span>Address: {companyData?.address}</span>
                  <span>Phone: {companyData?.phoneNumber}</span>
                  <span>Email: {companyData?.companyEmail}</span>
              </div>
           </div>

           {/* Supplier info */}
           <div>
              <h3>RETURN TO</h3>
              <hr />
              <div>
                  <span><b>{supplierData?.name?.toUpperCase()}</b></span>
                  <span>Address: {supplierData?.address}</span>
                  <span>Phone: {supplierData?.phoneNumber}</span>
                  <span>Email: {supplierData?.email}</span>
              </div>
           </div>
        </InfoBillWrapper>
<br/>
      {/* /* table of items */}
                 <TableStyled>
                                  <thead>
                                      <TdStyled><b>#</b></TdStyled>
                                      <TdStyled><b>Item Name</b></TdStyled>
                                      <TdStyled><b>Quantity</b></TdStyled>
                                      <TdStyled><b>Price</b></TdStyled>
                                      <TdStyled><b>Tax(%)</b></TdStyled>
                                      <TdStyled><b>Tax Amount </b></TdStyled>
                                      <TdStyled><b>Unit Cost </b></TdStyled>
                                      <TdStyled><b>Amount </b></TdStyled>
                                  </thead>
                                  <tbody>
                                  {purchaseReturnData.returnItems?.map((data, i)=>(
                                      <tr key={i}>
                                          <TdStyled>{i+1}</TdStyled>
                                          <TdStyled>{data.title}</TdStyled>
                                          <TdStyled>{data.quantity}</TdStyled>
                                          <TdStyled>{data.price}</TdStyled>
                                          <TdStyled>{data.tax}%</TdStyled>
                                          <TdStyled>{data.taxAmount}</TdStyled>
                                          <TdStyled>{data.unitCost}</TdStyled>
                                          <TdStyled>{data.amount }</TdStyled>
                                      </tr>
                                  ))
                              }
                                  </tbody>
                              </TableStyled>  
                <br/>
                {/* Total Charges */}
                            <ChargesWrapper>
                              <div>
                                <h3>Payment</h3>
                                <hr />
                                <TableStyled pd="0px">
                                          <thead>
                                              <TdStyled><b>Date</b></TdStyled>
                                              <TdStyled><b>Amount </b></TdStyled>
                                              <TdStyled><b>Payment Type</b></TdStyled>
                                          </thead>
                                          <tbody>
                                                 <tr>
                                                      <TdStyled>{new Date(purchaseReturnData?.returnDate).toDateString()}</TdStyled>
                                                      <TdStyled>{purchaseReturnData?.returnAmount}</TdStyled>
                                                      <TdStyled>{purchaseReturnData?.paymentType}</TdStyled>
                                                  </tr>
                                          </tbody>
                                      </TableStyled>
                              </div>
              
                             
                              {/* Total Charges */}
                              <div>
              
                              <h3>Charges</h3>
                              <hr />
              
                                {/* subtotal */}
                                {/* <div>
                                  <span><b>Sub Total</b></span>
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseReturnData?.subTotal}</span>
                                </div> */}
                                      {/* Other Charges */}
                                {/* <div>
                                  <span>Other Charges</span>
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseReturnData?.otherCharges}</span>
                                </div> */}
              
                                      {/* Disacount*/}
                                {/* <div>
                                  <span>Discount ({purchaseReturnData?.discount})%</span>
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseReturnData?.discountValue}</span>
                                </div> */}
                
              
                                      {/* Shipping*/}
                                {/* <div>
                                  <span>Shipping</span>
                                  <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseReturnData?.shipping}</span>
                                </div> */}
              
                                  {/* Refund Total*/}
                                <div>
                                  <span><b>Refund Total</b></span>
                                  <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>
                                  {purchaseReturnData?.returnAmount?.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b></span>
                                </div>
                              </div>

                            </ChargesWrapper>

                          {  purchaseReturnData.paymentStatus === 'partial' && 
                                                        
                              <PartialPaymentWrapper>
                                  <h3>Advance payment</h3> <hr />
                                     <div>                                   
                                        <span>Amount Paid</span>
                                        <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseReturnData?.amountPaid.toLocaleString('en-NG', { 
                                              minimumFractionDigits: 2, 
                                              maximumFractionDigits: 2 
                                            })}</span>
                                      </div>
                                                   
                                     <div>
                                        <span><b>Balance</b></span>
                                        <span><b><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{purchaseReturnData.dueBalance?.toLocaleString('en-NG', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                  })}</b></span>
                                      </div>
                                                        
                              
                        </PartialPaymentWrapper>
                    }

<br/>
              {/* Note */}
              <NoteWrapper>
                <span>Refund Reason: {purchaseReturnData?.reason}</span>
                <hr />
              </NoteWrapper>
      </InvoiceWrapper>
  
    {/* Action buttons */}
      <ButtonsWrapper>

         {/* Edit */}
                {/* <Button
                  btnColor={'rgb(35, 139, 0)'}
                  btnText={'Edit'}
                  btnPd={'5px 10px'}
                  btnFontSize={'12px'}
                  btnLeftIcon={<FaEdit/>}
                  btnBdRd={'2px'}
                  btnOnClick={()=>navigate(`/edit-sale-return/${purchaseReturnData?._id}`)}
                /> */}
        
                {/* print */}
                    <Button
                      btnColor={'#0284c7'}
                      btnText={'Print'}
                      btnPd={'5px 10px'}
                      btnFontSize={'12px'}
                      btnLeftIcon={<FaPrint />}
                      btnBdRd={'2px'}
                      btnOnClick={()=>handleBtnClick('print')}
                    />
                
        
                {/* download */}
                <Button
                  btnColor={'#0284c7'}
                  btnText={isBtnLoading? <ButtonLoader text={'Generating PDF'}/> : 'Download'}
                  btnPd={'5px 10px'}
                  btnFontSize={'12px'}
                  btnLeftIcon={isBtnLoading? "" : <FaDownload/>}
                  btnBdRd={'2px'}
                  btnOnClick={()=>handleBtnClick('pdf')}
                />

            <Button
                  btnColor={'#0284c7'}
                  btnText={'View Invoice'}
                  btnPd={'5px 10px'}
                  btnFontSize={'12px'}
                  btnLeftIcon={isBtnLoading? "" : <FaDownload/>}
                  btnBdRd={'2px'}
                  btnOnClick={()=>navigate(`/sale-invoice/${purchaseReturnData.purchase?._id}`)}
                />
        
                {/* <Button
                  btnColor={'#0284c7'}
                  btnText={'Email'}
                  btnPd={'5px 10px'}
                  btnFontSize={'12px'}
                  btnLeftIcon={<FaVoicemail/>}
                  btnBdRd={'2px'}
                  btnOnClick={()=>{}}
                /> */}
      </ButtonsWrapper>
    </PurchaseReturnViewContent>
        }
          </>
</PurchaseReturnViewWrapper>
  )
}
