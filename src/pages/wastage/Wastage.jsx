
import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { List } from 'react-content-loader'

import { WastageContent, WastageWrapper } from '../return/purchase_return/purchaseReturnsPage.style'
import { UserContext } from '../../components/context/UserContext'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import PurchaseReturnTable from '../../components/table/purchase_table/purchase_return_table/PurchaseReturnTable'




export default function Wastage() {
  
  const token = localStorage.getItem('token');
    
     const[wastageRecords, setWastageRecords] = useState([]);
     const [allWastageRecords, setAllWastageRecords] = useState([]);
     const [isLoading, setIsLoading] = useState(false);

          // user Permission
          const {user, permissions} = useContext(UserContext);
          const purchaseReturnPermission = permissions?.find(p => p.module === "Wastage")
          const effectivePermission =
              user?.role === "admin"
                ? { canView: true, canAdd: true, canEdit: true, canDelete: true }
                : purchaseReturnPermission;

       
     // fetch expense handler 
                          useEffect(() => {
                              const getWastage = async () => { 
                                setIsLoading(true)  
                                try {
                                      const res = await axios.get(process.env.REACT_APP_URL + "/api/wastage/", {
                                                                          headers: {
                                                                            Authorization: `Bearer ${token}`
                                                                          }
                                                                    })
                                     
                                      setWastageRecords(res.data)
                                      setAllWastageRecords(res.data);
                                      setIsLoading(false)
                    
                                      console.log(res.data)
                                  } catch (err) {
                                      console.log(err)
                                      setIsLoading(false)
                                  }
                          
                              }
                              getWastage();
                          }, [])



           // handle wastage return delete
          const deleteWastage = async (wastageId,  updatedList = null) => {
            
            if (updatedList) {
              setWastageRecords(updatedList);
              return { success: true };
            }
            
            try {
              await axios.delete(`${process.env.REACT_APP_URL}/api/wastage/${wastageId}`, {
                                                  headers: {
                                                    Authorization: `Bearer ${token}`
                                                  }
                                            })
              const updatedWastage = wastageRecords.filter(wastage => wastage._id !== wastageId);
              setWastageRecords(updatedWastage);
              return { success: true };
            } catch (error) {
              return { success: false, message: error.message };
            }
          };

// handle search query
            const handleSearchQueryOnChange = (e) => {
              let query = e.target.value.trim().toLowerCase();
              //  if query is empty, reset to all record
              if(query === ''){
                setWastageRecords(allWastageRecords);
              }else{
                // Filter records based on query
                const filterRecords = allWastageRecords.filter(item =>
                  item.supplier?.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())||
                  item.code?.toLowerCase().includes(query)
                );
                setWastageRecords(filterRecords)
              }
            }


  const navigate = useNavigate();
  return (
    <WastageWrapper>
        <PageTitle title={'Wastages'}/>

        {/* content */}
      {isLoading? 
      <List/> :
        <WastageContent>
          <ListHeader 
            title={'Add Wastage'} 
            btnOnClick={()=>navigate('/add-wastage')}
            searQuery={'supplier or code'}
            onChange={handleSearchQueryOnChange}
            type={'text'}
            dataLength={wastageRecords.length}
            permission={effectivePermission.canAdd}
          />
          
          {/* Purchase Return Table */}
            <PurchaseReturnTable 
              data={wastageRecords}
              onDeletePurchase={deleteWastage}
              purchaseReturnPermission={effectivePermission}
            />
        </WastageContent>

      }
    </WastageWrapper>
  )
}




