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
import { TopCard, TopCardContent, TopCardContentWrapper, TopCardIcon } from '../../home/Home.style'
import { TopCardItemList } from '../../../../data/TopcardItems'



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
    const [companyData, setCompanyData] = useState('')
    
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
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* <TopCardContent>
                    <TopCardContentWrapper>
                                  <TopCard bg={'green'}>
                                      <TopCardIcon>
                                      {item.icon}
                                      </TopCardIcon>
                                      <h2>{item.count}</h2>
                                      <p>{item.title}</p>
                                  </TopCard>
                    </TopCardContentWrapper>   
                  </TopCardContent> */}
          <ProductDetailContent>
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
                          <span><b>Unit</b></span>
                          <span>{prodData.unit?.title}</span>
                       </InnerWrapper>
                  </AnyItemContainer>    
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Status</b></span>
                          <span>{prodData?.status}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>

              {/* Price section */}
              <ItemContainer title={'Price'}> 

                <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Price</b></span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{prodData?.price}</span>
                       </InnerWrapper>
                </AnyItemContainer>
                <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Tax</b></span>
                          <span>{prodData?.tax}%</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Tax Type</b></span>
                          <span>{prodData?.taxType}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Purchase Price</b></span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{prodData?.purchasePrice}</span>
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
                          <span><b>Selling Price</b></span>
                          <span><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{prodData?.salePrice}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                </ItemContainer>

            {/* Quantity section */}
              <ItemContainer title={'Quantity'}>
                <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Alert Quantity</b></span>
                          <span>{prodData?.quantityAlert}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Quantity In stock</b></span>
                          <span>{prodData?.purchaseQuantity - prodData?.saleQuantity}</span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                  <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Quantity Sold</b></span>
                          <span>{prodData?.saleQuantity}</span>
                       </InnerWrapper>
                  </AnyItemContainer>                 
                   <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b>Quantity Purchased</b></span>
                          <span>{prodData?.purchaseQuantity}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                </ItemContainer>
            </ProductDetailData>

            <ProductDetailPicture>
          <ItemContainer title={'Total Sale'}> 
              <AnyItemContainer>
                       <InnerWrapper wd={'100%'}>
                          <span><b style={{color:"green"}}>Sale</b></span>
                          <span><b style={{color:"green"}}><span dangerouslySetInnerHTML={{ __html: companyData.currencySymbol }}/>{(prodData?.saleQuantity) + (prodData?.salePrice)}</b></span>
                       </InnerWrapper>
                  </AnyItemContainer> 
                </ItemContainer>

                <ItemContainer title={'Product Picture'}> 
                  <PictureWrapper onClick={()=>setShowProdImage(true)} heights={'300px'} imgUrl={prodData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${prodData?.imgUrl}` : productPicture}></PictureWrapper>          
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
            </ProductDetailPicture>
          </ProductDetailContent> 
          </div>
          }
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
