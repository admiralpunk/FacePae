import './App.css'
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from '../src/AdminPanel';
import Login from '../src/Login';
// import Orders from '../src/components/sidebar menu/orders';
// import OrderDetails from '../src/components/sidebar menu/orderdetails';
import Menu from '../src/components/sidebar menu/menu';
import Dashboard from '../src/components/sidebar menu/dashboard';
import Staff from '../src/components/sidebar menu/staff';
import AddMenu from '../src/components/sidebar menu/addmenu';
import Setting from '../src/components/sidebar menu/setting';
import SignUp from '../src/Signup';

const Orders = lazy(() => import('../src/components/sidebar menu/orders'));



function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/orders" element={<Orders />} />
            {/* <Route path="/orderdetails" element={<OrderDetails />} /> */}
            <Route path="/menu" element={<Menu />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/addmenu" element={<AddMenu />} />
            <Route path="/settings" element={<Setting />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  )
}

export default App