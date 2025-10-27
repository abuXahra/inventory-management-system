import React, { useContext, useEffect, useState } from 'react'
import { AuthorContainer, ChartContainer, ChartContent, ChartWrapper, Container, CustomerListContent, CustomerListWrapper, DateTimeWrapper, GreetingCard, GreetingWrapper, HomeWrapper, PostItems, PostItemWrapper, ProductContainer, ProfileDp, RecentPostWrapper, SpaceBtnContainer, TopCard, TopCardContent, TopCardContentWrapper, TopCardIcon, TopCardIconB, TotalPostContainer, UserContainer, UserWrapper } from './Home.style'
import {MdOutlineAdd, MdOutlineDateRange} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
// import { TopCardItemList } from '../../../data/TopcardItems'
import PurchaseSale from '../../components/chart/purchase_sale/PurchaseSale'
import QuickLinks from '../../components/quick_links/QuickLinks'
import AlertContent from '../../components/table/alert_content_table/AlertContent'
import HomePurchaseList from '../../components/table/purchase_table/home_purchase_list/HomePurchaseList'
import HomeSaleList from '../../components/table/sale_table/home_salelist/HomeSaleList'
import { UserContext } from '../../components/context/UserContext'
import { ArrowWrapper, ItemDetails } from '../reports/reportsPage.style'
import { FaChartPie, FaLongArrowAltRight, FaPeopleCarry } from 'react-icons/fa'
import { IoIosPeople } from 'react-icons/io'
import { PiInvoiceBold } from 'react-icons/pi'
import { IoBagSharp, IoPricetagsSharp } from 'react-icons/io5'
import { HiMiniReceiptRefund } from 'react-icons/hi2'
import axios from 'axios'
import { List } from 'react-content-loader';
import MyBarChart from '../../components/chart/Barchart'
import MyPieChart from '../../components/chart/pie-chat/MyPieChart'
import SaleChart from '../../components/chart/sale-chart/SaleChart'
import TopSelling from '../../components/table/product_table/top_selling_prod/TopSelling'






// import axios from 'axios'


function DashboardHome() {
  const token = localStorage.getItem("token");
  const {user, loading} = useContext(UserContext);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState([]);
  const [saleInvoice, setSaleInvoice] = useState(null);
  const [supplier, setSupplier] = useState([]);
  const [purchaseInvoice, setPurchaseInvoice] = useState(null);
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState([]);
  const [paymentCount, setPaymentCount] = useState(null);
  const [expenses, setExpenses] = useState(null);
  
  const [companyData, setCompanyData] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  
  // customer
  const fetchCustomer = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/customers', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setCustomer(res.data);
      } catch (error) {
        console.log(error)
      }
    }

  // saleInvoice
  const fetchSaleInvoice = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/sale/total-sale' , {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setSaleInvoice(res.data.totalSaleAmount);
      } catch (error) {
        console.log(error)
      }
    }
  
  // supplier
  const fetchSupplier = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/suppliers', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setSupplier(res.data);
      } catch (error) {
        console.log(error)
      }
    }

  // Purchase Invoice
  const fetchPurchaseInvoice = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/purchase/total-purchase', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setPurchaseInvoice(res.data.totalPurchaseAmount);
      } catch (error) {
        console.log(error)
      }
    }


  // Items
  const fetchItems = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/products', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setItems(res.data);
      } catch (error) {
        console.log(error)
      }
    }


    // Category
  const fetchCategory = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/category', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setCategory(res.data);
      } catch (error) {
        console.log(error)
      }
    }

// Payment
      const fetchPayment = async () =>{
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/payment/total-payable', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setPaymentCount(res.data?.totalPayableAmount)
        console.log('.... Total Payment: \n', res.data.totalPayableAmount)
      } catch (error) {
        console.log(error)
      }
    }

    
  const fetchExpenses = async () =>{
      setIsLoading(true)
      try {
        const res = await axios.get(process.env.REACT_APP_URL+ '/api/expense/expense-total', {
                                            headers: {
                                              Authorization: `Bearer ${token}`
                                            }
                                      })
        setExpenses(res.data.totalExpenseAmount);
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }


    useEffect(()=>{
      fetchCustomer();
      fetchSupplier();
      fetchItems();
      fetchCategory();
      fetchPayment();
      fetchSaleInvoice();
      fetchPurchaseInvoice();
      fetchExpenses();
    }, []);
    
  
  
  const TopCardItemList = [
    {
      title: "Sales Invoice",
      count: saleInvoice?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <PiInvoiceBold />,
      bg: "#16a34a",
      url: "/sales",
       currency: companyData,
    },
    {
      title: "Purchase Invoice",
      count: purchaseInvoice?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <PiInvoiceBold />,
      bg: "#2563eb",
      url: "/purchase",
      currency: companyData,
    },
        {
      title: "Payments",
      count: paymentCount?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <HiMiniReceiptRefund />,
      bg: "#f59e0b",
      url: "/sale-return",
      currency: companyData,
    },
    {
      title: "Expenses",
      count: expenses?.toLocaleString('en-NG', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    }),
      icon: <FaChartPie />,
      bg: "#ef4444",
      url: "/expenses",
       currency: companyData,
    },
    {
      title: "Customer",
      count: customer.length,
      icon: <IoIosPeople />,
      bg: "#2563eb",
      url: "/customers",
    },
    {
      title: "Suppliers",
      count: supplier.length,
      icon: <FaPeopleCarry />,
      bg: "#16a34a",
      url: "/suppliers",
    },
    {
      title: "Items",
      count: items.length,
      icon: <IoBagSharp />,
      bg: "#2563eb",
      url: "/products",
    },
  
    {
      title: "Items Category",
      count: category.length,
      icon: <IoPricetagsSharp />,
      bg: "#f59e0b",
      url: "/categories",
    },
  ];
  


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

  // 🟢 Show loader while user data is still being fetched
  if (loading || !user) {
    return <div className="loading">Loading dashboard...</div>;
  }


  return (
    <HomeWrapper>
        {/* <video src={flightVide} autoPlay loop muted></video> */}
        <GreetingWrapper>
          <GreetingCard>
            {user && <h1>Welcome</h1>}         
            <h4 style={{textTransform: "capitalize"}}>{user && user?.username}</h4>
            <span style={{textTransform: "capitalize"}}>{user && user?.role}</span>
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
                          <h2><span><span dangerouslySetInnerHTML={{ __html: item.currency?.currencySymbol }}/>{item.count}</span></h2>
                          <p>{item.title}</p>
                        <ItemDetails onClick={()=> navigate(`${item.url}`)}>
                            <ArrowWrapper>
                                <FaLongArrowAltRight/>
                            </ArrowWrapper>
                        </ItemDetails>
                      </TopCard>
              ))
            }   
        </TopCardContentWrapper>   
      </TopCardContent>

        {/* Charts */}
      <Container>
          <PurchaseSale/>
          <SaleChart/>
      </Container>

      <Container>
        <TopSelling  header={"Top Selling Products"}/>
      </Container> 

      <Container>
        <AlertContent/>
        <HomePurchaseList/>
      </Container>
        
    </HomeWrapper>
  )
}

export default DashboardHome


// https://demos.creative-tim.com/purity-ui-dashboard-pro/?_ga=2.54610219.1863943687.1726404927-1621573859.1726404927#/admin/dashboard/default





