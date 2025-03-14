import React from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import profilePicture from '../../../../images/professional_passport.png'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { CategoryDetailContent, CategoryDetailData, CategoryDetailPicture, CategoryDetailWrapper } from './categoryDetail.style'
import catPicture from '../../../../images/product_placeholder.jpg'



export default function CategoryDetail() {

  const navigate = useNavigate();
  return (
        <CategoryDetailWrapper>
          <PageTitle title={'Supplier'} subTitle={' / View'}/>

          {/* content */}
          <CategoryDetailContent>
            
            <CategoryDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <img src={catPicture} alt="" srcset="" />
              </ItemContainer>
            </CategoryDetailPicture>
            <CategoryDetailData>
              <ItemContainer title={'Supplier Detail'}> 
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Title</b></span>
                          <span>Necklace</span>
                       </InnerWrapper>
              </AnyItemContainer>
                  <AnyItemContainer gap="60px"> 
                       <InnerWrapper wd={'100%'}>
                          <span><b>Note</b></span>
                          <span>Necklace Category Item</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="20px"> 
                  <InnerWrapper wd={'100%'}>
                          <span><b>Status</b></span>
                          <span>On</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>
              <ItemContainer title={'Action'}> 
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>alert('deleted')} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                            <span onClick={()=>alert('deleted')} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                      </InnerWrapper>
                </AnyItemContainer>
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>navigate(`/edit-category/${1}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                            <span onClick={()=>navigate(`/edit-category/${1}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                      </InnerWrapper>
                </AnyItemContainer>
              </ItemContainer>
            </CategoryDetailData>
          </CategoryDetailContent> 
      </CategoryDetailWrapper>
  )
}
