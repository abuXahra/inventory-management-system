import React from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import { ProductDetailContent, ProductDetailData, ProductDetailPicture, ProductDetailWrapper } from './ProductDetail.style'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import productPicture from '../../../../images/necklace.jpeg'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'



export default function ProductDetail() {


    //   sku: '56422',
    //   stock: "100",
    //   unit: "Piece",
    //   price: 35000,
    //   alertQty: '10',
    //   status: 'available',

  const navigate = useNavigate();
  return (
        <ProductDetailWrapper>
          <PageTitle title={'Product'} subTitle={' / View'}/>

          {/* content */}
          <ProductDetailContent>
            
            <ProductDetailPicture>
              <ItemContainer title={'Product Picture'}> 
                <img src={productPicture} alt="" srcset="" />
              </ItemContainer>
            </ProductDetailPicture>
            <ProductDetailData>
              <ItemContainer title={'Product Detail'}> 
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>Zircon Necklace</span>
                       </InnerWrapper>
              </AnyItemContainer>
                  <AnyItemContainer gap="60px"> 
                       <InnerWrapper wd={'100%'}>
                          <span><b>Code</b></span>
                          <span>PT1001</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="20px"> 
                  <InnerWrapper wd={'100%'}>
                          <span><b>Category</b></span>
                          <span>Necklace</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                  <InnerWrapper wd={'100%'}>
                          <span><b>SKU</b></span>
                          <span>200879</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Stock</b></span>
                          <span>300</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Unit</b></span>
                          <span>Piece</span>
                       </InnerWrapper>
                  </AnyItemContainer>    
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Price</b></span>
                          <span>N35,000</span>
                       </InnerWrapper>
                  </AnyItemContainer>  
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Alert Quantity</b></span>
                          <span>N10</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Status</b></span>
                          <span>Available</span>
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
                            <span onClick={()=>navigate(`/edit-product/${1}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                            <span onClick={()=>navigate(`/edit-product/${1}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                      </InnerWrapper>
                </AnyItemContainer>
              </ItemContainer>
            </ProductDetailData>
          </ProductDetailContent> 
      </ProductDetailWrapper>
  )
}
