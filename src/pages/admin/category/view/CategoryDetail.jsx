import React, { useEffect, useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import profilePicture from '../../../../images/professional_passport.png'
import { AnyItemContainer, InnerWrapper } from '../../sale/Add/addSale.style'
import { FaEdit, FaList, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import { CategoryDetailContent, CategoryDetailData, CategoryDetailPicture, CategoryDetailWrapper } from './categoryDetail.style'
import catPicture from '../../../../images/product_placeholder.jpg'
import axios from 'axios'
import { List } from 'react-content-loader'
import Overlay from '../../../../components/overlay/Overlay'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../../components/toast_message/toast_component/ToastComponents'
import { toast } from 'react-toastify'
import { PictureWrapper } from '../../../user/detail/userDetail.style'



export default function CategoryDetail() {

  const navigate = useNavigate();
  const {categoryId} = useParams();
  const [catData, setCatData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
    const [showDeleteCard, setShowDeleteCard] = useState(false);
    const [grabId, setGrabId] = useState('');
    const [grabTitle, setGrabTitle] = useState('');

  // Fetch category detail
  useEffect(()=>{
    const fetchCategory = async() =>{
      setIsLoading(true)
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/api/category/${categoryId}`);        
            console.log('====== cat data: \n', res.data, '==================')
            setCatData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
  
    }
    fetchCategory();
  },[categoryId])
  


const handleGrabId = (title)=>{
  setShowDeleteCard(true);
  setGrabTitle(title);

}


  // handle user delete
        const deleteUser = async (catId) => {
          setIsLoading(true);
          try {
             
            await axios.delete(`${process.env.REACT_APP_URL}/api/category/${categoryId}`);
           
              toast.success('Category deleted successfully');
              setShowDeleteCard(false); // Close modal
              setIsLoading(false);
              navigate('/categories')
          } catch (error) {
            return { success: false, message: error.message };
          }
        };
  
  
  return (
        <CategoryDetailWrapper>
          <PageTitle title={'Category'} subTitle={' / View'}/>

          {/* content */}
        <>
        {isLoading?
          <List/> :
          <CategoryDetailContent>
            
            <CategoryDetailPicture>
              <ItemContainer title={'Category Picture'}> 
                 <PictureWrapper imgUrl={catData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${catData?.imgUrl}` : catPicture}></PictureWrapper>               
                {/* <img src={catPicture} alt="" srcset="" /> */}
              </ItemContainer>
            </CategoryDetailPicture>
            <CategoryDetailData>
              <ItemContainer title={'Category Detail'}> 
              <AnyItemContainer gap="60px">
                    <InnerWrapper wd={'100%'}>
                          <span><b>Title</b></span>
                          <span>{catData?.title}</span>
                       </InnerWrapper>
              </AnyItemContainer>
                  <AnyItemContainer gap="60px"> 
                       <InnerWrapper wd={'100%'}>
                          <span><b>Note</b></span>
                          <span>{catData?.note}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="20px"> 
                  <InnerWrapper wd={'100%'}>
                          <span><b>Status</b></span>
                          <span>{catData?.status}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>
              <ItemContainer title={'Action'}> 
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>navigate(`/edit-category/${catData._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                            <span onClick={()=>navigate(`/edit-category/${catData._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                      </InnerWrapper>
                </AnyItemContainer>
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>navigate(`/categories`)} style={{color: "blue", cursor: "pointer"}}><b>List</b></span>
                            <span onClick={()=>navigate(`/categories`)} style={{color: "blue", cursor: "pointer"}}><FaList/></span>
                      </InnerWrapper>
                </AnyItemContainer>
                <AnyItemContainer gap="60px">
                      <InnerWrapper wd={'100%'}>
                            <span onClick={()=>handleGrabId(catData?.title)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                            <span onClick={()=>handleGrabId(catData?.title)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                      </InnerWrapper>
                </AnyItemContainer>
              </ItemContainer>
            </CategoryDetailData>
          </CategoryDetailContent> 
          } 
          </>

          {/* overlay popup */}
          { showDeleteCard &&
           <Overlay 
           contentWidth={'30%'}
           overlayButtonClick={()=>deleteUser(catData?._id)}
           closeOverlayOnClick={()=>setShowDeleteCard(false)}
           btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
           >
           <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
           Are you sure You want to delete the Category <b style={{textTransform:"capitalize"}}>{grabTitle} </b> 
           </p>
           </Overlay>
           }
                    
           {/* Toast message user component */}
           <ToastComponents/>
      </CategoryDetailWrapper>
  )
}
