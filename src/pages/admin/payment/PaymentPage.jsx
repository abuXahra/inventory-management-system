
import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import PaymentTable from '../../../components/table/payment_table/Payment'
import { PaymentPageContent, PaymentPageWrapper } from './paymentPage.style'
import axios from 'axios'


export default function PaymentPage() {
  
  const[paymentRecords, setPaymentRecords] = useState([]);
  const [allPaymentRecords, setAllPaymentRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
// fetch expense handler 
                          useEffect(() => {
                              const getPayment = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/payment/")
                                     
                                      setPaymentRecords(res.data)
                                      setAllPaymentRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getPayment();
                          }, [])


           // handle payment delete
          const deletePayment = async (paymentId,  updatedList = null) => {
            
            if (updatedList) {
              setPaymentRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/payment/${paymentId}`);
              const updatedPayment = paymentRecords.filter(payment => payment._id !== paymentId);
              setPaymentRecords(updatedPayment);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };

// handle search query
  const handleSearchQueryOnChange = (e) => {
  const query = e.target.value.trim().toLowerCase(); // normalize query

  if (query === '') {
    setPaymentRecords(allPaymentRecords);
  } else {
    const filteredRecords = allPaymentRecords.filter(item => {
      // const paymentType = item.paymentType?.toLowerCase() || '';
      const paymentFor = item.paymentFor || ''; // use correct field name
      // const note = item.note?.toLowerCase() || ''; // use correct field name
      return (
        // paymentType.includes(query) 
        // ||
        paymentFor.includes(query)
        // note.includes(query)
      );
    });

    setPaymentRecords(filteredRecords);
  }
};



  // const navigate = useNavigate();


  const data = [
    {
      id: 1,
      date: '02-01-2020',
      paymentFor: 'PT1001',
      amount: 35000,
      paymentType: "Cash",
      note: 'Partial payment',
    }, 
    {
      id: 2,
      date: '02-01-2020',
      paymentFor: 'PC1001',
      amount: 35000,
      paymentType: "Transfer",
      note: 'Full payment',
    }, 
    {
      id: 3,
      date: '02-01-2020',
      paymentFor: 'SA1001',
      amount: 45000,
      paymentType: "Cash",
      note: 'Partial payment',
    }, 
  ];

  // const[records, setRecords] = useState(data);
  // const handleChange = (e) => {
  //   let query = e.target.value;  
  //   const newRecords = data.filter(item => item.paymentFor.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
  //   setRecords(newRecords);
  // }


  const navigate = useNavigate();
  return (
    <PaymentPageWrapper>
        <PageTitle title={'Payments'}/>

        {/* content */}
        <PaymentPageContent>
          <ListHeader 
            title={'Add Payment'} 
            btnOnClick={()=>navigate('/add-payments')}
            searQuery={'Payment For'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={paymentRecords.length}
          />
          
          {/* Payment Table */}
          <PaymentTable 
            data={paymentRecords} 
            onDeletePayment={deletePayment} 
            setIsLoading={setIsLoading}
          />
        </PaymentPageContent>
    </PaymentPageWrapper>
  )
}




