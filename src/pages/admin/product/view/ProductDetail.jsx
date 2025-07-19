import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import { ProductDetailContent, ProductDetailData, ProductDetailPicture, ProductDetailWrapper } from './ProductDetail.style'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import productPicture from '../../../../images/product_placeholder.jpg'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaList, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { PictureWrapper } from '../../../user/detail/userDetail.style'
import axios from 'axios'
import { toast } from 'react-toastify'
import Overlay from '../../../../components/overlay/Overlay'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../../components/toast_message/toast_component/ToastComponents'
import { List } from 'react-content-loader'



export default function ProductDetail() {

    const navigate = useNavigate();
    const {productId} = useParams();
    const [prodData, setProdData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [grabId, setGrabId] = useState('');
    const [grabTitle, setGrabTitle] = useState('');
    const [showProdImage, setShowProdImage] = useState(false);
    
      // Fetch product detail
              useEffect(()=>{
                const fetchProduct = async() =>{
                  setIsLoading(true)
                    try {
                        const res = await axios.get(`${process.env.REACT_APP_URL}/api/products/${productId}`);        
                        console.log('====== product data: \n', res.data, '==================')
                        setProdData(res.data);
                        setIsLoading(false);
                    } catch (error) {
                        console.log(error);
                        setIsLoading(false);
                    }
              
                }
                fetchProduct();
              },[productId])
    
          
               const handleGrabId = (title)=>{
              setShowDeleteCard(true);
              setGrabTitle(title);
            
            }
            
            
              // handle delete
                    const deleteProduct = async (productId) => {
                      setIsBtnLoading(true);
                      try {
                         
                        await axios.delete(`${process.env.REACT_APP_URL}/api/products/${productId}`);
                          toast.success('Product deleted successfully');
                          setShowDeleteCard(false); // Close modal
                          setIsBtnLoading(false);
                          navigate('/products')
                      } catch (error) {
                        return { success: false, message: error.message };
                      }
                    };
              
           
            
  return (
        <ProductDetailWrapper>
          <PageTitle title={'Product'} subTitle={' / View'}/>

          {/* content */}
         <>
         {isLoading?
          <List/> :
          <ProductDetailContent>
            
            <ProductDetailPicture>
              <ItemContainer title={'Product Picture'}> 
                  <PictureWrapper onClick={()=>setShowProdImage(true)} heights={'300px'} imgUrl={prodData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${prodData?.imgUrl}` : productPicture}></PictureWrapper>          
              </ItemContainer>
            </ProductDetailPicture>
            <ProductDetailData>
              <ItemContainer title={'Product Detail'}> 
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>{prodData.title}</span>
                       </InnerWrapper>
              </AnyItemContainer>
                  <AnyItemContainer gap="60px"> 
                       <InnerWrapper wd={'100%'}>
                          <span><b>Code</b></span>
                          <span>{prodData?.code}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="20px"> 
                  <InnerWrapper wd={'100%'}>
                          <span><b>Category</b></span>
                          <span>{prodData.category?.title}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                  <InnerWrapper wd={'100%'}>
                          <span><b>SKU</b></span>
                          <span>{prodData?.sku}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Stock</b></span>
                          <span>{prodData?.openingStock}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Unit</b></span>
                          <span>{prodData.unit?.title}</span>
                       </InnerWrapper>
                  </AnyItemContainer>    
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Purchase Price</b></span>
                          <span>N{prodData?.purchasePrice}</span>
                       </InnerWrapper>
                  </AnyItemContainer>  
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Selling Price</b></span>
                          <span>N{prodData?.salePrice}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                                    <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Profit Margin</b></span>
                          <span>{prodData?.profitMargin}%</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Alert Quantity</b></span>
                          <span>{prodData?.quantityAlert}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Status</b></span>
                          <span>{prodData?.status}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>
              <ItemContainer title={'Action'}> 
              <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                  <span onClick={()=>navigate(`/products`)} style={{color: "blue", cursor: "pointer"}}><b>List</b></span>
                  <span onClick={()=>navigate(`/products`)} style={{color: "blue", cursor: "pointer"}}><FaList/></span>
                  </InnerWrapper>
                </AnyItemContainer>
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>navigate(`/edit-product/${prodData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                            <span onClick={()=>navigate(`/edit-product/${prodData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                      </InnerWrapper>
                </AnyItemContainer>
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>handleGrabId(prodData?.title)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                            <span onClick={()=>handleGrabId(prodData?.title)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                      </InnerWrapper>
                </AnyItemContainer>
              </ItemContainer>
            </ProductDetailData>
          </ProductDetailContent> }
          </>


              {/* overlay popup */}
                        { showDeleteCard &&
                         <Overlay 
                         contentWidth={'30%'}
                         overlayButtonClick={()=>deleteProduct(prodData?._id)}
                         closeOverlayOnClick={()=>setShowDeleteCard(false)}
                         btnText1={isBtnLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                         >
                         <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                            Are you sure You want to delete the Product <b style={{textTransform:"capitalize"}}>{grabTitle} </b> 
                         </p>
                         </Overlay>
                         }
                                  
                         {/* Toast message user component */}
                         <ToastComponents/>

                         {/* overlay Image popup */}
                        { showProdImage &&
                         <Overlay 
                         contentWidth={'fit-content'}
                         overlayButtonClick={()=>setShowProdImage(false)}
                         closeOverlayOnClick={()=>setShowProdImage(false)}
                         btnDisplayYes={'none'}
                         btnDisplayNo={'none'}
                         >
                          <img src={`${process.env.REACT_APP_URL}/images/${prodData?.imgUrl}`} alt="" srcset="" />
                         </Overlay>
                         }
                                  
          
      </ProductDetailWrapper>
  )
}
