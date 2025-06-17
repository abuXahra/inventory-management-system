import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import { SupplierDetailContent, SupplierDetailData, SupplierDetailPicture, SupplierDetailWrapper } from './SupplierDetail.style'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import profilePicture from '../../../../images/placeholder_image.png'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaList, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { PictureWrapper } from '../../../user/detail/userDetail.style'
import Overlay from '../../../../components/overlay/Overlay'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../../components/toast_message/toast_component/ToastComponents'
import { List } from 'react-content-loader'



export default function SupplierDetail() {

  const navigate = useNavigate();

  
      const {supplierId} = useParams();
      const [supData, setSupData] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const [isBtnLoading, setIsBtnLoading] = useState(false);
      const [showDeleteCard, setShowDeleteCard] = useState(false);
      const [grabId, setGrabId] = useState('');
      const [grabTitle, setGrabTitle] = useState('');


      
            // Fetch customer detail
              useEffect(()=>{
                const fetchSupplier = async() =>{
                  setIsLoading(true)
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/suppliers/${supplierId}`);        
                        console.log('====== supplier data: \n', res.data, '==================')
                        setSupData(res.data);
                        setIsLoading(false);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
              
                }
                fetchSupplier();
              },[supplierId])
              
            
            
            const handleGrabId = (title)=>{
              setShowDeleteCard(true);
              setGrabTitle(title);
            
            }
            
            
              // handle delete
                    const deleteSupplier = async (supplierId) => {
                      setIsBtnLoading(true);
                      try {
                         
                        await axios.delete(`${process.env.REACT_APP_URL}/api/customers/${supplierId}`);
                       
                          toast.success('Supplier deleted successfully');
                          setShowDeleteCard(false); // Close modal
                          setIsBtnLoading(false);
                          navigate('/suppliers')
                      } catch (error) {
                        return { success: false, message: error.message };
                      }
                    };
              
            

  return (
        <SupplierDetailWrapper>
          <PageTitle title={'Supplier'} subTitle={' / View'}/>

          {/* content */}
          <>
          {isLoading?
          <List/> :
          <SupplierDetailContent>
            
            <SupplierDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <PictureWrapper imgUrl={supData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${supData?.imgUrl}` : profilePicture}></PictureWrapper>      
              </ItemContainer>
            </SupplierDetailPicture>
            <SupplierDetailData>
              <ItemContainer title={'Supplier Detail'}> 
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>{supData?.name}</span>
                       </InnerWrapper>
              </AnyItemContainer>
                  <AnyItemContainer gap="60px"> 
                       <InnerWrapper wd={'100%'}>
                          <span><b>Phone Number</b></span>
                          <span>{supData?.phoneNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="20px"> 
                  <InnerWrapper wd={'100%'}>
                          <span><b>Email</b></span>
                          <span>{supData?.email}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                  <InnerWrapper wd={'100%'}>
                          <span><b>Tax Number</b></span>
                          <span>{supData?.taxNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Address</b></span>
                          <span>{supData?.address}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>
              <ItemContainer title={'Action'}> 
                <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                  <span onClick={()=>navigate(`/suppliers`)} style={{color: "blue", cursor: "pointer"}}><b>List</b></span>
                  <span onClick={()=>navigate(`/suppliers`)} style={{color: "blue", cursor: "pointer"}}><FaList/></span>
                  </InnerWrapper>
                </AnyItemContainer>
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>navigate(`/edit-supplier/${supData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                            <span onClick={()=>navigate(`/edit-supplier/${supData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                      </InnerWrapper>
                </AnyItemContainer>
                 <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>handleGrabId(supData?.name)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                            <span onClick={()=>handleGrabId(supData?.name)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                      </InnerWrapper>
                </AnyItemContainer>
              </ItemContainer>
            </SupplierDetailData>
          </SupplierDetailContent> }</>

              {/* overlay popup */}
                        { showDeleteCard &&
                         <Overlay 
                         contentWidth={'30%'}
                         overlayButtonClick={()=>deleteSupplier(supData?._id)}
                         closeOverlayOnClick={()=>setShowDeleteCard(false)}
                         btnText1={isBtnLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                         >
                         <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                            Are you sure You want to delete the Supplier <b style={{textTransform:"capitalize"}}>{grabTitle} </b> 
                         </p>
                         </Overlay>
                         }
                                  
                         {/* Toast message user component */}
                         <ToastComponents/>
      </SupplierDetailWrapper>
  )
}
