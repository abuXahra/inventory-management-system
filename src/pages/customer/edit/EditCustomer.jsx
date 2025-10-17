import React, { useContext, useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import profilPiture from '../../../images/placeholder_image.png'
import { EditCustomerContent, EditCustomerWrapper, ImageWrapper, InputPicture, NameAndFileInput } from './editCustomer.style'
import { UserContext } from '../../../components/context/UserContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { List } from 'react-content-loader'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'

export default function EditCustomer() {

    const navigate = useNavigate();
    const { customerId } = useParams();
    const {user} = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [isBtnLoading, setIsBtnLoading] = useState(false);
    const [showPicture, setShowPicture] = useState(true);

    // name
    const [name, setName] = useState('John  Doe');
    const [nameError, setNameError] = useState(false);

// phone
    const [phone, setPhone] = useState('+234 000 000 000');
    const [phoneError, setPhoneError] = useState(false);

    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');

// email
    const [email, setEmail] = useState('johndoe@mail.com');
    const [emailError, setEmailError] = useState(false);
// tax
    const [tax, setTax] = useState('5567777');
// address
    const [address, setAddress] = useState('your living address')
    const [addressError, setAddressError] = useState(false);

    const handleChange = (type, e) =>{
        if(type === 'name'){
            setName(e.target.value);
            setNameError(false);
        }else if(type === 'phone'){
            setPhone(e.target.value);
            setPhoneError(false);
        }else if(type === 'file'){
            setFile(e.target.files[0])
            setShowPicture(false);
        }else if(type === 'email'){
            setEmail(e.target.value);
            setEmailError(false);
        }else if(type === 'tax'){
            setTax(e.target.value);
        }else if(type === 'address'){
            setAddress(e.target.value);
            setAddressError(false);
        }
    }

// fetch customer detail
        useEffect(()=>{
            const fetchCustomer = async() =>{
                setIsLoading(true)
                try {
                    const res = await axios.get(`${process.env.REACT_APP_URL}/api/customers/${customerId}`);
                   
                    console.log(res.data);
        
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPhone(res.data.phoneNumber);
                    setTax(res.data.taxNumber);
                    setAddress(res.data.address);
                    setFile(res.data.imgUrl);
                    setIsLoading(false);

                } catch (error) {
                    console.log(error)
                    setIsLoading(false);
                }
        
            }
            fetchCustomer();
        },[customerId])
    

    const submitHandler = async (e) => {
        e.preventDefault();
        let isValid = true;

        if(!name){
            setNameError(true);
            isValid = false;
        }

        if(!phone){
            setPhoneError(true);
            isValid = false;
        }

        if(!email){
            setEmailError(true);
            isValid = false;
        }

        
        if(!address){
            setAddressError(true);
            isValid = false;
        }
        if(isValid){
              const updateCustomer ={
                    name: name,
                    email: email,
                    phoneNumber: phone,
                    taxNumber: tax,
                    address: address,
                    userId: user._id,
              }
                                        
            if (file) {
                const data = new FormData()
                const filename = file.name
                data.append('img', filename)
                data.append('file', file)
                updateCustomer.imgUrl = filename
                
                // img upload
                try {
                        const imgUpload = await axios.post(`${process.env.REACT_APP_URL}/api/upload`, data)
                        console.log(imgUpload.data)
                        } catch (err) {
                            console.log(err)
                            }
                }
                setIsBtnLoading(true)
                        
                try {
                    const res = await axios.put(`${process.env.REACT_APP_URL}/api/customers/${customerId}`, updateCustomer)
                    console.log(res.data);
                    setIsLoading(false);
                                               
                    // toast success message
                    toast.success('Customer Updated Successfully')
                    setIsBtnLoading(false)
                    // navigate(`/customers`)
                    
                } catch (err) {
                    setIsLoading(false);  
                    
                    // If title already exists, show the error toast
                    if (err.response && err.response.data && err.response.data.message) {
                        toast.error(err.response.data.message); // Show the title already exists message
                    } else {
                        toast.error('An error occurred while updating');
                    }
                }
        }
    }

  return (
    <EditCustomerWrapper>
    {/* Page title */}
        <PageTitle title={'Customer'} subTitle={'/ Edit'}/>
        <>
        {isLoading? <List/> :
        <EditCustomerContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Update Customer'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* name */}
                            <Input 
                                value={name} 
                                title={'Name'}
                                onChange={(e)=>handleChange('name', e)} 
                                error={nameError} 
                                type={'text'} 
                                label={'Name'} 
                            />

                            {/* Phone number */}
                            <Input 
                                value={phone} 
                                title={'Phone'}
                                onChange={(e)=>handleChange('phone', e)} 
                                error={phoneError} 
                                type={'text'} 
                                label={'Phone No.'} 
                            />
                        </AnyItemContainer>
                        <AnyItemContainer justifyContent={'space-between'}>
                           {/* Email */}
                           <Input 
                                value={email} 
                                title={'Email'}
                                onChange={(e)=>handleChange('email', e)} 
                                error={emailError} 
                                type={'email'} 
                                label={'Email'} 
                            />
    
                            {/* Tax Number*/}
                            <Input 
                                value={tax} 
                                onChange={(e)=>{}} 
                                type={'text'} 
                                label={'Tax No.'} 
                            />
                        </AnyItemContainer>
                        <AnyItemContainer justifyContent={'space-between'}>
                            <TextArea  
                                label={'Address'}
                                title={'Address'}
                                onChange={(e)=> handleChange('address', e)}
                                value={address}
                                error={addressError}
                                Icon={<FaLocationDot/>}
                            ></TextArea>
                        
                        {/* profile picture */}
                        <NameAndFileInput>
                            <label htmlFor="fileInput">
                            <span>Picture</span> 
                            {showPicture ? 
                            (  <ImageWrapper bg={file ? `${process.env.REACT_APP_URL}/images/${file}` : profilPiture}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) :      
                         (<>  { 
                            file ?     
                                (<ImageWrapper bg={URL.createObjectURL(file)}>
                                        {/* {file && <img src={URL.createObjectURL(file)} alt="" srcset="" />} */}
                                </ImageWrapper>) 
                                : <AiFillPicture />
                            }
                            </> 
                            )} 
                        </label>
                            <InputPicture onChange={(e)=>handleChange('file', e)} type="file" id="fileInput" />
                         </NameAndFileInput>
                        </AnyItemContainer>

                        <ItemButtonWrapper btnAlign={'space-between'}>

                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isBtnLoading? <ButtonLoader text={'Updating...'}/> : 'Update'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditCustomerContent>
        }
        </>
    {/* Toast message user component */}
    <ToastComponents/>
    </EditCustomerWrapper>
  )
}

