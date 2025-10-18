import { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/context/UserContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/context/ScrollToTop";
import Login from "./pages/auth/Login";
import DashboardHome from "./pages/home/DashboardHome";
import SalePage from "./pages/sale/SalePage";
import AddSale from "./pages/sale/Add/AddSale";
import EditSale from "./pages/sale/Edit/EditSale";
import ViewSale from "./pages/sale/view/ViewSale";
import CustomerPage from "./pages/customer/CustomerPage";
import AddCustomer from "./pages/customer/Add/AddCustomer";
import EditCustomer from "./pages/customer/edit/EditCustomer";
import CustomerDetail from "./pages/customer/detail/CustomerDetail";
import PurchasePage from "./pages/purchase/PurchasePage";
import AddPurchase from "./pages/purchase/add/AddPurchase";
import EditPurchase from "./pages/purchase/edit/EditPurchase";
import ViewPurchase from "./pages/purchase/view/ViewPurchase";
import SupplierPage from "./pages/supplier/SupplierPage";
import AddSupplier from "./pages/supplier/add/AddSupplier";
import SupplierDetail from "./pages/supplier/view/ViewSupplier";
import EditSupplier from "./pages/supplier/edit/EditSupplier";
import ProductPage from "./pages/product/ProductPage";
import AddProduct from "./pages/product/add/AddProduct";
import EditProduct from "./pages/product/edit/EditProduct";
import ProductDetail from "./pages/product/view/ProductDetail";
import CategoryPage from "./pages/category/CategoryPage";
import AddCategory from "./pages/category/add/AddCategory";
import EditCategory from "./pages/category/edit/EditCategory";
import CategoryDetail from "./pages/category/view/CategoryDetail";
import PaymentPage from "./pages/payment/PaymentPage";
import AddPayment from "./pages/payment/add/AddPayment";
import EditPayment from "./pages/payment/edit/EditPayment";
import ExpensePage from "./pages/expense/ExpensePage";
import AddExpenses from "./pages/expense/add/AddExpense";
import EditExpenses from "./pages/expense/edit/EditExpense";
import ReportsPage from "./pages/reports/ReportsPage";
import SalesReport from "./pages/reports/sale_report/SalesReport";
import StockReport from "./pages/reports/stock_report/StockReport";
import PurchaseReport from "./pages/reports/purchase_report/PurchaseReport";
import ExpenseReport from "./pages/reports/expense_report/ExpenseReport";
import TaxPage from "./pages/tax/TaxPage";
import AddTax from "./pages/tax/add/AddTax";
import EditTax from "./pages/tax/edit/EditTax";
import UnitsPage from "./pages/units/UnitsPage";
import AddUnits from "./pages/units/add/AddUnits";
import EditUnits from "./pages/units/edit/EditUnits";
import UserPage from "./pages/user/UserPage";
import AddUser from "./pages/user/Add/AddUser";
import UserDetail from "./pages/user/detail/UserDetail";
import EditUser from "./pages/user/edit/EditUser";
import AddCompany from "./pages/company_profile/add_company/AddCompany";
import CompanyDetail from "./pages/company_profile/company_detail/CompanyDetail";
import EditCompany from "./pages/company_profile/edit_company/EditCompany";
// import ProtectedRoute from "./components/protected_route/ProtectedRoute";
// import UserHome from "./pages/system_user/home/UserHome";
// import Unauthorized from "./components/unauthorized/Unauthorized";
import MyCalender from "./pages/MyCalender";
import DashboardLayout from "./pages/home/DashboardLayout";
import AddSaleReturn from "./pages/return/sale_return/add/AddSaleReturn";
import SaleReturnPage from "./pages/return/sale_return/SaleReturnPage";
import SaleReturnView from "./pages/return/sale_return/view/SaleReturnView";
import EditSaleReturn from "./pages/return/sale_return/edit/EditSaleReturn";
import AddPurchaseReturn from "./pages/return/purchase_return/add/AddPurchaseReturn";
import PurchaseReturnsPage from "./pages/return/purchase_return/PurchaseReturnsPage";
import PurchaseReturnView from "./pages/return/purchase_return/view/PurchaseReturnView";
import TopSellingProds from "./pages/product/top_selling_products/TopSellingProds";
import LowStock from "./pages/product/product_low_stock/LowStock";
import ProtectedRoute from "./components/protected_route/ProtectedRoute";
import { LoaderWrapper } from "./pages/home/Home.style";

function App() {
  const { user, loading } = useContext(UserContext);
  const location = useLocation();

  // If still verifying the user, show nothing or a loader
  if (loading) return <LoaderWrapper>Loading...</LoaderWrapper>;

  // ✅ Check if current page is login
  const isLoginPage = location.pathname === "/";

  return (
    <ScrollToTop>
      {isLoginPage ? (
        // ✅ Show only login page, no sidebar/header
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
        </Routes>
      ) : (
        // ✅ Wrap all dashboard pages with layout
        <DashboardLayout>
          <Routes>
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<DashboardHome />} />}
            />
            {/* CATEGORY */}
            <Route
              path="/categories"
              element={<ProtectedRoute element={<CategoryPage />} />}
            />
            <Route
              path="/add-category"
              element={<ProtectedRoute element={<AddCategory />} />}
            />
            <Route
              path="/edit-category/:categoryId"
              element={<ProtectedRoute element={<EditCategory />} />}
            />
            <Route
              path="/category-detail/:categoryId"
              element={<ProtectedRoute element={<CategoryDetail />} />}
            />
            {/* PRODUCT */}
            <Route
              path="/products"
              element={<ProtectedRoute element={<ProductPage />} />}
            />
            <Route
              path="/add-product"
              element={<ProtectedRoute element={<AddProduct />} />}
            />
            <Route
              path="/edit-product/:productId"
              element={<ProtectedRoute element={<EditProduct />} />}
            />
            <Route
              path="/product-detail/:productId"
              element={<ProtectedRoute element={<ProductDetail />} />}
            />
            <Route
              path="/low-stock"
              element={<ProtectedRoute element={<LowStock />} />}
            />
            <Route
              path="/top-selling"
              element={<ProtectedRoute element={<TopSellingProds />} />}
            />
            {/* SALE */}
            <Route
              path="/sales"
              element={<ProtectedRoute element={<SalePage />} />}
            />
            <Route
              path="/add-sale"
              element={<ProtectedRoute element={<AddSale />} />}
            />
            <Route
              path="/edit-sale/:saleId"
              element={<ProtectedRoute element={<EditSale />} />}
            />
            <Route
              path="/sale-invoice/:saleId"
              element={<ProtectedRoute element={<ViewSale />} />}
            />
            {/* CUSTOMER */}
            <Route
              path="/customers"
              element={<ProtectedRoute element={<CustomerPage />} />}
            />
            <Route
              path="/add-customer"
              element={<ProtectedRoute element={<AddCustomer />} />}
            />
            <Route
              path="/customers/:customerId"
              element={<ProtectedRoute element={<CustomerDetail />} />}
            />
            <Route
              path="/edit-customer/:customerId"
              element={<ProtectedRoute element={<EditCustomer />} />}
            />
            {/* PURCHASE */}
            <Route
              path="/purchase"
              element={<ProtectedRoute element={<PurchasePage />} />}
            />
            <Route
              path="/add-purchase"
              element={<ProtectedRoute element={<AddPurchase />} />}
            />
            <Route
              path="/edit-purchase/:purchaseId"
              element={<ProtectedRoute element={<EditPurchase />} />}
            />
            <Route
              path="/purchase-invoice/:purchaseId"
              element={<ProtectedRoute element={<ViewPurchase />} />}
            />
            {/* SUPPLIER */}
            <Route
              path="/suppliers"
              element={<ProtectedRoute element={<SupplierPage />} />}
            />
            <Route
              path="/add-supplier"
              element={<ProtectedRoute element={<AddSupplier />} />}
            />
            <Route
              path="/supplier-detail/:supplierId"
              element={<ProtectedRoute element={<SupplierDetail />} />}
            />
            <Route
              path="/edit-supplier/:supplierId"
              element={<ProtectedRoute element={<EditSupplier />} />}
            />
            {/* PAYMENTS */}
            <Route
              path="/payments"
              element={<ProtectedRoute element={<PaymentPage />} />}
            />
            <Route
              path="/add-payments"
              element={<ProtectedRoute element={<AddPayment />} />}
            />
            <Route
              path="/edit-payment/:paymentId"
              element={<ProtectedRoute element={<EditPayment />} />}
            />
            {/* Expenses */}
            <Route
              path="/expenses"
              element={<ProtectedRoute element={<ExpensePage />} />}
            />
            <Route
              path="/add-expense"
              element={<ProtectedRoute element={<AddExpenses />} />}
            />
            <Route
              path="/edit-expense/:expenseId"
              element={<ProtectedRoute element={<EditExpenses />} />}
            />
            {/* REPORTS */}
            <Route
              path="/reports"
              element={<ProtectedRoute element={<ReportsPage />} />}
            />
            <Route
              path="/sales-report"
              element={<ProtectedRoute element={<SalesReport />} />}
            />
            <Route
              path="/purchase-report"
              element={<ProtectedRoute element={<PurchaseReport />} />}
            />
            <Route
              path="/stock-report"
              element={<ProtectedRoute element={<PurchaseReport />} />}
            />
            <Route
              path="/expense-report"
              element={<ProtectedRoute element={<ExpenseReport />} />}
            />
            {/* SALE RETURN/REFUND */}
            <Route
              path="/sale-return"
              element={<ProtectedRoute element={<SaleReturnPage />} />}
            />
            <Route
              path="/add-sale-return"
              element={<ProtectedRoute element={<AddSaleReturn />} />}
            />
            <Route
              path="/sale-return/:returnId"
              element={<ProtectedRoute element={<SaleReturnView />} />}
            />
            <Route
              path="/edit-return/:returnId"
              element={<ProtectedRoute element={<EditSaleReturn />} />}
            />
            {/* PURCHASE RETURN/REFUND */}
            <Route
              path="/purchase-return"
              element={<ProtectedRoute element={<PurchaseReturnsPage />} />}
            />
            <Route
              path="/add-purchase-return"
              element={<ProtectedRoute element={<AddPurchaseReturn />} />}
            />{" "}
            <Route
              path="/purchase-return/:returnId"
              element={<ProtectedRoute element={<PurchaseReturnView />} />}
            />
            {/* TAX */}
            <Route
              path="/tax"
              element={<ProtectedRoute element={<TaxPage />} />}
            />
            <Route
              path="/add-tax"
              element={<ProtectedRoute element={<AddTax />} />}
            />
            <Route
              path="/edit-tax/:taxId"
              element={<ProtectedRoute element={<EditTax />} />}
            />
            {/* UNITS */}
            <Route
              path="/units"
              element={<ProtectedRoute element={<UnitsPage />} />}
            />
            <Route
              path="/add-units"
              element={<ProtectedRoute element={<AddUnits />} />}
            />
            <Route
              path="/edit-units/:unitId"
              element={<ProtectedRoute element={<EditUnits />} />}
            />
            {/* USERS */}
            <Route
              path="/users"
              element={<ProtectedRoute element={<UserPage />} />}
            />
            <Route
              path="/add-user"
              element={<ProtectedRoute element={<AddUser />} />}
            />
            <Route
              path="/edit-user/:userId"
              element={<ProtectedRoute element={<EditUser />} />}
            />
            <Route
              path="/users/:userId"
              element={<ProtectedRoute element={<UserDetail />} />}
            />
            {/* COMPANY PROFILE */}
            <Route
              path="/add-company"
              element={<ProtectedRoute element={<AddCompany />} />}
            />
            <Route
              path="/company-profile"
              element={<ProtectedRoute element={<CompanyDetail />} />}
            />
            <Route
              path="/company-profile/:companyId"
              element={<ProtectedRoute element={<CompanyDetail />} />}
            />
            <Route
              path="/edit-company/:companyId"
              element={<ProtectedRoute element={<EditCompany />} />}
            />
            <Route
              path="/company-calender"
              element={<ProtectedRoute element={<MyCalender />} />}
            />
          </Routes>
        </DashboardLayout>
      )}
    </ScrollToTop>
  );
}
export default App;
