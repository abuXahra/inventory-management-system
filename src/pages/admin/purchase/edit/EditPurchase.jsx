
import React, { useState } from 'react'
import ItemContainer from '../../../../components/item_container/ItemContainer'
import Input from '../../../../components/input/Input'
import SelectInput from '../../../../components/input/selectInput/SelectInput'
import { ProductItemList } from '../../../../data/productItems'
import Button from '../../../../components/clicks/button/Button'
import { ItemButtonWrapper } from '../../../../components/item_container/itemContainer.style'
import TextArea from '../../../../components/input/textArea/TextArea'
import { FaTrash } from 'react-icons/fa'
import PageTitle from '../../../../components/page_title/PageTitle'
import { useNavigate } from 'react-router-dom'
import { AnyItemContainer, EditPurchaseContent, EditPurchaseWrapper, HrStyled, InnerWrapper, ItemListContent, ItemsWrapper, SelectItemContent, SupplierInfoWrapper, TableStyled, TdStyled, TotalChargesWrapper } from './editPurchase.style'

export default function EditPurchase() {

const [itemList, setItemList] = useState(ProductItemList);
const navigate = useNavigate()

// TextITe
const TaxItem = [
    {
        title: 'none',
        value: '0'
    },
    {
        title: '5',
        value: 0.05
    },
    
    {
        title: '7',
        value: 0.07
    },

] 

// customers name
const customersName =  [
    {
        title: 'Isah Abdulmumin',
        value: 'Isah Abdulmumin'
    },
    {
        title: 'Fatima Idris',
        value: 'Isah Abdulmumin'
    },
]


// customers name
const saleStatus =  [
    {
        title: 'received',
        value: 'received'
    },
    {
        title: 'Not Recieved',
        value: 'Isah Abdulmumin'
    },
]


// customers name
const paymentType =  [
    {
        title: 'Cash',
        value: 'Cash'
    },
    {
        title: 'Online Transfer',
        value: 'Bank Transfer'
    },
    {
        title: 'Bank Transfer',
        value: 'Bank Transfer'
    },
]



  return (
    <EditPurchaseWrapper>
                {/* Page title */}
                <PageTitle title={'Purchase'} subTitle={'/ Edit'}/>
        <EditPurchaseContent>
        <ItemsWrapper>
            {/* SelectItem */}
            <SelectItemContent>
                    <form action="">
                    <ItemContainer title={'Select Items'}> 
                        <AnyItemContainer>
                            <SelectInput options={itemList} label={'Item Name'}/>
                            <Input label={'Quantity'} />
                            <Input label={'Price'} />
                            <SelectInput options={TaxItem} label={'Tax(%)'}/>
                            <Input label={'Tax Amount'} />
                            <Input label={'Unit Cost'} />
                            <Input label={'Amount'} />
                        </AnyItemContainer>    
                            
                    
                            <ItemButtonWrapper btnAlign={'flex-end'}>
                                <Button
                                title={'Select Items'}
                                btnText={'Add to list'}
                                btnFontSize={'12px'}
                                btnColor={'orange'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                />
                        </ItemButtonWrapper>
                    </ItemContainer>              
                        </form>
                </SelectItemContent>
  
                   
            {/* ItemList */}
            <ItemListContent>
                <ItemContainer title={'Item List'}>
                <TableStyled>
                    <thead>
                        <TdStyled><b>#</b></TdStyled>
                        <TdStyled><b>Item Name</b></TdStyled>
                        <TdStyled><b>Price</b></TdStyled>
                        <TdStyled><b>Tax(%)</b></TdStyled>
                        <TdStyled><b>Tax Amount</b></TdStyled>
                        <TdStyled><b>Unit Cost</b></TdStyled>
                        <TdStyled><b>Amount</b></TdStyled>
                        <TdStyled><b>Action</b></TdStyled>
                    </thead>
                    <tbody>
                    {itemList.map((data, i)=>(
                        <tr key={i}>
                            <TdStyled>{i+1}</TdStyled>
                            <TdStyled>{data.title}</TdStyled>
                            <TdStyled>{data.price}</TdStyled>
                            <TdStyled>None</TdStyled>
                            <TdStyled>0.00</TdStyled>
                            <TdStyled>{data.price}</TdStyled>
                            <TdStyled>{data.qty + data.price }</TdStyled>
                            <TdStyled><span><FaTrash/></span></TdStyled>
                        </tr>
                    ))
                }
                    </tbody>
                </TableStyled>

                <HrStyled />
                
                {/* Total ChargesSection */}
                <TotalChargesWrapper>            
                   {/* Total quantities */}
                    <AnyItemContainer justifyContent={'space-between'}>
                        <InnerWrapper>
                            <span><b>Total Quatities</b></span>
                            <span>2</span>
                        </InnerWrapper>
                        <InnerWrapper>
                            <span><b>Sub Total</b></span>
                            <span>N306</span>
                        </InnerWrapper>
                    </AnyItemContainer>
                   
                   {/* Other Charges */}
                    <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b> Other Charges</b></span>
                                <span>
                                    <Input
                                        placeholder={'Other Charges'}  
                                    />
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Other Charges</b></span>
                                <span>N0</span>
                            </InnerWrapper>
                    </AnyItemContainer>


                          {/* Discount */}
                          <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b>Discount</b></span>
                                <span>
                                    <Input
                                        placeholder={'Discount'}  
                                    />
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Other Charges</b></span>
                                <span>N0</span>
                            </InnerWrapper>
                    </AnyItemContainer>

                     {/* Grand Total */}
                     <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b>Note</b></span>
                                <span>
                                    <TextArea
                                        placeholder={'Note'}  
                                        inputPadding={'5px'}
                                    ></TextArea>
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Grand Total</b></span>
                                <span>N300</span>
                            </InnerWrapper>
                    </AnyItemContainer>
                </TotalChargesWrapper>
                </ItemContainer>       
            </ItemListContent>
        </ItemsWrapper>

{/* Supply info */}
        <SupplierInfoWrapper>
            <form action="" onSubmit={()=>navigate(`/purchase-invoice/${1}`)}>
                <ItemContainer title={'Supply Info'}>
                    <Input type={'date'} label={'Date'} />
                    <SelectInput options={customersName} label={'Supply Name'}/>
                    <SelectInput options={saleStatus} label={'Status'}/>
                    <Input type={'text'} label={'Reference'} />
                </ItemContainer>
                <ItemContainer title={'Payment Info'}>
                    <Input type={'text'} label={'Amount'} />
                    <SelectInput options={paymentType} label={'Payment Type'}/>
                    <TextArea label={'Note'}/>
                    {/* Add to sale button */}
                    <ItemButtonWrapper btnAlign={'flex-start'}>
                                <Button
                                    title={'Select Items'}
                                    btnText={'Update Purchase'}
                                    btnFontSize={'12px'}
                                    btnColor={'green'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                />
                        </ItemButtonWrapper>
                </ItemContainer>
            </form>
        </SupplierInfoWrapper>
        </EditPurchaseContent>
    </EditPurchaseWrapper>
  )
}
