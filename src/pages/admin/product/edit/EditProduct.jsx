import React, { useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import Input from '../../../../components/input/Input'
import SelectInput from '../../../../components/input/selectInput/SelectInput'
import TextArea from '../../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import Button from '../../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { EditProductContent, EditProductWrapper, ImageWrapper, InputPicture, NameAndFileInput } from './EditProduct.style'
import productPicture from '../../../../images/necklace.jpeg'

export default function EditProduct() {


// customers name
const categoryItem =  [
    {
        title: 'Necklace',
        value: 'necklace'
    },
    {
        title: 'Bungles',
        value: 'bungles'
    },
]
    // customers name
const unitItem =  [
    {
        title: 'Piece',
        value: 'piece'
    },
    {
        title: 'M',
        value: 'm'
    },
]



    // customers name
    const taxItem =  [
        {
            title: 'None',
            value: 0
        },
        {
            title: 'TAX(5%)',
            value: 0.05
        },
        {
            title: 'TAX(7%)',
            value: 0.07
        },
    ]
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [showPicture, setShowPicture] = useState(true);

    // name
    const [name, setName] = useState('Zirconia Necklace');
    const [nameError, setNameError] = useState(false);

// phone
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(false);

    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');

// email
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
// tax
    const [tax, setTax] = useState('');
// address
    const [address, setAddress] = useState('')
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
            navigate(`/suppliers`)
        }
    }

  return (
    <EditProductWrapper>
    {/* Page title */}
        <PageTitle title={'Product'} subTitle={'/ Edit'}/>

        <EditProductContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Update Product'}>
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

                            {/* Category */}
                            <SelectInput options={categoryItem} label={'Category'}/>

                            {/* Unit */}
                            <SelectInput options={unitItem} label={'Units'}/>
                        </AnyItemContainer>

                        <AnyItemContainer justifyContent={'space-between'}>
                            
                            {/* SKU */}
                            <Input 
                                value={phone} 
                                title={'SKU'}
                                onChange={(e)=>handleChange('phone', e)} 
                                error={phoneError} 
                                type={'text'} 
                                label={'SKU'} 
                            />


                           {/* Alert Quantity */}
                           <Input 
                                value={email} 
                                title={'Alert Quantity'}
                                onChange={(e)=>handleChange('email', e)} 
                                error={emailError} 
                                type={'email'} 
                                label={'Alert Quantity'} 
                            />
      
                        </AnyItemContainer>
                       
                        <AnyItemContainer justifyContent={'space-between'}>
                                       {/* description */}
                            <TextArea  
                                label={'Description'}
                                title={'Description'}
                                onChange={(e)=> handleChange('address', e)}
                                value={address}
                                error={addressError}
                                Icon={<FaLocationDot/>}
                            ></TextArea>

                            {/* picture */}
                            <NameAndFileInput>
                            <label htmlFor="fileInput">
                            <span>Picture</span> 
                            {showPicture ? (  <ImageWrapper bg={productPicture}>
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
                         </NameAndFileInput>                             {/* profile picture */}
                        </AnyItemContainer>
                    </ItemContainer>

                    {/* Purchase Info */}
                    <ItemContainer title={'Purchase Info'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                                                        
                            {/* Price */}
                            <Input 
                                value={phone} 
                                title={'Price'}
                                onChange={(e)=>handleChange('phone', e)} 
                                error={phoneError} 
                                type={'number'} 
                                label={'Price'} 
                            />  
                            
                            
                              {/* Tax */}
                              <SelectInput title={'Tax'} options={taxItem} label={'Tax'}/>

                                {/*Purchase Price  */}
                                                         {/* Price */}
                            <Input 
                                value={phone + phone} 
                                title={'Purchase Price'}
                                onChange={(e)=>handleChange('phone', e)} 
                                error={phoneError} 
                                type={'number'} 
                                label={'Purchase Price'} 
                            />  
                        </AnyItemContainer>
                    </ItemContainer>

                    {/* Sales Info */}
                    <ItemContainer title={'Sale Info'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                                                        
                            {/* Price */}
                            <Input 
                                value={phone} 
                                title={'Price'}
                                onChange={(e)=>handleChange('phone', e)} 
                                error={phoneError} 
                                type={'number'} 
                                label={'Price'} 
                            />  
                            
                            
                            {/* Tax */}
                            <SelectInput title={'Tax'} options={taxItem} label={'Tax'}/>

                            {/*Sale Price  */}
                            <Input 
                                value={phone + phone} 
                                title={'Sale Price'}
                                onChange={(e)=>handleChange('phone', e)} 
                                error={phoneError} 
                                type={'number'} 
                                label={'Sale Price'} 
                            />  
                        </AnyItemContainer>

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Updating...'}/> : 'Update Product'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditProductContent>
    </EditProductWrapper>
  )
}

