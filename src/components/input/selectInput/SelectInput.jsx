

import React from 'react'
import { SelectInputError, SelectInputLabel, SelectInputOption, SelectInputStyle, SelectInputWrapper } from './SelectInput.style'

export default function SelectInput({title, error,options, label, onChange, value}) {


  return (
    <SelectInputWrapper>
        <SelectInputLabel htmlFor="country">{label}</SelectInputLabel>
        <SelectInputStyle value={value} id="country" name="country" onChange={onChange}>
           
           {options && 
           options.map((option, i)=>(
                  <SelectInputOption value={option.value}>
                    {option.title}
                  </SelectInputOption>
           ))}
          
        </SelectInputStyle>
        {error? <SelectInputError>{title} is required</SelectInputError> : '' }
    </SelectInputWrapper>
  )
}
