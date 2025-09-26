import { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Content, MainContent } from "./pages/admin/home/Home.style";
import ScrollToTop from "./components/context/ScrollToTop";
import HideSidebar from "./components/hide/hide-sidebar/HideSidebar";
import Siderbar from "./components/sidebar/Siderbar";
import HiderHeader from "./components/hide/Hider-header/HiderHeader";
import HeaderDashboard from "./components/header/HeaderDashboard";
import Login from "./pages/auth/Login";
import DashboardHome from "./pages/admin/home/DashboardHome";
import SalePage from "./pages/admin/sale/SalePage";
import AddSale from "./pages/admin/sale/Add/AddSale";
import EditSale from "./pages/admin/sale/Edit/EditSale";
import ViewSale from "./pages/admin/sale/view/ViewSale";
import CustomerPage from "./pages/admin/customer/CustomerPage";
import AddCustomer from "./pages/admin/customer/Add/AddCustomer";
import EditCustomer from "./pages/admin/customer/edit/EditCustomer";
import CustomerDetail from "./pages/admin/customer/detail/CustomerDetail";
import PurchasePage from "./pages/admin/purchase/PurchasePage";
import AddPurchase from "./pages/admin/purchase/add/AddPurchase";
import EditPurchase from "./pages/admin/purchase/edit/EditPurchase";
import ViewPurchase from "./pages/admin/purchase/view/ViewPurchase";
import SupplierPage from "./pages/admin/supplier/SupplierPage";
import AddSupplier from "./pages/admin/supplier/add/AddSupplier";
import SupplierDetail from "./pages/admin/supplier/view/ViewSupplier";
import EditSupplier from "./pages/admin/supplier/edit/EditSupplier";
import ProductPage from "./pages/admin/product/ProductPage";
import AddProduct from "./pages/admin/product/add/AddProduct";
import EditProduct from "./pages/admin/product/edit/EditProduct";
import ProductDetail from "./pages/admin/product/view/ProductDetail";
import CategoryPage from "./pages/admin/category/CategoryPage";
import AddCategory from "./pages/admin/category/add/AddCategory";
import EditCategory from "./pages/admin/category/edit/EditCategory";
import CategoryDetail from "./pages/admin/category/view/CategoryDetail";
import PaymentPage from "./pages/admin/payment/PaymentPage";
import AddPayment from "./pages/admin/payment/add/AddPayment";
import EditPayment from "./pages/admin/payment/edit/EditPayment";
import ExpensePage from "./pages/admin/expense/ExpensePage";
import AddExpenses from "./pages/admin/expense/add/AddExpense";
import EditExpenses from "./pages/admin/expense/edit/EditExpense";
import ReportsPage from "./pages/admin/reports/ReportsPage";
import SalesReport from "./pages/admin/reports/sale_report/SalesReport";
import StockReport from "./pages/admin/reports/stock_report/StockReport";
import PurchaseReport from "./pages/admin/reports/purchase_report/PurchaseReport";
import ExpenseReport from "./pages/admin/reports/expense_report/ExpenseReport";
import TaxPage from "./pages/admin/tax/TaxPage";
import AddTax from "./pages/admin/tax/add/AddTax";
import EditTax from "./pages/admin/tax/edit/EditTax";
import UnitsPage from "./pages/admin/units/UnitsPage";
import AddUnits from "./pages/admin/units/add/AddUnits";
import EditUnits from "./pages/admin/units/edit/EditUnits";
import UserPage from "./pages/user/UserPage";
import AddUser from "./pages/user/Add/AddUser";
import UserDetail from "./pages/user/detail/UserDetail";
import EditUser from "./pages/user/edit/EditUser";
import AddCompany from "./pages/admin/company_profile/add_company/AddCompany";
import CompanyDetail from "./pages/admin/company_profile/company_detail/CompanyDetail";
import EditCompany from "./pages/admin/company_profile/edit_company/EditCompany";
import ProtectedRoute from "./components/protected_route/ProtectedRoute";
import UserHome from "./pages/system_user/home/UserHome";
import Unauthorized from "./components/unauthorized/Unauthorized";
import MyCalender from "./pages/MyCalender";
import DashboardLayout from "./pages/admin/home/DashboardLayout";
import AddSaleReturn from "./pages/admin/return/sale_return/add/AddSaleReturn";
import SaleReturnPage from "./pages/admin/return/sale_return/SaleReturnPage";
import SaleReturnView from "./pages/admin/return/sale_return/view/SaleReturnView";

