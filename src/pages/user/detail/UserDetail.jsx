import React, {useState, useEffect} from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import { UserDetailContent, UserDetailData, UserDetailPicture, UserDetailWrapper, PictureWrapper } from './userDetail.style'
import profilePicture from '../../../images/professional_passport.png'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import ItemContainer from '../../../components/item_container/ItemContainer'
import { AnyItemContainer, InnerWrapper } from '../../admin/sale/Add/addSale.style'
import axios from 'axios'
import profilPiture from '../../../images/placeholder_image.png'
import Overlay from '../../../components/overlay/Overlay'
import { toast } from 'react-toastify'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ContentLoader, {
  List, 
  BulletList,
  Facebook,
  Instagram
} from 'react-content-loader'




export default function UserDetail() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const {userId} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteCard, setShowDeleteCard] = useState(false);
  const [grabId, setGrabId] = useState('');
  const [grabUsername, setGrabUsername] = useState('');


  

// Fetch user detail function
useEffect(()=>{
  const fetchUser = async() =>{
    setIsLoading(true)
      try {
          const res = await axios.get(`${process.env.REACT_APP_URL}/api/users/${userId}`);
          console.log(res.data);          
          setUserData(res.data);
          setIsLoading(false);
      } catch (error) {
          console.log(error);
          setIsLoading(false);
      }

  }
  fetchUser();
},[userId])


const handleGrabId = (userName)=>{
  setShowDeleteCard(true);
  setGrabUsername(userName);

}


  // handle user delete
        const deleteUser = async (userId) => {
          setIsLoading(true);
          try {
             
            await axios.delete(`${process.env.REACT_APP_URL}/api/users/${userId}`);
           
              toast.success('User deleted successfully');
              setShowDeleteCard(false); // Close modal
              setIsLoading(false);
              navigate('/users')
          } catch (error) {
            return { success: false, message: error.message };
          }
        };
  


  return (
        <UserDetailWrapper>
          <PageTitle title={'User'} subTitle={' / View'}/>

          {/* content */}
          <>
        {isLoading?
        <List/> :
          <UserDetailContent>
            
            <UserDetailPicture>
              <ItemContainer title={'Profile Picture'}> 
                <PictureWrapper imgUrl={userData?.imgUrl ? `${process.env.REACT_APP_URL}/images/${userData?.imgUrl}` : profilPiture}>
                  {/* <img src={userData ? `${process.env.REACT_APP_URL}/images/${userData.imgUrl}` : profilPiture} alt="" srcset="" /> */}
                </PictureWrapper>
                
              </ItemContainer>
            </UserDetailPicture>
            
            <UserDetailData>
              <ItemContainer title={'User Detail'}> 
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Name</b></span>
                          <span>{userData?.username}</span>
                       </InnerWrapper>
              </AnyItemContainer>
              <AnyItemContainer gap="60px">
              <InnerWrapper wd={'100%'}>
                          <span><b>Phone Number</b></span>
                          <span>{userData?.phoneNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Email</b></span>
                          <span>{userData?.email}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                  <InnerWrapper wd={'100%'}>
                          <span><b>Tax Number</b></span>
                          <span>{userData?.taxNumber}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
                  <AnyItemContainer gap="60px">
                        <InnerWrapper wd={'100%'}>
                          <span><b>Address</b></span>
                          <span>{userData?.address}</span>
                       </InnerWrapper>
                  </AnyItemContainer>
              </ItemContainer>

                            <ItemContainer title={'Action'}> 
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>handleGrabId(userData?.username)} style={{color: "red", cursor: "pointer"}}><b>Delete</b></span>
                                          <span onClick={()=>handleGrabId(userData?.username)} style={{color: "red", cursor: "pointer"}}><FaTrash/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                              <AnyItemContainer gap="60px">
                                    <InnerWrapper wd={'100%'}>
                                          <span onClick={()=>navigate(`/users/${userData?._id}`)} style={{color: "green", cursor: "pointer"}}><b>Edit</b></span>
                                          <span onClick={()=>navigate(`/edit-user/${userData?._id}`)} style={{color: "green", cursor: "pointer"}}><FaEdit/></span>
                                    </InnerWrapper>
                              </AnyItemContainer>
                            </ItemContainer>
            </UserDetailData>
          </UserDetailContent> }
          </>
          {showDeleteCard &&
                  <Overlay 
                    contentWidth={'30%'}
                    overlayButtonClick={()=>deleteUser(userData?._id)}
                    closeOverlayOnClick={()=>setShowDeleteCard(false)}
                    btnText1={isLoading ? <ButtonLoader text={'Deleting...'}/> : 'Yes'}
                  >
                    <p style={{margin: "40px", textAlign:"center", fontSize:"12px", lineHeight: "25px"}}>
                            Are you sure You want to delete the user <b style={{textTransform:"capitalize"}}>{grabUsername} </b> 
                      </p>
              
                  </Overlay>
                }
          
                {/* Toast message user component */}
                <ToastComponents/>
      </UserDetailWrapper>
    )
}
