import React, { useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import Input from '../../../../components/input/Input'
import TextArea from '../../../../components/input/textArea/TextArea'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import Button from '../../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import { FaLocationDot } from 'react-icons/fa6'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { AiFillPicture } from 'react-icons/ai'
import { AddCategoryContent, AddCategoryWrapper, ImageWrapper, InputPicture, NameAndFileInput } from './editCategory.style'
import catPiture from '../../../../images/product_placeholder.jpg'

export default function EditCategory() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
        const [showPicture, setShowPicture] = useState(true);

    // title
    const [title, setTitle] = useState('Necklace');
    const [titleError, setTitleError] = useState(false);


    const [file, setFile] = useState('');
    let [photo, setPhoto] = useState('');


// note
    const [note, setNote] = useState('')
    const [noteError, setNoteError] = useState(false);

    const handleChange = (type, e) =>{
        if(type === 'title'){
            setTitle(e.target.value);
            setTitleError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
            setNoteError(false);
        }else if(type === 'file'){
            setFile(e.target.files[0])
            setShowPicture(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = true;

        if(!title){
            setTitleError(true);
            isValid = false;
        }

        if(isValid){
            setIsLoading(true)
            navigate(`/categories`)
        }
    }

  return (
    <AddCategoryWrapper>
    {/* Page title */}
        <PageTitle title={'Category'} subTitle={'/ Add'}/>

        <AddCategoryContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New Category'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* name */}
                            <Input 
                                value={title} 
                                title={'Title'}
                                onChange={(e)=>handleChange('title', e)} 
                                error={titleError} 
                                type={'text'} 
                                label={'Title'} 
                            />
                        </AnyItemContainer>
                       
                        <AnyItemContainer justifyContent={'space-between'}>
                            <TextArea  
                                label={'Note'}
                                title={'Note'}
                                onChange={(e)=> handleChange('address', e)}
                                value={note}
                                error={noteError}
                                Icon={<FaLocationDot/>}
                            ></TextArea>
                                                                                                                   {/* profile picture */}
                                                                                                                   <NameAndFileInput>
                            <label htmlFor="fileInput">
                            <span>Picture</span> 
                            {showPicture ? (  <ImageWrapper bg={catPiture}>
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
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add Category'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </AddCategoryContent>
    </AddCategoryWrapper>
  )
}

