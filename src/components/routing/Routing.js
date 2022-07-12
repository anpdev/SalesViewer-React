import React,{useEffect,useState} from 'react'
import Maps from './Maps';
import Timeline from './Timeline'
import UserData from './UserData'
import {Form} from 'react-bootstrap'
import useAxios from "../../hooks/useAxios"
import useToast  from '../../hooks/useToast';
import 'devextreme/dist/css/dx.light.css';


function Routing() {
  const draggingGroupName = 'appointmentsGroup';
  const axios  = useAxios();
  const toast = useToast();
  
  const[appointmentData,setAppointmentData] = useState([]);
  const[calendarData,setcalendarData] = useState({});
  const[list,setListData] = useState([]);
  const[googleAccounts,setGoogleAccounts] = useState([]);
  const[mapData,setmapData] = useState({markersData: [],routesData:[]});
  /*
  * Called when we drag the order at timeline.
  */
  const onAppointmentAdd = async (e) => {  
    const index = list.indexOf(e.fromData);
    if (index >= 0) {
      list.splice(index, 1);
      addCalendarEvent(e.itemData);
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
      /* 
      * Get all the service and delivery user accounts.
      */
      let response = await axios.get("/calendar/google-accounts/");
      if(response.data.success){
        /* 
        * Get Linked calendar for first account to show in timeline.
        */
        let calendar_id  = response.data.data[0].calendarID;
        getCalendarData(calendar_id);
        // const cresponse = await axios.get(`/calendar/${calendar_id}/`);
        // setcalendarData(cresponse.data.data);
        
        setGoogleAccounts(response.data.data);
      }
      /* 
      * Get Most Recent Orders.
      */
      let orders = await axios.get("/order/?perpage=10&page=1");
      if(orders.data.success){
        setListData(orders.data.data.order_list);
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  const addCalendarEvent = async (data) =>{
    let response;
    try{
       response = await axios.post("calendar/addEvent/", data);
    }catch(error){
      response = {
        data:{
          error:error.message
        }
      }
    }
    if(!response.data.success){
      toast.error('Problem adding event to calendar');
      return;
    }
    toast.success('Event created succesfully');
    getCalendarEvent(data.calendar_id)
  }
  

  /*
  * Fetch google calendar when we change the user.
  */
  const getCalendarData = async (calendar_id) => {
    // let calendar_id = e.target.value;
    // if(calendar_id ===''){
    //   return;
    // }
    try {
      const response = await axios.get(`/calendar/${calendar_id}/`);
      if(response.data.data !==''){
        setcalendarData(response.data.data);
        getCalendarEvent(calendar_id);
      }
    } catch {
      throw new Error('Data Loading Error');
    }
  }

  /* 
   * Get all the event created for particular calendar
  */
  const getCalendarEvent = async (calendar_id) => {
    if(calendar_id ===''){
      return;
    }

    try {
      const response = await axios.get(`/calendar/getEvent/${calendar_id}/`);
      if(response.data.success){
        console.log('in');
        setAppointmentData(response.data.data.eventList);
        setmapData(
          {
            markersData : response.data.data.markersData,
            routesData  :response.data.data.routesData
          })
      }else{
        setAppointmentData([]);
        setmapData(
          {
            markersData : [],
            routesData  :[]
          })
      }
    } catch {
      throw new Error('Data Loading Error');
    }
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
              <Form.Select aria-label="Default select example" onChange={(e) => getCalendarData(e.target.value)} >
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
              appointments={appointmentData}
              resourcesData={calendarData}
              addCalendarEvent={addCalendarEvent}
              getCalendarEvent={getCalendarEvent}
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
                markersData={mapData.markersData}
                routesData={mapData.routesData}
              />
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Routing