function App() {
  const { user } = useContext(UserContext);
  const location = useLocation();

  // ✅ Check if current page is login
  const isLoginPage = location.pathname === "/";

  return (
    <ScrollToTop>
      {isLoginPage ? (
        // ✅ Show only login page, no sidebar/header
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        // ✅ Wrap all dashboard pages with layout
        <DashboardLayout>
          <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            {/* Add other protected routes here */}

            {/* Redirect to Dashboard if logged in */}
            <Route path="/" element={<Login />} />

            {/* // Admin-only route */}
            {/* <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  element={<DashboardHome />}
                  allowedRoles={["admin"]}
                />
              }
            /> */}
            {/* User-only route */}
            {/* <Route
              path="/user-dashboard"
              element={
                <ProtectedRoute
                  element={<UserHome />}
                  allowedRoles={["user"]}
                />
              }
            /> */}
            {/* Admin and user allowed */}
            {/* <Route
              path="/sales"
              element={
                <ProtectedRoute
                  element={<SalePage />}
                  allowedRoles={["admin", "user"]}
                />
              }
            /> */}
            {/* Unauthorized Page */}
            {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
            {/* CATEGORY */}
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route
              path="/edit-category/:categoryId"
              element={<EditCategory />}
            />
            <Route
              path="/category-detail/:categoryId"
              element={<CategoryDetail />}
            />
            {/* PRODUCT */}
            <Route path="/products" element={<ProductPage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
            <Route
              path="/product-detail/:productId"
              element={<ProductDetail />}
            />
            {/* SALE */}
            <Route path="/sales" element={<SalePage />} />
            <Route path="/add-sale" element={<AddSale />} />
            <Route path="/edit-sale/:saleId" element={<EditSale />} />
            <Route path="/sale-invoice/:saleId" element={<ViewSale />} />
            {/* CUSTOMER */}
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/add-customer" element={<AddCustomer />} />
            <Route path="/customers/:customerId" element={<CustomerDetail />} />
            <Route
              path="/edit-customer/:customerId"
              element={<EditCustomer />}
            />
            {/* PURCHASE */}
            <Route path="/purchase" element={<PurchasePage />} />
            <Route path="/add-purchase" element={<AddPurchase />} />
            <Route
              path="/edit-purchase/:purchaseId"
              element={<EditPurchase />}
            />
            <Route
              path="/purchase-invoice/:purchaseId"
              element={<ViewPurchase />}
            />
            {/* SUPPLIER */}
            <Route path="/suppliers" element={<SupplierPage />} />
            <Route path="/add-supplier" element={<AddSupplier />} />
            <Route
              path="/supplier-detail/:supplierId"
              element={<SupplierDetail />}
            />
            <Route
              path="/edit-supplier/:supplierId"
              element={<EditSupplier />}
            />
            {/* PAYMENTS */}
            <Route path="/payments" element={<PaymentPage />} />
            <Route path="/add-payments" element={<AddPayment />} />
            <Route path="/edit-payment/:paymentId" element={<EditPayment />} />
            {/* Expenses */}
            <Route path="/expenses" element={<ExpensePage />} />
            <Route path="/add-expense" element={<AddExpenses />} />
            <Route path="/edit-expense/:expenseId" element={<EditExpenses />} />
            {/* REPORTS */}
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/sales-report" element={<SalesReport />} />
            <Route path="/purchase-report" element={<PurchaseReport />} />
            <Route path="/stock-report" element={<StockReport />} />
            <Route path="/expense-report" element={<ExpenseReport />} />

            {/* RETURN/REFUND */}
            <Route path="/sale-return" element={<SaleReturnPage />} />
            <Route path="/add-sale-return" element={<AddSaleReturn />} />
            <Route path="/sale-return/:returnId" element={<SaleReturnView />} />
            {/* TAX */}
            <Route path="/tax" element={<TaxPage />} />
            <Route path="/add-tax" element={<AddTax />} />
            <Route path="/edit-tax/:taxId" element={<EditTax />} />
            {/* UNITS */}
            <Route path="/units" element={<UnitsPage />} />
            <Route path="/add-units" element={<AddUnits />} />
            <Route path="/edit-units/:unitId" element={<EditUnits />} />
            {/* USERS */}
            <Route path="/users" element={<UserPage />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:userId" element={<EditUser />} />
            <Route path="/users/:userId" element={<UserDetail />} />
            {/* COMPANY PROFILE */}
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/company-profile" element={<CompanyDetail />} />
            <Route
              path="/company-profile/:companyId"
              element={<CompanyDetail />}
            />
            <Route path="/edit-company/:companyId" element={<EditCompany />} />
            <Route path="/company-calender" element={<MyCalender />} />
          </Routes>
        </DashboardLayout>
      )}
    </ScrollToTop>
  );
}
export default App;

// <Route
//               path="/"
//               element={user ? <Navigate to="/dashboard" /> : <Login />}
//             />

//             {/* Protected Routes */}
//             <Route
//               path="/dashboard"
//               element={<ProtectedRoute element={<DashboardHome />} />}
//             />
//             <Route
//               path="/posts"
//               element={<ProtectedRoute element={<Posts />} />}
//             />
//             <Route
//               path="/create-post"
//               element={<ProtectedRoute element={<CreatePost />} />}
//             />
//             <Route
//               path="/post/:postId"
//               element={<ProtectedRoute element={<PostDetail />} />}
//             />
//             <Route
//               path="/edit/:postId"
//               element={<ProtectedRoute element={<EditPost />} />}
//             />
//             <Route
//               path="/categories"
//               element={<ProtectedRoute element={<Categories />} />}
//             />
//             <Route
//               path="/category/:categoryId"
//               element={<ProtectedRoute element={<CategoryDetail />} />}
//             />
//             <Route
//               path="/create-category"
//               element={<ProtectedRoute element={<CreateCategory />} />}
//             />
//             <Route
//               path="/editcategory/:categoryId/"
//               element={<ProtectedRoute element={<EditCategory />} />}
//             />
//             <Route
//               path="/users"
//               element={<ProtectedRoute element={<Users />} />}
//             />
