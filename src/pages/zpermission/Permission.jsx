
import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/page_title/PageTitle'
import ListHeader from '../../components/page_title/list_header/ListHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { List } from 'react-content-loader'
import { token } from '../../components/context/UserToken'
import PermissionTable from '../../components/table/permission_table/PermissionTable'
import { PermissionPageContent, PermissionPageWrapper } from './permission.style'
import { toast } from 'react-toastify'



export default function PermissionPage() {

//   const permissionData = [
    
// {
// 	title: "Product",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,

// },
// {
// 	title: "Category",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,

// },
// {
// 	title: "Customer",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: true,

// },
// {
// 	title: "Sale",
// 	add: true,
// 	edit: false,
// 	view: true,
// 	delete: true,
// },

// {
// 	title: "Supplier",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: true,

// },
// {
// 	title: "Purchase",
// 	add: true,
// 	edit: false,
// 	view: true,
// 	delete: true,
// },
// {
// 	title: "Payment",
// 	add: true,
// 	edit: false,
// 	view: true,
// 	delete: true,
// },
// {
// 	title: "Expense",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Sale Return",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Purchase Return",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "User",
// 	add: true,
// 	edit: true,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Company",
// 	add: false,
// 	edit: false,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Tax",
// 	add: false,
// 	edit: false,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Unit",
// 	add: false,
// 	edit: false,
// 	view: true,
// 	delete: false,
// },
// {
// 	title: "Generate/View Report",
// 	add: false,
// 	edit: false,
// 	view: false,
// 	delete: false,
	
// },
//   ]


  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPermissions = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/permission`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data)
      // Transform backend fields to frontend naming
      const formatted = res.data.map(p => ({
        title: p.module,
        add: p.canAdd,
        edit: p.canEdit,
        view: p.canView,
        delete: p.canDelete,
      }));

      setPermissions(formatted);
    } catch (error) {
      toast.error("Failed to fetch permissions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);


  const navigate = useNavigate();
  return (
    <PermissionPageWrapper>
        <PageTitle title={'Permission'}/>

          {/* content */}
         <ListHeader 
                    title={'Permission'} 
                    btnOnClick={()=>navigate('/add-permission')}
                    // searQuery={'Name'}
                    // onChange={handleChange}
                    type={'text'}
                  />
        <PermissionPageContent>
          {/* Permissin Table */}
            <PermissionTable 
                data={permissions} 
            />
        </PermissionPageContent>

 
    </PermissionPageWrapper>
  )
}




