import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/auth/home";
import AdminWelcome from "./components/AdminDashboard/adminwelcome";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NotFound from "./components/auth/notfoundpage";
import ProductManagement from "./components/AdminDashboard/productMng"; 
import AddProduct from "./components/AdminDashboard/addproduct";
import UpdateProduct from "./components/AdminDashboard/upadteproduct";
import DeleteProducts from "./components/AdminDashboard/deleteproduct";
import ViewProduct from "./components/AdminDashboard/viewproduct";
import OrderManagement from "./components/AdminDashboard/OrderMng";
import ViewOrder from "./components/AdminDashboard/viewOrders";
import OrderStatus from "./components/AdminDashboard/orderStatus";
import RefundManagement from "./components/AdminDashboard/RefundManagement";
import RefundReports from './components/AdminDashboard/RefundReports';
import TransactionManagement from './components/AdminDashboard/TransactionManagement';
import Analytics from './components/AdminDashboard/Analytics';
import FAQs from './components/auth/FAQs';
import Blogs from './components/auth/Blogs';
import RefundPolicy from './components/auth/RefundPolicy';
import PrivacyPolicy from './components/auth/PrivacyPolicy';
import ShipmentPolicy from './components/auth/ShipmentPolicy';
import Terms from './components/auth/Terms';
import BlogPost from './components/auth/BlogPost';
import Footer from './components/AdminDashboard/Footer';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/AdminDashboard/PageTransition';
import Header from './components/AdminDashboard/Header';
import HomeHeader from './components/auth/homeHeader';
import About from './components/auth/About';	
// Create a separate component for the animated routes
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/header" element={<HomeHeader />} />

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin-dashboard" element={
          <PageTransition>
            <AdminWelcome />
          </PageTransition>
        } />

        {/* Manage Products */}
        <Route path="/product_manage" element={
          <PageTransition>
            <ViewProduct />
          </PageTransition>
        } />
        <Route path="/add-product" element={
          <PageTransition>
            <AddProduct />
          </PageTransition>
        } />
        <Route path="/update-product" element={
          <PageTransition>
            <UpdateProduct />
          </PageTransition>
        } />
        <Route path="/delete-product" element={
          <PageTransition>
            <DeleteProducts />
          </PageTransition>
        } />
        <Route path="/view-product" element={
          <PageTransition>
            <ViewProduct />
          </PageTransition>
        } />
        
        {/* Manage Orders */}
        <Route path="/order_manage" element={
          <PageTransition>
            <ViewOrder />
          </PageTransition>
        } />
        <Route path="/view_order" element={
          <PageTransition>
            <ViewOrder />
          </PageTransition>
        } />
        <Route path="/order_status/:orderId" element={
          <PageTransition>
            <OrderStatus />
          </PageTransition>
        } />
        <Route path="/refund_management" element={
          <PageTransition>
            <RefundManagement />
          </PageTransition>
        } />
        <Route path="/refund_reports" element={
          <PageTransition>
            <RefundReports />
          </PageTransition>
        } />
        <Route path="/transaction_manage" element={
          <PageTransition>
            <TransactionManagement />
          </PageTransition>
        } />
        <Route path="/analytics" element={
          <PageTransition>
            <Analytics />
          </PageTransition>
        } />
       


        {/* About section routes */}
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/shipment-policy" element={<ShipmentPolicy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Blog Post Route */}
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/footer" element={<Footer />} />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div style={{ position: 'relative' }}>
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
