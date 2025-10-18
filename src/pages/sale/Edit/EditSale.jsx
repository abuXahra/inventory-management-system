import React, { useContext, useEffect, useState } from 'react'
import ItemContainer from '../../../components/item_container/ItemContainer'
import Input from '../../../components/input/Input'
import SelectInput from '../../../components/input/selectInput/SelectInput'
import { ProductItemList } from '../../../data/productItems'
import Button from '../../../components/clicks/button/Button'
import { ItemButtonWrapper } from '../../../components/item_container/itemContainer.style'
import TextArea from '../../../components/input/textArea/TextArea'
import { FaTrash } from 'react-icons/fa'
import PageTitle from '../../../components/page_title/PageTitle'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../../components/context/UserContext'
import { toast } from 'react-toastify'
import ButtonLoader from '../../../components/clicks/button/button_loader/ButtonLoader'
import ToastComponents from '../../../components/toast_message/toast_component/ToastComponents'
import { AddSalesContent, AddSalesWrapper, CustomerInfoWrapper, EditSalesContent, EditSalesWrapper, HrStyled, ItemListContent, ItemsWrapper, SelectItemContent, TotalChargesWrapper } from './editSale.style'
import { AnyItemContainer, DropdownItems, DropdownWrapper, InnerWrapper, TableResponsiveWrapper, TableStyled, TdStyled } from '../../purchase/add/addPurchase.style'
import { List } from 'react-content-loader'
import { token } from '../../../components/context/UserToken'


