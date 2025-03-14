
import React, { useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import ProductTable from '../../../components/table/product_table/Product'
import ProductImage from '../../../images/necklace.jpeg'
import PaymentTable from '../../../components/table/payment_table/Payment'
import { ExpensePageContent, ExpensePageWrapper } from './expensePage.style'
import ExpensesTable from '../../../components/table/expense_table/Expense'



export default function ExpensePage() {
  
  const data = [
    {
      id: 1,
      date: '02-01-2020',
      code: 'EX1001',
      paymentFor: 'Tea Break',
      amount: "35000",
      note: '',
    }, 
    {
      id: 2,
      date: '02-01-2020',
      code: 'EX1002',
      paymentFor: 'Office Launch',
      amount: "35000",
      note: '5 person',
    }, 
  ];
  

  const[records, setRecords] = useState(data);
  const handleChange = (e) => {
    let query = e.target.value;  
    const newRecords = data.filter(item => item.amount.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || item.paymentType.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
    setRecords(newRecords);
  }


  const navigate = useNavigate();
  return (
    <ExpensePageWrapper>
        <PageTitle title={'Expenses'}/>

        {/* content */}
        <ExpensePageContent>
          <ListHeader 
            title={'Add Expense'} 
            btnOnClick={()=>navigate('/add-expense')}
            searQuery={''}
            onChange={handleChange}
            type={'text'}
            dataLength={records.length}
          />
          
          {/* Payment Table */}
            <ExpensesTable data={records}/>
        </ExpensePageContent>
    </ExpensePageWrapper>
  )
}




