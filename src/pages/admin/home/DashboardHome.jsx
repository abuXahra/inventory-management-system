import React, { useEffect, useState } from 'react'
import { AuthorContainer, ChartContainer, ChartContent, ChartWrapper, Container, CustomerListContent, CustomerListWrapper, DateTimeWrapper, GreetingCard, GreetingWrapper, HomeWrapper, PostItems, PostItemWrapper, ProductContainer, ProfileDp, RecentPostWrapper, SpaceBtnContainer, TopCard, TopCardContent, TopCardContentWrapper, TopCardIcon, TotalPostContainer, UserContainer, UserWrapper } from './Home.style'
import {MdOutlineAdd, MdOutlineDateRange} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { TopCardItemList } from '../../../data/TopcardItems'
import PurchaseSale from '../../../components/chart/purchase_sale/PurchaseSale'
import QuickLinks from '../../../components/quick_links/QuickLinks'
import AlertContent from '../../../components/table/alert_content_table/AlertContent'
import HomePurchaseList from '../../../components/table/purchase_table/home_purchase_list/HomePurchaseList'
import HomeSaleList from '../../../components/table/sale_table/home_salelist/HomeSaleList'



// import axios from 'axios'


function DashboardHome() {

  const navigate = useNavigate();
  const [recentPost, setRecentPost] = useState([])

  // const fetchRecentPost = async () =>{
  //   try {
  //     const res = await axios.get(process.env.REACT_APP_URL+ '/api/posts');
  //     console.log(res.data);
  //     setRecentPost(res.data.slice(0, 5));
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(()=>{
  //   fetchRecentPost();
  // }, []);
  

  const data = [
    {
      id: 1,
      date: '02-01-2021',
      code: 'SA1001',
      name: 'Walk-in Customer',
      status: 'Received',
      grandTotal: '$300',
      paymentStatus: 'Paid',
    },    {
      id: 2,
      date: '02-01-2022',
      code: 'SA1002',
      name: 'Yusuf Abdulazeez',
      status: 'Pending',
      grandTotal: '$500',
      paymentStatus: 'Paid',
    },
    {
      id: 3,
      date: '02-01-2024',
      code: 'SA1008',
      name: 'Helen Nwaosu',
      status: 'Received',
      grandTotal: '$700',
      paymentStatus: 'Paid',
    },
  ];

  return (
    <HomeWrapper>
        {/* <video src={flightVide} autoPlay loop muted></video> */}
        <GreetingWrapper>
          <GreetingCard>
            <h1>Welcome back</h1>
            <h5>Admin</h5>
          </GreetingCard>

          <DateTimeWrapper>
            <span><MdOutlineDateRange /></span>
            <span>Today: {new Date().toDateString()}</span>
          </DateTimeWrapper>
        </GreetingWrapper>

    {/* Quick links */}
      <QuickLinks/>
      <TopCardContent>
        <TopCardContentWrapper>
            {
              TopCardItemList
              .map((item, i)=>(
                      <TopCard bg={item.bg}>
                          <TopCardIcon>
                          {item.icon}
                          </TopCardIcon>
                          <h2>{item.count}</h2>
                          <p>{item.title}</p>
                      </TopCard>
              ))
            }
        </TopCardContentWrapper>   
      </TopCardContent>


      <Container>
        {/* Charts */}
          <PurchaseSale/>
          {/* Alert content that haver quantity of 10 */}
          <AlertContent/>
      </Container>

      <Container>
        <HomeSaleList/>
        <HomePurchaseList/>
      </Container>  
    </HomeWrapper>
  )
}

export default DashboardHome


// https://demos.creative-tim.com/purity-ui-dashboard-pro/?_ga=2.54610219.1863943687.1726404927-1621573859.1726404927#/admin/dashboard/default








// <Container>
//         {/* Product */}
//         <ProductContainer>
//             <ProductTable btnDisplay={'none'} mt={"-20px"}/>
//         </ProductContainer>
          
//           {/* Customer */}
//           <CustomerListWrapper>
//               <SpaceBtnContainer>
//                 <h3>Customers</h3>
//                 <Button 
//                   btnText={'Add New'} 
//                   btnColor={'green'} 
//                   btnLeftIcon={<MdOutlineAdd />}
//                   btnOnClick={()=>navigate('/dashboard')}
//                 />
//               </SpaceBtnContainer>

//               <CustomerListContent>
//                 {
//                   CustomersItemList && CustomersItemList.map((customer)=>(
//                     <CustomerList key={customer?._id} customer={customer} />
//                   ))
//                 }              
//               </CustomerListContent>
//           </CustomerListWrapper>
//       </Container>  