export default function EditSale() {

// const [productItemList, setProductItemList] = useState(ProductItemList);
  const {saleId} = useParams();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const {user} = useContext(UserContext);

const [itemList, setItemList] = useState([]);
const [productId, setProductId] = useState('');



const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD (2025-02-29)

const [searchTitle, setSearchTitle] = useState('');
const [searchTitleError, setSearchTitleError] = useState(false);

const [title, setTitle] = useState('');
const [titleError, setTitleError] = useState(false);

const [quantity, setQuantity] = useState('');
const [quantityError, setQuantityError] = useState(false);

const [price, setPrice] = useState('');
const [priceError, setPriceError] = useState(false);

const [tax, setTax] = useState('');
const [taxError, setTaxError] = useState(false);

const [taxAmount, setTaxAmount] = useState('');
const [taxAmountError, setTaxAmountError] = useState(false);

const [unitCost, setUnitCost] = useState('');
const [unitCostError, setUnitCostError] = useState(false);

const [amount, setAmount] = useState('');
const [amountError, setAmountError] = useState(false);

{/* Customer info */}
const [saleDate, setSaleDate] = useState(todayDate);
const [saleDateError, setSaleDateError] = useState(false);

const [customer, setCustomer] = useState('');
const [customerNameError, setCustomerNameError] = useState(false);

const [saleStatus, setSaleStatus] = useState('');
const [saleStatusError, setSaleStatusError] = useState(false);

const [reference, setReference] = useState('');

const [saleAmount, setSaleAmount] = useState('');
const [saleAmountError, setSaleAmountError] = useState(false);

const [paymentType, setPaymentType] = useState('');
const [paymentTypeError, setPaymentTypeError] = useState(false);

const [paymentStatus, setPaymentStatus] = useState('');
const [paymentStatusError, setPaymentStatusError] = useState(false);

const [note, setNote] = useState('');

const [showDropdwon, setShowDropdwon] = useState(false);

const [totalQuantity, setTotalQuantity] = useState(0);
const [subTotal, setSubTotal] = useState(0);
const [otherCharges, setOtherCharges] = useState('');
const [discount, setDiscount] = useState('');
const [discountValue, setDiscountValue] = useState(null);
const [shipping, setShipping] = useState('');
const [grandTotal, setGrandTotal] = useState(0);


const [products, setProducts] = useState([]);

const [customerItems, setCustomerItems] = useState([])
const [showCusDropdown, setShowCusDropdown] = useState(false);
const [customerId, setCustomerId] = useState('');


const [showPartialField, setShowPartialField] = useState(false);
const [amountPaid, setAmountPaid] = useState('')
const [amountPaidError, setAmountPaidError] = useState(false);
const [dueBalance, setDueBalance] = useState('');

const [saleCode, setSaleCode] = useState('');
// onchange handler
const handleChange = (type, e)=>{
        if (type === 'searchTitle'){
            setSearchTitle(e.target.value);
            setTitle(e.target.value);
            setTitleError(false);
            
            e.target.value.length > 0 ? 
            setShowDropdwon(true):
            setShowDropdwon(false)

                setTitle('')
                setQuantity('');
                setPrice('')
                setTax('')
                setTaxAmount('')
                setUnitCost('')
                setAmount('')
                setProductId('')

        }else if(type === 'quantity'){
            setQuantity(e.target.value);
            calculateSalePrice(price, tax, e.target.value);
            setQuantityError(false);
        }else if(type === 'price'){
            setPrice(e.target.value);
            calculateSalePrice(e.target.value, tax, quantity);
            setPriceError(false);
        }else if(type === 'tax'){
            setTax(e.target.value);
            calculateSalePrice(price, e.target.value, quantity);
            setTaxError(false);
        }else if(type === 'unit-cost'){
            setUnitCost(e.target.value);
        }else if(type === 'amount'){
            setUnitCost(e.target.value);
        }
        // calculations:
        else if(type === 'otherCharges'){
            setOtherCharges(e.target.value);
        }else if(type === 'discount'){
            setDiscount(e.target.value);
        }else if(type === 'shipping'){
            setShipping(e.target.value);
        }
        // supply info
        else if(type === 'sale-date'){
            setSaleDate(e.target.value);
            setSaleDateError(false);
        }else if(type === 'customer-name'){

            setCustomer(e.target.value);
            setShowCusDropdown(e.target.value.trim().length > 0);
            setCustomerNameError(false);

        }else if(type === 'sale-status'){
            setSaleStatus(e.target.value);
            setSaleStatusError(false);
        }else if(type === 'references'){
            setReference(e.target.value);
        }else if(type === 'sale-amount'){
            setSaleAmount(e.target.value);
            setSaleAmountError(false);
        }else if(type === 'payment-status'){
            setPaymentStatus(e.target.value);
            setPaymentStatusError(false);

            if(e.target.value === 'partial'){
                setShowPartialField(true)
            }else{
                setShowPartialField(false);
            }

            if(e.target.value === 'unpaid'){
                setPaymentType(paymentTypeItems[6].value)
            }else{
                setPaymentType('');
            }
            
        }else if(type === 'amount-paid'){
            setAmountPaid(e.target.value);
            setDueBalance((saleAmount - Number(e.target.value)).toFixed(2))
            setAmountPaidError(false);
        }else if(type === 'payment-type'){
            setPaymentType(e.target.value);
            setPaymentTypeError(false);
        }else if(type === 'note'){
            setNote(e.target.value);
        }
}


// TextITe
const TaxItem = [
    {
        title: 'Select',
        value: ''
    },
    {
        title: 'none',
        value: 0
    },
    {
        title: 'Tax (5%)',
        value: 5
    },
    
    {
        title: 'Vat + Tax (7%)',
        value: 7
    },

] 



// SALE status item name
const saleStatusItem =  [
    {
        title: 'Select',
        value: ''
    },
    {
        title: 'completed',
        value: 'completed'
    },
    {
        title: 'pending',
        value: 'pending'
    },
]


// payment
const paymentTypeItems =  [
        {
        title: 'Select',
        value: ''
    },
    {
        title: 'Card',
        value: 'Card'
    },
    {
        title: 'Cash',
        value: 'Cash'
    },
    {
        title: 'Check',
        value: 'Check'
    },
    {
        title: 'Online',
        value: 'Online'
    },
    {
        title: 'Bank Transfer',
        value: 'Bank Transfer'
    },
      {
        title: 'N/A',
        value: 'N/A'
    },
]

const paymentStatusItems = [
    {
        title: 'Select',
        value: ''
    },
    {
        title: 'unpaid',
        value: 'unpaid'
    },  
    {
        title: 'partial',
        value: 'partial'
    },
    {
        title: 'paid',
        value: 'paid'
    },
]



useEffect(()=>{
    // fetch purchase data
        const getSaleData = async () => {
            setIsLoading(true) 
             try {
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/sale/" + saleId, {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
                     console.log('////////////////////////////', res.data, '/////////////////////////////')
                     const formattedSaleDate = new Date(res.data.saleDate).toISOString().split('T')[0];
                     setSaleCode(res.data.code)
                     setSaleDate(formattedSaleDate);
                     setCustomer(res.data.customer.name)
                     setSaleStatus(res.data.saleStatus)
                     setReference(res.data.reference)
                     setSaleAmount(res.data.saleAmount)
                     setPaymentStatus(res.data.paymentStatus)
                     setShowPartialField(res.data.paymentStatus === 'partial');
                     setPaymentType(res.data.paymentType)
                     setAmountPaid(res.data?.amountPaid)
                     setDueBalance(res.data?.dueBalance)
                     setNote(res.data.note);
                     setSubTotal(res.data.subTotal);
                     setOtherCharges(res.data.otherCharges)
                     setDiscount(res.data.discount)
                     setDiscountValue(res.data.discountValue)
                     setShipping(res.data.shipping)
                     setItemList(res.data.saleItems)
                     setIsLoading(false)
                     
                     console.log(res.data)
                 } catch (err) {
                     console.log(err)
                     setIsLoading(false)
                     }
                   }
                 getSaleData()

            },[saleId])

  // Fetch sale initial
    const [prefix, setPrefix] = useState('')
    const [currencySymbol, setCurrencySymbol] = useState('')

useEffect(() => {

     const fetchCompany = async() =>{
        //   setIsLoading(true)
            try {
                const res = await axios.get(`${process.env.REACT_APP_URL}/api/company`);
              
                const prefixData = res.data[0].prefixes?.[0];
                setCurrencySymbol(res.data.currencySymbol)
  
                if (prefixData) {
                    setPrefix(prefixData.sale);
                }
  
                // setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
      
        }
        fetchCompany();
     
            // fetch products data
            const getProducts = async () => { 
                 setIsLoading(true)  
                 try {
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/products", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
                     console.log(res.data)
                     setProducts(res.data)
                     setIsLoading(false)
                     
                     console.log(res.data)
                 } catch (err) {
                     console.log(err)
                     setIsLoading(false)
                     }
                   }
                 getProducts();
 
            // fetch customer data
            const getCustomers = async () => { 
                 setIsLoading(true)  
                 try {
            
                     const res = await axios.get(process.env.REACT_APP_URL + "/api/customers/", {
                                                         headers: {
                                                           Authorization: `Bearer ${token}`
                                                         }
                                                   })
               
                     setCustomerItems(res.data)
                    //  setCustomerItems([
                    //     { title: 'Select', value: '' }, 
                    //     ...res.data.map(customer => ({
                    //         title: customer.name,
                    //         value: customer._id,
                    //     }))
                    // ]);
                     setIsLoading(false)
                     
                 } catch (err) {
                     console.log(err)
                     setIsLoading(false)
                     }
                   }
                   
                 getCustomers();

// for grand total caulacultion
    const totalQty = itemList.reduce((sum, item) => sum + parseFloat(item.quantity || 0), 0);
    const subtotal = itemList.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0);
    
    const charges = parseFloat(otherCharges) || 0;
    const disc = parseFloat(discount) || 0;
    const ship = parseFloat(shipping) || 0;
    
    const discValue = (disc / 100) * subTotal
    const grand = subtotal + charges + ship - discValue;

    
    setTotalQuantity(totalQty);
    setSubTotal(subtotal.toFixed(2));
    setDiscountValue(discValue.toFixed(2))
    setGrandTotal(grand.toFixed(2));
    // Total Amount
    setSaleAmount(grand.toFixed(2));
    // setSleAmountError(false)

}, [price, quantity, tax, itemList, otherCharges, discount, shipping]);




// calculating sale price
  const calculateSalePrice = (priceInput, taxInput, quantityInput) => {
  const p = parseFloat(priceInput) || 0;
  const t = parseFloat(taxInput) || 0;
  const q = parseFloat(quantityInput) || 1;

  const taxAmountPerUnit = p * (t / 100);
  const unitPriceWithTax = p + taxAmountPerUnit;
  const totalSale = unitPriceWithTax * q;
  const totalTaxAmount = taxAmountPerUnit * q;

  setTaxAmount(totalTaxAmount.toFixed(2));
  setUnitCost(unitPriceWithTax.toFixed(2));
  setAmount(totalSale.toFixed(2)); //sale price

};

// search dropdownd handler
const dropdownHandler = (product) => {
    setShowDropdwon(false)
    setProductId(product._id)
    setSearchTitle('');
    setTitle(product.title)
    setQuantity();
    setPrice(product.salePrice)
    setTax(product.tax)
    setTaxAmount()
    setUnitCost()
    setAmount()
}




// search name dropdownd handler

const dropdownCustomerName = (customer) => {
    setShowCusDropdown(false)
    setCustomerId(customer?._id)
    setCustomer(customer?.name)   
}



// add to array list
const addToList = (e) =>{

    e.preventDefault();

    let isValid = true;

    if(!title){
        setTitleError(true)
        isValid = false;
    }
    if(!quantity){
        setQuantityError(true)
        isValid = false;
    }
    if(!price){
        setPriceError(true)
        isValid = false;
    }
    if(isValid){
       
        const newItem = {productId, title, quantity, price, tax, taxAmount, unitCost, amount};
        setItemList((prevItems)=>[...prevItems, newItem]);

        console.log(itemList?.productId);

    setSearchTitle('');
    setTitle('')
    setQuantity('');
    setPrice('')
    setTax('')
    setTaxAmount('')
    setUnitCost('')
    setAmount('')
    setProductId('')
    }

}


      // delete item from list
      const deleteItem = (index) => {
        const updatedList =  itemList.filter((_, i) => i !== index);
        setItemList(updatedList)
      }


// increment or decreement product quantity  in the list
 const updateQuantity = (index, delta) => {
  setItemList((prevList) => {
    return prevList.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, parseInt(item.quantity) + delta); // ensures qty doesn't go below 1
        const price = parseFloat(item.price) || 0;
        const taxRate = parseFloat(item.tax) || 0;

        const taxAmountPerUnit = price * (taxRate / 100);
        const unitCost = price + taxAmountPerUnit;
        const totalTaxAmount = taxAmountPerUnit * newQty;
        const totalAmount = unitCost * newQty;

        return {
          ...item,
          quantity: newQty,
          taxAmount: totalTaxAmount.toFixed(2),
          unitCost: unitCost.toFixed(2),
          amount: totalAmount.toFixed(2),
        };
      }
      return item;
    });
  });
};



