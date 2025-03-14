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
import { AddTaxContent, AddTaxWrapper } from './addTax.style'

export default function AddTax() {

// Payment for
const taxNameItems =  [
    {
        title: 'select',
        value: ''
    },
    {
        title: 'None',
        value: 0
    },
    {
        title: 'TAX (5%)',
        value: 5
    },
    {
        title: 'Vat + Tax (7%)',
        value: 7
    },

]
    // invoice number
const taxStatusItems =  [
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



// tax name
    const [taxName, setTaxName] = useState('');
    const [taxNameError, setTaxNameError] = useState(false);


  
// tax status
    const [taxStatus, setTaxStatus] = useState('')
    const [taxStatusError, setTaxStatusError] = useState(false);
    

    const handleChange = (type, e) =>{
        if(type === 'taxName'){
            setTaxName(e.target.value);
            setTaxNameError(false);
        }else if(type === 'taxStatus'){
            setTaxStatus(e.target.value);
            setTaxStatusError(false);
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = true;

        if(!taxName){
            setTaxNameError(true);
            isValid = false;
        }

        if(!taxStatus){
            setTaxStatusError(true);
            isValid = false;
        }

        if(isValid){
            setIsLoading(true)
            navigate(`/tax`)
        }
    }

  return (
    <AddTaxWrapper>
    {/* Page title */}
        <PageTitle title={'Tax'} subTitle={' / Add'}/>

        <AddTaxContent>
            <form action="" onSubmit={submitHandler}>
                    <ItemContainer title={'New Tax'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            {/* Tax Name */}
                            <Input 
                                onChange={(e)=>handleChange('taxName', e)} 
                                error={taxNameError} 
                                value={taxName}
                                label={'Tax Name'}
                                title={'Tax Name'}    
                            />


                             {/* Tax Status */}
                             <SelectInput 
                                onChange={(e)=>handleChange('taxStatus', e)} 
                                error={taxStatusError} 
                                options={taxStatusItems} 
                                label={'Tax Status'}
                                title={'Tax Status'}
                                />
                      </AnyItemContainer>

                 

                        {/* button */}
                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <div>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading? <ButtonLoader text={'Adding...'}/> : 'Add Tax'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                            </div>
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
        </AddTaxContent>
    </AddTaxWrapper>
  )
}

