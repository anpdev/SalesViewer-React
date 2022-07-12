import React ,{  useState } from 'react'
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useConfig from '../../hooks/useConfig';
import { Navbar, Nav, FormControl, Form, Button} from "react-bootstrap";
import logo from "../../images/common/corcrmlogo.png";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faFileInvoiceDollar, faLaptop, faCalendar, faUser, faPowerOff, faMagnifyingGlass, faTicket, }  from "@fortawesome/free-solid-svg-icons";
import globe from "../../images/common/globe.svg";
import useToast  from '../../hooks/useToast';
function HeaderTop({topMenu,hiddenWebsite}) {
    
    const { setAuth,auth: { userName }, } = useAuth();
    const conf = useConfig();
    const axios = useAxios();
    const toast = useToast();
    const [searchData, setsearchData] = useState({ userID: "", orderID: "" });
    const {calendar,invoice,new_order,pos,show_search_orderID,show_search_userID,tickets}  = topMenu;
    const {is_hidden_site_enabled,hidden_website_url}  = hiddenWebsite;
    const logout = () => {
        setAuth({});
        sessionStorage.removeItem("authData");
        //navigate("/login", { replace: true });
        window.location.href=`${conf.appDomain}/logoff/`;
    };

    const search =async (event,type) => {
        event.preventDefault();
        let url = '';
        if(type==='user'){
            url =`user/${searchData.userID}/`;
        }else if(type==='order'){
            url = `order/${searchData.orderID}/`;
        }
        const response = await axios.get(url);
        if(!response.data.data.success){
            toast.error(response.data.error);
            return;
        }else{
           window.location.href=response.data.data.url;
        }
    }
    
    const handleChange = (e) => {
        const reg = /^[0-9\b]+$/;
        if (e.target.value === '' || reg.test(e.target.value)) {
            setsearchData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
            });
        }
    };

    const showTopMenu = () => {
        return (
            <React.Fragment>
                {show_search_userID ===true ? 
                    <Form className="d-flex form-group align-items-center me-2" onSubmit={(event) => search(event,'user')}>
                        <FormControl className="field-small" name="userID" value={searchData.userID}
                        onChange={handleChange} type="search" placeholder="User ID" aria-label="Search"/>
                        <Button className="btn-float" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} ></FontAwesomeIcon></Button>
                    </Form> 
                : null}

                {show_search_orderID ===true ?
                    <Form className="d-flex form-group align-items-center" onSubmit={(event) => search(event,'order')} >
                        <FormControl className="field-small" name="orderID" value={searchData.orderID}
                        onChange={handleChange} type="search" placeholder="Order ID" aria-label="Search"/>
                        <Button className="btn-float" type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon></Button>
                    </Form>
                : null}

                {new_order ===true ?
                    <a className="nav-link" href={`${conf.appDomain}/new_order/#!/order/`}>
                        <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon> New Order
                    </a>
                : null}

                {invoice ===true ?
                    <a className="nav-link" href={`${conf.appDomain}/invoice/#!/create/`}>
                        <FontAwesomeIcon icon={faFileInvoiceDollar}></FontAwesomeIcon> Create Invoice
                    </a>
                : null}

                {pos ===true ?
                    <a className="nav-link" href={`${conf.appDomain}/pos/`}>
                        <FontAwesomeIcon icon={faLaptop}></FontAwesomeIcon> POS
                    </a>
                : null}

                {calendar ===true ?
                    <a className="nav-link" href={`${conf.appDomain}/calendar/`}>
                        <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon> Calender
                    </a>
                : null}

                {tickets ===true ?
                    <a className="nav-link" href={`${conf.appDomain}/tickets/`}>
                        <FontAwesomeIcon icon={faTicket}></FontAwesomeIcon> Tickets
                    </a>
                : null}

                <Link className="nav-link" to={`#${userName}`}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> {userName}</Link>
                <Link className="nav-link" to="#" onClick={logout}><FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon> Logoff</Link>
            </React.Fragment>
        )
    };

    return (
        <React.Fragment>
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Navbar.Brand to="#home" className="d-flex">
                    <img src={logo} alt="hiecor logo" />
                </Navbar.Brand>
                <a className="tagline" href={`${conf.appDomain}/getting_started/`}>Getting Started</a>
                {is_hidden_site_enabled ==='1' ? 
                    <a className="globe-wrapper" rel="noreferrer"  href={hidden_website_url} target='_blank'><img src={globe} alt="hiecor logo" /></a>
                : null}
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        {showTopMenu()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
    )
}

export default HeaderTop
