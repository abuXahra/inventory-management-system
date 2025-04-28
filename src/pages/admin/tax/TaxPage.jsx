
import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import PaymentTable from '../../../components/table/payment_table/Payment'
import TaxTable from '../../../components/table/tax_table/TaxTable'
import { TaxPageContent, TaxPageWrapper } from './taxPage.style'
import axios from 'axios'
import { List } from 'react-content-loader'


export default function TaxPage() {
  

     const[taxRecords, setTaxRecords] = useState([]);
     const [allTaxRecords, setAllTaxRecords] = useState([]);
      const [isLoading, setIsLoading] = useState(false);


         // fetch tax handler 
                  useEffect(() => {
                      const getAllTax = async () => { 
                        setIsLoading(true)  
                        try {
                              const res = await axios.get(process.env.REACT_APP_URL + "/api/tax/")
                             
                              setTaxRecords(res.data)
                              setAllTaxRecords(res.data);
                              setIsLoading(false)
            
                              console.log(res.data)
                          } catch (err) {
                              console.log(err)
                              setIsLoading(false)
                          }
                  
                      }
                      getAllTax();
                  }, [])

    
          // handle tax delete
          const deleteTax = async (taxId) => {
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/tax/${taxId}`);
              const updatedTax = taxRecords.filter(tax => tax._id !== taxId);
              setTaxRecords(updatedTax);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };



          // handle search query
          const handleChange = (e) => {
            let query = e.target.value;
            //  if query is empty, reset to all tax record
            if(query === ''){
              setTaxRecords(allTaxRecords);
            }else{
              // Filter th tax records based on query
              const filterRecords = allTaxRecords.filter(item =>
                item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
              );
              setTaxRecords(filterRecords)
            }
          }


  const navigate = useNavigate();
  return (
    <TaxPageWrapper>
        <PageTitle title={'Tax'}/>
  
     
        {isLoading? <List/> :
        <TaxPageContent>
          <ListHeader 
            title={'Add Tax'} 
            btnOnClick={()=>navigate('/add-tax')}
            searQuery={'Name'}
            onChange={handleChange}
            type={'text'}
          />
          
          {/* Payment Table */}
            <TaxTable data={taxRecords} onDeleteTax={deleteTax}/>
        </TaxPageContent>
}
    </TaxPageWrapper>
)

}






