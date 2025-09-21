import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import { CustomerDetailContent, CustomerDetailData, CustomerDetailPicture, CustomerDetailWrapper } from './customerDetail.style'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import profilePicture from '../../../../images/placeholder_image.png'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaList, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { List } from 'react-content-loader'
import { PictureWrapper } from '../../../user/detail/userDetail.style'
import Overlay from '../../../../components/overlay/Overlay'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../../components/toast_message/toast_component/ToastComponents'



export default function CustomerDetail() {

  const navigate = useNavigate();

    const {customerId} = useParams();
    const [cusData, setCusData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [grabId, setGrabId] = useState('');
    const [grabTitle, setGrabTitle] = useState('');


      // Fetch customer detail
        useEffect(()=>{
          const fetchCustomer = async() =>{
            setIsLoading(true)
              try {
                  const res = await axios.get(`${process.env.REACT_APP_URL}/api/customers/${customerId}`);        
                  console.log('====== customer data: \n', res.data, '==================')
                  setCusData(res.data);
                  setIsLoading(false);
              } catch (error) {
                  console.log(error);
                  setIsLoading(false);
              }
        
          }
          fetchCustomer();
        },[customerId])
        
      
      
      const handleGrabId = (title)=>{
        setShowDeleteCard(true);
        setGrabTitle(title);
      
      }
      
      
        // handle delete
              const deleteCustomer = async (custId) => {
                setIsBtnLoading(true);
                try {
                   
                  await axios.delete(`${process.env.REACT_APP_URL}/api/customers/${customerId}`);
                 
                    toast.success('Customer deleted successfully');
                    setShowDeleteCard(false); // Close modal
                    setIsBtnLoading(false);
                    navigate('/customers')
                } catch (error) {
                  return { success: false, message: error.message };
                }
              };
        
        

  return (
        <CustomerDetailWrapper>
          <PageTitle title={'Customer'} subTitle={'Detail'}/>

          {/* content */}
           <>
                  {isLoading?
                    <List/> :
          <CustomerDetailContent>
            <CustomerDetailData>
              <ItemContainer title={'Customer Detail'}> 
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>{cusData?.name}</span>
                       </InnerWrapper>
              </AnyItemContainer>
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                          <span><b>Phone Number</b></span>
                          <span>{cusData?.phoneNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Email</b></span>
                          <span>{cusData?.email}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Tax Number</b></span>
                          <span>{cusData?.taxNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Address</b></span>
                          <span>{cusData?.address}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>
                            <ItemContainer title={'Action'}> 
                               <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                        <span onClick={()=>navigate(`/customers`)} style={{color: "blue", cursor: "pointer"}}><b>List</b></span>
                                        <span onClick={()=>navigate(`/customers`)} style={{color: "blue", cursor: "pointer"}}><FaList/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>navigate(`/customers/${cusData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                                          <span onClick={()=>navigate(`/edit-customer/${cusData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>handleGrabId(cusData?.name)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                                          <span onClick={()=>handleGrabId(cusData?.name)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                            </ItemContainer>
            </CustomerDetailData>

            <CustomerDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <PictureWrapper imgUrl={cusData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${cusData?.imgUrl}` : profilePicture}></PictureWrapper>        
                {/* <img src={profilePicture} alt="" srcset="" /> */}
              </ItemContainer>
            </CustomerDetailPicture>
          </CustomerDetailContent> 
    }</>

    {/* overlay popup */}
              { showDeleteCard &&
               <Overlay 
               contentWidth={'30%'}
               overlayButtonClick={()=>deleteCustomer(cusData?._id)}
               closeOverlayOnClick={()=>setShowDeleteCard(false)}
               btnText1={isBtnLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
               >
               <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
               Are you sure You want to delete the Customer <b style={{textTransform:"capitalize"}}>{grabTitle} </b> 
               </p>
               </Overlay>
               }
                        
               {/* Toast message user component */}
               <ToastComponents/>
      </CustomerDetailWrapper>
  )
}
