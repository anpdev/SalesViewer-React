import React from "react";
import {  NavLink } from "react-router-dom";

import { Navbar, Nav} from "react-bootstrap";
import './dashbordHeader.scss';


import useConfig from "../../../hooks/useConfig";
  
function DashboardHeader() {
const conf = useConfig(); 
 
  
  return (
    <>
    <div className="header-container">
        <div className="content">
        <div className="top-menu">   
        <div className="menu-horizontal">
        <Navbar>    
        <Nav>  
           <ul className="menu-items-container menu-no-icons"> 
             <li className="menu-item-wrapper">
                <div className="template-wrapper item-content menu-item-content">
               <NavLink className="menu-item theme-text-color" to="product">
                  Revenue by product
              </NavLink> 
              </div>
              </li>  
              <li className="menu-item-wrapper"> 
              <div className="template-wrapper item-content menu-item-content">
              <NavLink className="menu-item theme-text-color" to="category">
                  Revenue by category
              </NavLink> 
              </div>
              </li>  
              <li className="menu-item-wrapper"> 
              <div className="template-wrapper item-content menu-item-content">
              <NavLink className="menu-item theme-text-color" to="channels">
                  Revenue by channels
              </NavLink> 
              </div>
              </li>  
              <li className="menu-item-wrapper"> 
              <div className="template-wrapper item-content menu-item-content">
              <NavLink className="menu-item theme-text-color" to="products">
                  products
              </NavLink>
              </div>
              </li>  
              <li className="menu-item-wrapper"> 
              <div className="template-wrapper dx-item-content menu-item-content">
              <NavLink className="menu-item theme-text-color" to="sales">
                  sales
              </NavLink> 
              </div>
              </li>  
              <li className="menu-item-wrapper"> 
              <div className="template-wrapper item-content menu-item-content">
              <NavLink className="menu-item theme-text-color" to="customers">
                  customers
              </NavLink>  
              </div>
              </li>   
              </ul>   
          </Nav>
          </Navbar> 
       </div>
    </div>
    </div>   
    </div>   
    </>
  );
}

export default DashboardHeader;
