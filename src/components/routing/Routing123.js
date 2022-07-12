import React,{useEffect,useState} from 'react'
import Maps from './Maps';
import Timeline from './Timeline'
import UserData from './UserData'
import {Form} from 'react-bootstrap'
import useAxios from "../../hooks/useAxios"
import {appointments ,tasks} from  './data.js';
import { markersData, routesData } from './mapData.js';
function Routing() {
  const draggingGroupName = 'appointmentsGroup';
  const axios  = useAxios();
  const[appointmentData,setAppointmentData] = useState(appointments);
  const[calendarData,setresourcesData] = useState({});
  const[list,setListData] = useState(tasks);
  const[googleAccounts,setGoogleAccounts] = useState([]);

  const onAppointmentRemove = (e) => {
    const index = appointmentData.indexOf(e.itemData);

    if (index >= 0) {
      appointmentData.splice(index, 1);
      list.push(e.itemData);
      setListData([...list]);
    }
  }
 
  const onAppointmentAdd = (e) => {  
    const index = list.indexOf(e.fromData);
    if (index >= 0) {
       list.splice(index, 1);
       setAppointmentData([...appointmentData,e.itemData]);
    }
  }

  const onItemDragStart = (e)  => {
    e.itemData = e.fromData;
  }

  const  onItemDragEnd =(e) => {
    if (e.toData) {
        e.cancel = true;
    }
  }


  useEffect( () => {
    async function fetchData() {
      let response = await axios.get("/user/google-accounts/");
      if(response.data.success){
        let calendar_id  = response.data.data[0].calendarID;
        const cresponse = await axios.get(`/user/calendar/${calendar_id}/`);
        setresourcesData(cresponse.data.data);
    
        setGoogleAccounts(response.data.data);
      }

      let orders = await axios.get("/order/?perpage=10&page=1");
      if(orders.data.success){
        console.log(orders.data.data.order_list)
        setListData(orders.data.data.order_list);
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const getCalendarData = async (e) => {
    let calendar_id = e.target.value;
    if(calendar_id ===''){
      return;
    }
    try {
      const response = await axios.get(`/user/calendar/${calendar_id}/`);
      if(response.data.data !==''){
        setresourcesData(response.data.data);
      }
     } catch {
       throw new Error('Data Loading Error');
     }
    console.log(e.target.value)
  }

  const getAccounts  = (type) => {
    return(
      googleAccounts.map((accounts,index) => {
        let data  = '';
        if(accounts.userType === type){
          data = <option key={index} value={accounts.calendarID}>{accounts.userName}</option>
        }
        return(
          data
        )
      })
    )
  }
  return (
    <React.Fragment>
      <div className='routingPage'>
        <div className='container-fluid' style={{ padding: '20px 35px', background: '#ffffff'}}>
            <h4>Schedule Route</h4>
            <div className='header-left'>
              <Form.Select aria-label="Default select example" onChange={getCalendarData} >
                <optgroup label="Service">
                  {getAccounts('service_calendar')}
                </optgroup>
                <optgroup label="Delivery">
                  {getAccounts('delivery_calendar')}
                </optgroup>
              </Form.Select>
            </div>
            <Timeline 
              draggingGroupName={draggingGroupName} 
              onAppointmentAdd={onAppointmentAdd}  
              onAppointmentRemove={onAppointmentRemove}
              appointments={appointmentData}
              resourcesData={calendarData}
            />
        </div>
    

        <div className="row container-fluid" style={{ padding: '20px 35px', background: '#ffffff'}}>
            <div className="col-md-7">
                <UserData 
                  draggingGroupName={draggingGroupName}
                  onItemDragStart={onItemDragStart}
                  onItemDragEnd ={onItemDragEnd}
                  tasks ={list}
                />
            </div>
            <div className='col-md-5'>
              <Maps 
                markersData={markersData}
                routesData={routesData}
              />
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Routing
