import React from 'react';
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./views/DashboardLayout";
import RevenueByProduct from "./views/dashboard/product";
import RevenueByCategory from "./views/dashboard/category";
import RevenueByChannels from "./views/dashboard/channel";
import Products from './views/products/products';
import Sales from './views/sales/sales';
import Customers from './views/customers/customers';
// import themeService , {getColor} from './services/theme.service';

function Dashboard() {
    return(
      <Routes>  
        <Route path="/"  element={<DashboardLayout />}>
          <Route path="/product" index element={  <RevenueByProduct />} />
          <Route path="/category" element={  <RevenueByCategory />} />
          <Route path="/channels" element={  <RevenueByChannels />} />
          <Route path="/products" element={  <Products />} />
          <Route path="/sales" element={  <Sales />} />
          <Route path="/customers" element={  <Customers />} />
        </Route>
      </Routes> 
      );
         
      
    }
export default Dashboard 
