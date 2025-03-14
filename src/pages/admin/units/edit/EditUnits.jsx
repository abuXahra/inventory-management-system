import React, { useState } from 'react'
import PageTitle from '../../../../components/page_title/PageTitle'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import Input from '../../../../components/input/Input'
import SelectInput from '../../../../components/input/selectInput/SelectInput'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import Button from '../../../../components/clicks/button/Button'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer } from '../../sale/Add/addSale.style'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { EditUnitContent, EditUnitWrapper } from './editUnits.style'

export default function AddUnits() {

// Unit items
const unitNameItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'Piece',
        value: 'Piece'
    },
    {
        title: 'Carton',
        value: 'carton'
    },
    {
        title: 'Box',
        value: 'Box'
    },
    {
        title: 'Kg',
        value: 'Kg'
    },
    {
        title: 'Gram',
        value: 'Gram'
    },

]

    // unit status item
const unitStatusItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'ON',
        value: 'ON'
    },
    {
        title: 'OFF',
        value: 'OFF'
    },
]


    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);


// unit name
const [unitName, setUnitName] = useState(unitNameItems[2].value);
const [unitNameError, setUnitNameError] = useState(false);


// unit note
    const [note, setNote] = useState('Unit of ' + unitName);
    const [noteError, setNoteError] = useState(false);


// unit status
    const [unitStatus, setUnitStatus] = useState(unitStatusItems[2].value)
    const [unitStatusError, setUnitStatusError] = useState(false);
    

    const handleChange = (type, e) =>{
        if(type === 'unitName'){
            setUnitName(e.target.value);
            setNote('Unit of ' + e.target.value);
            setUnitNameError(false);
            setNoteError(false);
        }else if(type === 'status'){
            setUnitStatus(e.target.value);
            setUnitStatusError(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = true;

        if(!unitName){
            setUnitNameError(true);
            isValid = false;
        }

        if(!note){
            setNoteError(true);
            isValid = false;
        }

        
        if(!unitStatus){
            setUnitStatusError(true);
            isValid = false;
        }

        if(isValid){
            setIsLoading(true)
            navigate(`/units`)
        }
    }

  return (
    <EditUnitWrapper>
    {/* Page title */}
        <PageTitle title={'Unit'} subTitle={' / Edit'}/>

        <EditUnitContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'Edit Unit'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* Unit Name */}
                            <Input 
                                onChange={(e)=>handleChange('unitName', e)} 
                                error={unitNameError} 
                                value={unitName}
                                label={'Unit Name'}
                                title={'Unit Name'}    
                            />


                   
                            {/* Note */}
                            <Input 
                                value={note} 
                                title={'Note'}
                                onChange={(e)=>handleChange('note', e)}  
                                type={'text'} 
                                label={'Note'} 
                                error={noteError}
                            />

                             {/* Unit Status */}
                             <SelectInput 
                                onChange={(e)=>handleChange('status', e)} 
                                error={unitStatusError} 
                                options={unitStatusItems} 
                                label={'Unit Status'}
                                title={'Unit Status'}
                                value={unitStatus}
                                />
                      </AnyItemContainer>

                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Updating...'}/> : 'Update Unit'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </EditUnitContent>
    </EditUnitWrapper>
  )
}

