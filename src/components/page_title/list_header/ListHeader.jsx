import React from 'react'
import { FaDesktop, FaList, FaPlus, FaSearch } from 'react-icons/fa'
import { ListHeaderWrapper } from './listHeader.style'
import Button from '../../clicks/button/Button'
import Input from '../../input/Input'

function ListHeader({ title, btnOnClick, searQuery, onChange, type, dataLength, icon, inputDisplay, entries, }) {
  return (
    <ListHeaderWrapper>
      <span> 
        <FaList />  
        <p>List</p>

        <p>{dataLength}</p> 
        <p>{entries || 'Entries'}</p> 

        <div style={{marginLeft: "20px"}}>
      <Input
            bdColor={'white'}
            placeholder={`Search by ${searQuery}`}
            onChange={onChange}
            Icon={<FaSearch/>}
            type={type}
            inputDisplay={inputDisplay}
          />
        </div>

      </span>
      
      <span>
    
        <Button
          btnPd={"0"}
          btnTxtClr={'white'}
          btnColor={'transparent'}
          btnDisplay={'flex'}
          btnText={title}
          btnLeftIcon={icon || <FaPlus />}
          btnFontSize={'12px'}
          btnOnClick={btnOnClick}
        />
      </span>
    </ListHeaderWrapper>
  )
}

export default ListHeader