//submit handler
const hanldeSumbit = async (e) =>{

    e.preventDefault();

    let isValid = true;

    if(!saleDate){
        setSaleDateError(true)
        isValid = false;
    }
    if(!customer){
        setCustomerNameError(true)
        isValid = false;
    }
    if(!saleStatus){
        setSaleStatusError(true)
        isValid = false;
    }
        if(!saleAmount){
        setSaleAmountError(true)
        isValid = false;
    }
    if(!paymentType){
        setPaymentTypeError(true)
        isValid = false;
    }
    if(!paymentStatus){
        setPaymentStatusError(true)
        isValid = false;
    }
         
    if (paymentStatus === 'partial') {
        if (!amountPaid || parseFloat(amountPaid) <= 0) {
            setAmountPaidError(true);
            isValid = false;
        }
}

    if(isValid){
      console.log('////////======', customer._id , "and ", customerId)
      const updateSale = {
      saleDate: new Date(saleDate),
      customer: customerId || customer?._id,
      saleStatus,
      reference,
      saleAmount: Number(saleAmount),
      paymentStatus,
      paymentType,
      amountPaid: Number(amountPaid),
      dueBalance,
      note,
      subTotal: Number(subTotal),
      otherCharges: Number(otherCharges),
      discount: Number(discount),
      discountValue: Number(discountValue),
      shipping: Number(shipping),
      saleItems:
        itemList.length > 0
            ? itemList.map((item) => ({
                productId: item.productId,
                title: item.title,
                quantity: Number(item.quantity),
                price: Number(item.price),
                tax: Number(item.tax),
                taxAmount: Number(item.taxAmount),
                unitCost: Number(item.unitCost),
                amount: Number(item.amount),
            }))
            : [],
      prefix: prefix,
      userId: user?._id
    };
      setIsBtnLoading(true);
      console.log('======new sale data==========\n', updateSale)
            // alert('form validated triggered')
            try {
          
              const res = await axios.put(`${process.env.REACT_APP_URL}/api/sale/${saleId}`, updateSale, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            });

              console.log(res.data)
              navigate(`/sale-invoice/${saleId}`);
              
              
                // toast success message
                 toast.success('Sale Updated Successfully')
                   setIsBtnLoading(false);
                } catch (err) {
                console.error(err);
                setIsBtnLoading(false);
            }


            
    }
}

  return (
    <EditSalesWrapper>
                {/* Page title */}
 <PageTitle title={`Sale (${saleCode})`} subTitle={'/ Edit'}/>
    <>
    {isLoading? <List/> : 
    <EditSalesContent>
        <ItemsWrapper>
            {/* SelectItem */}
            <SelectItemContent>
                    <form>
                    <ItemContainer title={'Select Items'}> 
                        <AnyItemContainer flxDirection="column">
                             <Input 
                                value={searchTitle} 
                                title={'Search name'}
                                onChange={(e)=>handleChange('searchTitle', e)} 
                                error={searchTitleError} 
                                type={'text'} 
                                label={'Barcode/Item Code/name'} 
                                placeholder={'search...'}
                                requiredSymbol={'*'}
                            />  
                           { showDropdwon && 
                          
                            <DropdownWrapper>
                                 {/* {
                                 products && products.map((data, i)=>(
                                    <DropdownItems key={i} onClick={()=>dropdownHandler(data)}>{data.title}</DropdownItems>
                                 ))}   */}
                        {products &&
                        products
                            .filter((product) => {
                            const search = searchTitle.toLowerCase();
                            return (
                                product.title.toLowerCase().includes(search) ||
                                product.barcode?.toLowerCase().includes(search)
                            );
                            })
                            // .slice(0, 10)
                            .map((data, i) => (
                            <DropdownItems key={i} onClick={() => dropdownHandler(data)}>
                                {data.title}
                            </DropdownItems>
                            ))}
                        </DropdownWrapper>
                        
                        }
                        </AnyItemContainer>
                        <AnyItemContainer>
                            <Input 
                                value={title} 
                                title={'Item Name'}
                                onChange={(e)=>handleChange('title', e)} 
                                error={titleError} 
                                type={'text'} 
                                label={'Name'} 
                                requiredSymbol={'*'}
                            /> 
                             <Input 
                                value={quantity} 
                                title={'Quantity'}
                                onChange={(e)=>handleChange('quantity', e)} 
                                error={quantityError} 
                                type={'text'} 
                                label={'Quantity'} 
                                requiredSymbol={'*'}
                            />                  
                            
                            <Input 
                                value={price} 
                                title={'Price'}
                                onChange={()=>{}} 
                                error={priceError} 
                                type={'text'} 
                                label={'Price'} 
                                requiredSymbol={'*'}
                                readOnly
                                inputBg='#c4c4c449'
                            />                  
                            
                            <SelectInput 
                                options={TaxItem} 
                                label={'Tax(%)'}
                                value={tax}
                                error={taxError}
                                requiredSymbol={'*'}
                                title={'Tax'}
                                readOnly 
                                onChange={(e)=>handleChange('tax', e)}
                            />

                            <Input 
                                value={taxAmount} 
                                title={'Tax Amount'}
                                onChange={()=>{}} 
                                error={taxAmountError} 
                                type={'number'} 
                                label={'Tax Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                            /> 
                            <Input 
                                value={unitCost} 
                                title={'Unit Cost'}
                                onChange={()=>{}} 
                                type={'number'} 
                                label={'Unit Cost'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                            /> 
                            <Input 
                                value={amount} 
                                title={'Amount'}
                                onChange={()=>{}} 
                                type={'number'} 
                                label={'Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                            /> 
                        </AnyItemContainer>    
                            
                    
                        <ItemButtonWrapper btnAlign={'flex-end'}>
                            <Button
                                title={'Select Items'}
                                btnText={'Add to list'}
                                btnFontSize={'12px'}
                                btnColor={'orange'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                                btnOnClick={addToList}                               
                            />
                        </ItemButtonWrapper>
                    </ItemContainer>              
                        </form>
                </SelectItemContent>
  
                   
            {/* ItemList */}
            <ItemListContent>
                <ItemContainer title={'Item List'}>
                <TableResponsiveWrapper>
               {itemList.length > 0 ?
                <TableStyled>
                    <thead>
                        <TdStyled><b>#</b></TdStyled>
                        <TdStyled><b>Item Name</b></TdStyled>
                        <TdStyled><b>Price</b></TdStyled>
                        <TdStyled><b>Qty</b></TdStyled>
                        <TdStyled><b>Tax(%)</b></TdStyled>
                        <TdStyled><b>Tax Amount</b></TdStyled>
                        <TdStyled><b>Unit Cost</b></TdStyled>
                        <TdStyled><b>Amount</b></TdStyled>
                        <TdStyled><b>Action</b></TdStyled>
                    </thead>
                    <tbody>
                    {/* // {productItemList.length > 0 ? productItemList.map((data, i)=>( */}
               {       itemList.map((data, i)=>( 
                    
                        <tr key={i}>
                            <TdStyled>{i+1}</TdStyled>
                            <TdStyled>{data.title}</TdStyled>
                            <TdStyled>{data.price}</TdStyled>
                            {/* <TdStyled>{data.qty}</TdStyled> */}
                             <TdStyled>
                                <button
                                style={{borderRadius: "100%", marginRight: '5px', border: "none", cursor: 'pointer' }}
                                onClick={() => updateQuantity(i, -1)}
                                disabled={parseInt(data.quantity) <= 1}
                                >-</button>
                                {data.quantity}
                                <button
                                 style={{borderRadius: "100%", marginLeft: '5px', border: "none",  cursor: 'pointer'}}
                                onClick={() => updateQuantity(i, 1)}>+</button>
                            </TdStyled>
                            <TdStyled>{data.tax}</TdStyled>
                            <TdStyled>{data.taxAmount}</TdStyled>
                            <TdStyled>{data.unitCost}</TdStyled>
                            <TdStyled>{data.amount}</TdStyled>
                            {/* <TdStyled>{data.qty + data.price }</TdStyled> */}
                            <TdStyled><span onClick={()=>deleteItem(i)}><FaTrash/></span></TdStyled>
                        </tr>
                    ))}
               
                    </tbody>
                </TableStyled>
                     :(<div style={{
                                    alignItems: "center", 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '20px'
                                }}>
                                   <h3>Sale Items</h3> 
                                   <p>Not Item on the List</p>
                                </div>)
                }
                </TableResponsiveWrapper>

                <HrStyled />
                
                {/* Total ChargesSection */}
                <TotalChargesWrapper>            
                   {/* Total quantities */}
                    <AnyItemContainer justifyContent={'space-between'}>
                        <InnerWrapper>
                            <span><b>Total Quantities</b></span>
                            <span>{totalQuantity}</span>
                        </InnerWrapper>
                        <InnerWrapper>
                            <span><b>Sub Total</b></span>
                            <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{Number(subTotal).toLocaleString()}</span>
                        </InnerWrapper>
                    </AnyItemContainer>
                   
                   {/* Other Charges */}
                    <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b> Other Charges</b></span>
                                <span>
                                    <Input 
                                        value={otherCharges} 
                                        placeholder={'Other Charges'}
                                        onChange={(e)=>handleChange('otherCharges', e)} 
                                        type={'text'}  
                                    /> 
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Other Charges</b></span>
                                <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{otherCharges? otherCharges: 0}</span>
                            </InnerWrapper>
                    </AnyItemContainer>

                          {/* Discount */}
                          <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b>Discount</b></span>
                                <span>
                                    <Input 
                                        value={discount} 
                                        placeholder={'Discount'}
                                        onChange={(e)=>handleChange('discount', e)} 
                                        type={'text'}  
                                    /> 
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Discount {discount && '('+ discount + '%)'}</b></span>
                                <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{discountValue? Number(discountValue).toLocaleString():0}</span>
                            </InnerWrapper>
                    </AnyItemContainer>

                     {/* Grand Total */}
                     <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                                <span><b>Shipping</b></span>
                                <span>
                                     <Input 
                                        value={shipping} 
                                        placeholder={'Shipping'}
                                        onChange={(e)=>handleChange('shipping', e)} 
                                        type={'text'}  
                                    /> 
                                </span>
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b>Shipping</b></span>
                                <span><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{shipping? shipping: 0}</span>
                            </InnerWrapper>
                    </AnyItemContainer>

                                         {/* Grand Total */}
                     <AnyItemContainer justifyContent={'space-between'}>
                            <InnerWrapper>
                               
                            </InnerWrapper>
                            <InnerWrapper>
                                <span><b> Grand Total</b></span>
                                <span><b><span dangerouslySetInnerHTML={{ __html: currencySymbol }}/>{grandTotal? grandTotal : 0}</b></span>
                            </InnerWrapper>
                    </AnyItemContainer>
                </TotalChargesWrapper>
                </ItemContainer>       
            </ItemListContent>
        </ItemsWrapper>

    {/* Customer info */}
        <CustomerInfoWrapper>
            <form action="" onSubmit={(e)=>hanldeSumbit(e)}>
                <ItemContainer title={'Customer Info'}>
                    
                  <Input 
                                value={customer} 
                                title={'Customer Name'}
                                onChange={(e)=>handleChange('customer-name', e)} 
                                error={customerNameError} 
                                type={'text'} 
                                label={'Customer Name'} 
                                placeholder={'search...'}
                                requiredSymbol={'*'}
                            />  
                           {showCusDropdown && (
                                    <DropdownWrapper topPosition={'80px'} width={"96%"}>
                                        {customerItems.filter(c =>customer.length > 0 && c.name.toLowerCase().includes(customer.toLowerCase())).length > 0 ? 
                                        (customerItems.filter(c => customer.length > 0 && c.name.toLowerCase().includes(customer.toLowerCase())).map((data, i) => (
                                            <DropdownItems key={i} onClick={() => dropdownCustomerName(data)}>
                                                {data.name}
                                            </DropdownItems>
                                            ))
                                        ) : (
                                        <DropdownItems>
                                            <div style={{width: "100%", display: "flex", flexDirection: "column", gap: "5px", padding: "20px", justifyContent: "center", alignItems: "center"}}>
                                                <span>No such customer </span>
                                                <a href="/add-customer">Please click here to add </a>
                                            </div>
                                        
                                        </DropdownItems>
                                        )}
                                    </DropdownWrapper>
                            )}

                    <Input 
                                value={saleDate} 
                                title={'Date'}
                                onChange={(e)=>handleChange('sale-date', e)} 
                                type={'date'} 
                                label={'Date'} 
                                error={saleDateError}
                                requiredSymbol={'*'}
                            /> 
                        
                    <SelectInput 
                                options={saleStatusItem} 
                                label={'Sale Status'}
                                value={saleStatus}
                                error={saleStatusError}
                                requiredSymbol={'*'}
                                title={'Sale Status'}
                                onChange={(e)=>handleChange('sale-status', e)}
                            />

                    <Input 
                                value={reference} 
                                title={'References'}
                                onChange={(e)=>handleChange('references', e)} 
                                type={'text'} 
                                label={'References'} 
                                // error={saleDateError}
                            /> 

                </ItemContainer>
                <ItemContainer title={'Payment Info'}>
                    <Input 
                                value={saleAmount} 
                                title={'Sale Amount'}
                                onChange={(e)=>handleChange('sale-amount', e)} 
                                type={'text'} 
                                label={'Sale Amount'} 
                                requiredSymbol={'*'}
                                readOnly 
                                inputBg='#c4c4c449'
                                error={saleAmountError}
                            /> 
                    <SelectInput 
                                                    options={paymentStatusItems} 
                                                    label={'Payment Status'}
                                                    value={paymentStatus}
                                                    error={paymentStatusError}
                                                    requiredSymbol={'*'}
                                                    title={'Payment Status'}
                                                    onChange={(e)=>handleChange('payment-status', e)}
                                                />
                    <div style={{display: "flex", gap: "10px"}}>
                                {showPartialField &&
                                        <Input 
                                                    value={amountPaid} 
                                                    title={'Amount Paid'}
                                                    onChange={(e)=>handleChange('amount-paid', e)} 
                                                    type={'text'} 
                                                    label={'Amount Paid'} 
                                                    requiredSymbol={'*'}
                                                    placeholder={'0.00'}
                                                    error={amountPaidError}
                                         /> }

                                        {showPartialField &&
                                        <Input 
                                            value={dueBalance} 
                                            title={'Due Balance'}
                                            onChange={(e)=>handleChange('due-amount', e)} 
                                            type={'text'} 
                                            label={'Due Balance'} 
                                            readOnly 
                                            inputBg='#c4c4c449'
                                        /> 
                                        }
                                </div>
                    <SelectInput 
                                options={paymentTypeItems} 
                                label={'Payment Type'}
                                value={paymentType}
                                error={paymentTypeError}
                                requiredSymbol={'*'}
                                title={'Payment Type'}
                                onChange={(e)=>handleChange('payment-type', e)}
                            />
                      
                    <TextArea 
                                label={'Note'} 
                                title={'Note'} 
                                onChange={(e) => handleChange('note', e)} 
                                value={note} 
                            />

                    {/* Add to SALE button */}
                    <ItemButtonWrapper btnAlign={'flex-start'}>
                                <Button
                                    btnText={isBtnLoading ? <ButtonLoader text={'Updating...'} /> : 'Update Sale'}
                                    btnFontSize={'12px'}
                                    btnColor={'green'}
                                    btnTxtClr={'white'}
                                    btnAlign={'flex-end'}
                                />
                        </ItemButtonWrapper>
                </ItemContainer>
            </form>
        </CustomerInfoWrapper>
        </EditSalesContent>
 } </>
  
        {/* Toast messages */}
        <ToastComponents/>
    </EditSalesWrapper>
  )
}
