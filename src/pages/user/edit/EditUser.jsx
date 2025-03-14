import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaLocationDot } from 'react-icons/fa6'
import { AiFillPicture } from 'react-icons/ai'
import { ImageWrapper, InputPicture, NameAndFileInput, EditUserContent, EditUserWrapper } from './editUser.style'
import PageTitle from '../../../components/page_title/PageTitle'
import ItemContainer from '../../../components/item_container/ItemContainer'
import { AnyItemContainer } from '../../admin/sale/Add/addSale.style'
import Input from '../../../components/input/Input'
import TextArea from '../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import Button from '../../../components/clicks/button/Button'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import profilPiture from '../../../images/professional_passport.png'

export default function AddUser() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [showPicture, setShowPicture] = useState(true);
    

    // name
    const [name, setName] = useState('Isah Abdulmumin');
    const [nameError, setNameError] = useState(false);

// phone
    const [phone, setPhone] = useState('+234 813 5701 458');
    const [phoneError, setPhoneError] = useState(false);

    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');

// email
    const [email, setEmail] = useState('abxcybertech@gmail.com');
    const [emailError, setEmailError] = useState(false);
// tax
    const [tax, setTax] = useState('2233455');
// address
    const [address, setAddress] = useState('Mabushi, abUJA')
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

    const submitHandler = (e) => {
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
            setIsLoading(true)
            navigate(`/users`)
        }
    }

  return (
    <EditUserWrapper>
    {/* Page title */}
        <PageTitle title={'User'} subTitle={' / Edit'}/>

        <EditUserContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Edit User'}>
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
                            >
                            </TextArea>
                                                                                                                   {/* profile picture */}
                                                                                                                   <NameAndFileInput>
                            <label htmlFor="fileInput">
                            <span>Picture</span> 
                            {showPicture ? (  <ImageWrapper bg={profilPiture}>
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
                                btnText={isLoading? <ButtonLoader text={'Updating...'}/> : 'Update User'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditUserContent>
    </EditUserWrapper>
  )
}

