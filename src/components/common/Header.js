import React,{useEffect,useState} from "react";
import {  NavLink } from "react-router-dom";

import { Navbar, Nav} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTachometer, faServer, faPhoneSquare, faEnvelope, faCartPlus, faFileText, faTruck, faBook, faCog, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import   '../../css/component/header.scss';
import useConfig from "../../hooks/useConfig";
import HeaderTop from './HeaderTop';
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
function Header() {
  const conf = useConfig();
  const axios = useAxios();
  const { auth: { userID }} = useAuth();
  const [settings, setSettings] = useState({ menu: {}, topMenu: {},hiddenWebsite : {} });
  
  useEffect(  () => {
    async function fetchData() {
    const response = await axios.get(`/user/settings/71369396/`);
    setSettings({
      'topMenu'       : response.data.data.topMenu,
      'hiddenWebsite' : response.data.data.hiddenWebsite,
      'menu'          : response.data.data.mainMenu
    })
  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
 
  return (
    <>
    <HeaderTop topMenu = {settings.topMenu}  hiddenWebsite={settings.hiddenWebsite}/>
    <Navbar className="secondaryNavbar" collapseOnSelect expand="lg" variant="light">
        <Navbar.Collapse id="responsive-navbar-nav-secondary">
          <Nav>
            {/* {settings?.menu?.dashboard?.visibility===true ? */}
            <NavLink className="nav-link" to="dashboard/">
                <FontAwesomeIcon icon={faFileText}></FontAwesomeIcon> Dashboard
              </NavLink>
            {/* : null } */} 
            {settings?.menu?.customer?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/customer/`}>
                <FontAwesomeIcon icon={faServer}></FontAwesomeIcon> Customer Service
              </a>
            : null }
            {settings?.menu?.contacts?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/contacts/`}>
                <FontAwesomeIcon icon={faPhoneSquare}></FontAwesomeIcon> Contacts
              </a>
            : null }
            {settings?.menu?.commerce?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/commerce/`}>
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> Ecommerce
              </a>
            : null }
            {settings?.menu?.email?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/email/`}>
                <FontAwesomeIcon icon={faCartPlus}></FontAwesomeIcon> Email
              </a>
            : null }
            {settings?.menu?.products?.visibility===true ?
              <NavLink className="nav-link" to="products/">
                <FontAwesomeIcon icon={faFileText}></FontAwesomeIcon> Inventory
              </NavLink>
            : null }
            {settings?.menu?.shipping?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/shipping/`}>
                <FontAwesomeIcon icon={faTruck}></FontAwesomeIcon> Fulfillment
              </a>
            : null }
            {settings?.menu?.routing?.visibility===true ?
              <NavLink className="nav-link" to="routing/">
                <FontAwesomeIcon icon={faFileText}></FontAwesomeIcon> Routing
              </NavLink>
            : null }
            {settings?.menu?.reports?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/reports/`}>
                <FontAwesomeIcon icon={faBook}></FontAwesomeIcon> Reports
              </a>
            : null }
            {settings?.menu?.settings?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/settings/`}>
                <FontAwesomeIcon icon={faCog}></FontAwesomeIcon> Admin
              </a>
            : null }
            {settings?.menu?.help?.visibility===true ?
              <a className="nav-link" href={`${conf.appDomain}/help/`}>
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon> Help
              </a>
            : null }  
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  );
}

export default Header;
