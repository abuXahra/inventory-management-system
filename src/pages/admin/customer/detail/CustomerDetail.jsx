import React from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import { CustomerDetailContent, CustomerDetailData, CustomerDetailPicture, CustomerDetailWrapper } from './customerDetail.style'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import profilePicture from '../../../../images/professional_passport.png'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'



export default function CustomerDetail() {

  const navigate = useNavigate();
  return (
        <CustomerDetailWrapper>
          <PageTitle title={'Customer'} subTitle={'Detail'}/>

          {/* content */}
          <CustomerDetailContent>
            
            <CustomerDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <img src={profilePicture} alt="" srcset="" />
              </ItemContainer>
            </CustomerDetailPicture>
            <CustomerDetailData>
              <ItemContainer title={'Customer Detail'}> 
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>Isah Abdulmumin</span>
                       </InnerWrapper>
              </AnyItemContainer>
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                          <span><b>Phone Number</b></span>
                          <span>+234 813 5701 458</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Email</b></span>
                          <span>abdulmuminisah79@gmail.com</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Tax Number</b></span>
                          <span>90087787899</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Address</b></span>
                          <span>No. 22, Back Apostolic, Ajegule Mpape ABUJA</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>
                            <ItemContainer title={'Action'}> 
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>{alert("Deleted")}} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                                          <span onClick={()=>{alert("Deleted")}} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>navigate(`/customers/${1}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                                          <span onClick={()=>navigate(`/edit-customer/${1}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                            </ItemContainer>
            </CustomerDetailData>
          </CustomerDetailContent> 
      </CustomerDetailWrapper>
  )
}
