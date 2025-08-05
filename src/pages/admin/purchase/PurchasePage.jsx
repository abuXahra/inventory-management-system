
import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/page_title/PageTitle'
import ListHeader from '../../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import { PurchasePageContent, PurchasePageWrapper } from './purchasePage.style'
import PurchaseTable from '../../../components/table/purchase_table/Purchase'
import axios from 'axios'
import { List } from 'react-content-loader'



export default function PurchasePage() {

   const[purchaseRecords, setPurchaseRecords] = useState([]);
   const [allPurchaseRecords, setAllPurchaseRecords] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

 // fetch expense handler 
                          useEffect(() => {
                              const getPurchase = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/purchase/")
                                     
                                      setPurchaseRecords(res.data)
                                      setAllPurchaseRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getPurchase();
                          }, [])



           // handle purchase delete
          const deletePurchase = async (purchaseId,  updatedList = null) => {
            
            if (updatedList) {
              setPurchaseRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/purchase/${purchaseId}`);
              const updatedPurchase = purchaseRecords.filter(purchase => purchase._id !== purchaseId);
              setPurchaseRecords(updatedPurchase);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };

// handle search query
            const handleSearchQueryOnChange = (e) => {
              let query = e.target.value;
              //  if query is empty, reset to all record
              if(query === ''){
                setPurchaseRecords(allPurchaseRecords);
              }else{
                // Filter records based on query
                const filterRecords = allPurchaseRecords.filter(item =>
                  item.supplier?.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
                );
                setPurchaseRecords(filterRecords)
              }
            }


  const navigate = useNavigate();
  return (
    <PurchasePageWrapper>
        <PageTitle title={'Purchase'}/>

          {/* content */}
        {isLoading? <List/> :
        <PurchasePageContent>
          <ListHeader 
            title={'Purchase'} 
            btnOnClick={()=>navigate('/add-purchase')}
            searQuery={'Supplier'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={purchaseRecords.length}
          />
          
          {/* Purchase Table */}
            <PurchaseTable 
                data={purchaseRecords} 
                onDeletePurchase={deletePurchase} 
                setIsLoading={setIsLoading}
            />
        </PurchasePageContent>

        } 
    </PurchasePageWrapper>
  )
}




