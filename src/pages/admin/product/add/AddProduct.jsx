





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
import { AiFillPicture } from 'react-icons/ai'
import ButtonLoader from '../../../../components/clicks/button/button_loader/ButtonLoader'
import { AddProductContent, AddProductWrapper, ImageWrapper, InputPicture, NameAndFileInput } from './AddProduct.style'

export default function AddProduct() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [unit, setUnit] = useState('');
    const [sku, setSku] = useState('');
    const [alertQnt, setAlertQnt] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const [purchasePrice, setPurchasePrice] = useState('');
    const [tax, setTax] = useState(0);
    const [taxType, setTaxType] = useState('');
    const [purchasePriceTax, setPurchasePriceTax] = useState('');
    const [profitMargin, setProfitMargin] = useState('');
    const [salesPrice, setSalesPrice] = useState('');
    const [openingStock, setOpeningStock] = useState('');

    // Error states
    const [titleError, setTitleError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [unitError, setUnitError] = useState(false);
    const [skuError, setSkuError] = useState(false);
    const [alertQntError, setAlertQntError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [fileError, setFileError] = useState(false);
    const [purchasePriceError, setPurchasePriceError] = useState(false);
    const [purchasePriceTaxError, setPurchasePriceTaxError] = useState(false);
    const [profitMarginError, setProfitMarginError] = useState(false);
    const [salesPriceError, setSalesPriceError] = useState(false);
    const [openingStockError, setOpeningStockError] = useState(false);
    const [taxError, setTaxError] = useState(false);
    const [taxTypeError, setTaxTypeError] = useState(false);

    const categoryItem = [
        { title: 'Necklace', value: 'necklace' },
        { title: 'Bungles', value: 'bungles' }
    ];

    const unitItem = [
        { title: 'Piece', value: 'piece' },
        { title: 'M', value: 'm' }
    ];

    const taxItem = [
        { title: 'None', value: 0 },
        { title: 'TAX(5%)', value: 5 },
        { title: 'TAX(7%)', value: 7 }
    ];

    const taxItem2 = [
        { title: 'Inclusive', value: 'Inclusive' },
        { title: 'Non-Inclusive', value: 'Non-Inclusive' }
    ];

    // const updatePurchasePriceTax = (price, taxTypeVal, taxRate) => {
    //     price = parseFloat(price);
    //     taxRate = parseFloat(taxRate);

    //     if (isNaN(price) || isNaN(taxRate)) {
    //         setPurchasePriceTax('');
    //         return;
    //     }

    //     let result = 0;

    //     if (taxTypeVal === 'Inclusive') {
    //         result = price / (1 + taxRate / 100);
    //     } else {
    //         result = price + (price * taxRate / 100);
    //     }

    //     setPurchasePriceTax(result.toFixed(2));
    //     updateSalesPrice(result, profitMargin);
    // };

    const updatePurchasePriceTax = (price, taxTypeVal, taxRate) => {
    const parsedPrice = parseFloat(price);
    const parsedTax = parseFloat(taxRate);

    if (isNaN(parsedPrice) || isNaN(parsedTax) || !taxTypeVal) {
        setPurchasePriceTax('');
        return;
    }

    let baseCost;

    if (taxTypeVal === 'Inclusive') {
        baseCost = parsedPrice / (1 + parsedTax / 100);
    } else {
        baseCost = parsedPrice;
    }

    const finalPurchaseWithTax = baseCost + (parsedTax / 100 * baseCost);
    setPurchasePriceTax(finalPurchaseWithTax.toFixed(2));
    updateSalesPrice(finalPurchaseWithTax, profitMargin);
};



    const updateSalesPrice = (purchaseWithTax, margin) => {
        const cost = parseFloat(purchaseWithTax);
        const profit = parseFloat(margin);

        if (isNaN(cost) || isNaN(profit)) {
            setSalesPrice('');
            return;
        }

        const selling = cost + (cost * profit / 100);
        setSalesPrice(selling.toFixed(2));
    };


 


    const handleChange = (type, e) => {
        const value = e.target.value;

        switch (type) {
            case 'title':
                setTitle(value); setTitleError(false); break;
            case 'category':
                setCategory(value); setCategoryError(false); break;
            case 'unit':
                setUnit(value); setUnitError(false); break;
            case 'sku':
                setSku(value); setSkuError(false); break;
            case 'alertQnt':
                setAlertQnt(value); setAlertQntError(false); break;
            case 'description':
                setDescription(value); setDescriptionError(false); break;
            case 'file':
                setFile(e.target.files[0]); setFileError(false); break;
            case 'purchasePrice':
                setPurchasePrice(value);
                updatePurchasePriceTax(value, taxType, tax);
                setPurchasePriceError(false);
                break;
            case 'tax':
                setTax(value);
                updatePurchasePriceTax(purchasePrice, taxType, value);
                setTaxError(false);
                break;
            case 'tax-type':
                setTaxType(value);
                updatePurchasePriceTax(purchasePrice, value, tax);
                setTaxTypeError(false);
                break;
            case 'profit-margin':
                setProfitMargin(value);
                updateSalesPrice(purchasePriceTax, value);
                setProfitMarginError(false);
                break;
            case 'opening-stock':
                setOpeningStock(value);
                setOpeningStockError(false);
                break;
            default:
                break;
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        let isValid = true;

        if (!title) { setTitleError(true); isValid = false; }
        if (!category) { setCategoryError(true); isValid = false; }
        if (!unit) { setUnitError(true); isValid = false; }
        if (!sku) { setSkuError(true); isValid = false; }
        if (!alertQnt) { setAlertQntError(true); isValid = false; }
        if (!description) { setDescriptionError(true); isValid = false; }
        if (!file) { setFileError(true); isValid = false; }
        if (!purchasePrice) { setPurchasePriceError(true); isValid = false; }
        if (!tax) { setTaxError(true); isValid = false; }
        if (!taxType) { setTaxTypeError(true); isValid = false; }
        if (!purchasePriceTax) { setPurchasePriceTaxError(true); isValid = false; }
        if (!profitMargin) { setProfitMarginError(true); isValid = false; }
        if (!salesPrice) { setSalesPriceError(true); isValid = false; }
        if (!openingStock) { setOpeningStockError(true); isValid = false; }

        if (isValid) {
            setIsLoading(true);
            // Save data to backend here
            navigate('/suppliers');
        }
    };

    return (
        <AddProductWrapper>
            <PageTitle title={'Product'} subTitle={'/ Add'} />
            <AddProductContent>
                <form onSubmit={submitHandler}>
                    <ItemContainer title={'New Product'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            <Input value={title} title={'Title'} onChange={(e) => handleChange('title', e)} error={titleError} type={'text'} label={'Title'} />
                            <SelectInput value={category} onChange={(e) => handleChange('category', e)} options={categoryItem} label={'Category'} />
                            <SelectInput value={unit} onChange={(e) => handleChange('unit', e)} options={unitItem} label={'Units'} />
                        </AnyItemContainer>

                        <AnyItemContainer justifyContent={'space-between'}>
                            <Input value={sku} title={'SKU'} onChange={(e) => handleChange('sku', e)} error={skuError} type={'text'} label={'SKU'} />
                            <Input value={alertQnt} title={'Alert Quantity'} onChange={(e) => handleChange('alertQnt', e)} error={alertQntError} type={'number'} label={'Alert Quantity'} />
                        </AnyItemContainer>

                        <AnyItemContainer justifyContent={'space-between'}>
                            <TextArea label={'Description'} title={'Description'} onChange={(e) => handleChange('description', e)} value={description} error={descriptionError} />
                            <NameAndFileInput>
                                <label htmlFor="fileInput"><span>Picture</span>
                                    {file ?
                                        (<ImageWrapper bg={URL.createObjectURL(file)} />)
                                        : <AiFillPicture />}
                                </label>
                                <InputPicture onChange={(e) => handleChange('file', e)} type="file" id="fileInput" />
                            </NameAndFileInput>
                        </AnyItemContainer>
                    </ItemContainer>

                    <ItemContainer title={'Purchase Info'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            <Input value={purchasePrice} title={'Price'} onChange={(e) => handleChange('purchasePrice', e)} error={purchasePriceError} type={'number'} label={'Price'} />
                            <SelectInput value={tax} onChange={(e) => handleChange('tax', e)} title={'Tax'} options={taxItem} label={'Tax'} />
                            <Input value={purchasePriceTax} title={'Purchase Price'} onChange={() => { }} error={purchasePriceTaxError} type={'number'} label={'Purchase Price'} disabled />
                        </AnyItemContainer>
                    </ItemContainer>

                    <ItemContainer title={'Sale Info'}>
                        <AnyItemContainer justifyContent={'space-between'}>
                            <SelectInput error={taxTypeError} value={taxType} title={'Tax Type'} options={taxItem2} label={'Tax Type'} onChange={(e) => handleChange('tax-type', e)} />
                            <Input value={profitMargin} title={'Profit Margin'} onChange={(e) => handleChange('profit-margin', e)} error={profitMarginError} type={'number'} label={'Profit Margin (%)'} requiredSymbol="*" />
                            <Input value={salesPrice} title={'Selling Price'} onChange={() => { }} error={salesPriceError} type={'number'} label={'Selling Price'} requiredSymbol="*" disabled />
                            <Input value={openingStock} title={'Opening Stock'} onChange={(e) => handleChange('opening-stock', e)} error={openingStockError} type={'number'} label={'Open Stock'} requiredSymbol="*" />
                        </AnyItemContainer>

                        <ItemButtonWrapper btnAlign={'space-between'}>
                            <Button
                                title={'Select Items'}
                                btnText={isLoading ? <ButtonLoader text={'Adding...'} /> : 'Add Product'}
                                btnFontSize={'12px'}
                                btnColor={'Green'}
                                btnTxtClr={'white'}
                                btnAlign={'flex-end'}
                            />
                        </ItemButtonWrapper>
                    </ItemContainer>
                </form>
            </AddProductContent>
        </AddProductWrapper>
    )
}






















