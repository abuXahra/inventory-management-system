




import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../../components/page_title/PageTitle';
import ListHeader from '../../../../components/page_title/list_header/ListHeader';
import { FaPrint } from 'react-icons/fa';
import JewelLogo from '../../../../images/logo1.png'
import { AddressWrapper, DateWrapper, Logo, LogoWrapper, ReportHeaderContent, ReportHeaderWrapper, StockReportContent, StockReportWrapper } from './stockReports.style';
import StockReportTable from '../../../../components/table/report_table/stock_report/StockReportTable';
import ProductImage from '../../../../images/necklace.jpeg'


export default function StockReport() {


  const data = [
    {
      id: 1,
      imgUrl: ProductImage,
      code: 'SA1001',
      name: 'Zirconia',
      category: 'Necklace',
      unit: 'piece',
      tax: 'None',
      price: '280',
      stock: '148'
    },
    {
      id: 2,
      imgUrl: ProductImage,
      code: 'SA1001',
      name: 'Zirconia',
      category: 'Necklace',
      unit: 'piece',
      tax: 'TAX(5%)',
      price: '280',
      stock: '148'
    },

    {
      id: 3,
      imgUrl: ProductImage,
      code: 'SA1001',
      name: 'Zirconia',
      category: 'Necklace',
      unit: 'piece',
      tax: 'TAX(7%)',
      price: '280',
      stock: '148'
    },
  ];


  return (
    <StockReportWrapper>
      <PageTitle title={'Stock Report'} />

      {/* content */}
      <StockReportContent>
        <ListHeader
          title={'print'}
          btnOnClick={() => { }}
          type={'text'}
          icon={<FaPrint />}
          inputDisplay={'none'}
          entries={'of  Stock'}
        />

        <ReportHeaderWrapper>
          <ReportHeaderContent>
            {/* Logo */}
            <LogoWrapper>
              <Logo>
                <div>
                  <img src={JewelLogo} alt="" srcset="" />
                </div>
              </Logo>

              <AddressWrapper>
                <h4>Inventory</h4>
                <span><b>Address:</b> Marpur, Ohaka Bangladesh</span>
                <span><b>Phone:</b> 08135701458</span>
                <span><b>Email:</b> abdulmuminiisah79@gmaiil.com</span>
              </AddressWrapper>
            </LogoWrapper>
            {/* date */}
            <DateWrapper>
              <h3>Stock REPORT</h3>
              <span>02-Jan-2020</span>
            </DateWrapper>

          </ReportHeaderContent>
        </ReportHeaderWrapper>

        {/* Stock Report Table Result */}
        <StockReportTable data={data} />
      </StockReportContent>
    </StockReportWrapper>
  )
}






