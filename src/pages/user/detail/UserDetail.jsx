import React from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { UserDetailContent, UserDetailData, UserDetailPicture, UserDetailWrapper } from './userDetail.style'
import profilePicture from '../../../images/professional_passport.png'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import ItemContainer from '../../../components/item_container/ItemContainer'
import { AnyItemContainer, InnerWrapper } from '../../admin/sale/Add/addSale.style'



export default function UserDetail() {

  const navigate = useNavigate();
  return (
        <UserDetailWrapper>
          <PageTitle title={'User'} subTitle={' / View'}/>

          {/* content */}
          <UserDetailContent>
            
            <UserDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <img src={profilePicture} alt="" srcset="" />
              </ItemContainer>
            </UserDetailPicture>
            
            <UserDetailData>
              <ItemContainer title={'User Detail'}> 
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
                                          <span onClick={()=>navigate(`/users/${1}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                                          <span onClick={()=>navigate(`/edit-user/${1}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                            </ItemContainer>
            </UserDetailData>
          </UserDetailContent> 
      </UserDetailWrapper>
  )
}
