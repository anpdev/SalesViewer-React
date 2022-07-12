import React from "react";
import { Routes, Route } from "react-router-dom";
import  "bootstrap";
import  "./css/index.scss";

import NotFound from "./components/common/NotFound";
import Layout from "./components/common/Layout";
import Login from "./components/login/Login";
import RequireAuth from "./components/login/RequireAuth";

const DashboardLazy = React.lazy(() => import("./components/dashboard/Dashboard"));
const RoutingLazy = React.lazy(() => import("./components/routing/Routing"));
 
function App() {
 
  return (
    <React.Fragment>
      <Routes>
        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route 
              index path="dashboard/*"
                element={
                <React.Suspense fallback={<>...</>}>
                  <DashboardLazy />
                </React.Suspense>
              }
            >
             </Route>
            
            <Route
              path="routing"
              element={
                <React.Suspense fallback={<>...</>}>
                  <RoutingLazy />
                </React.Suspense>
              }
            />
            
          </Route>
        </Route>
        {/* Public Routes */}
        <Route path="/login" element={<Login/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
    
  );
}

export default App;