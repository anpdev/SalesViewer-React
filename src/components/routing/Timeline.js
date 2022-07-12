import React from 'react'
import Scheduler, { Resource,AppointmentDragging } from 'devextreme-react/scheduler';
import '../../css/component/timeline.scss';
import useAxios from "../../hooks/useAxios"
import useToast  from '../../hooks/useToast';
function Timeline(props) {
    const currentDate = new Date();
    const views = ['timelineDay', 'timelineWeek', 'timelineMonth'];
    const groups = ['calendar_id'];
    const axios  = useAxios();
    const toast = useToast();

    const updateCalendarEvent =  async (e) => {
      let response;
      try{
         response = await axios.post("calendar/updateEvent/", e.appointmentData);
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
      props.getCalendarEvent(e.appointmentData.calendar_id);
      toast.success('Event updated succesfully');
    }

    const deleteCalendarEvent =  async (e) => {
      let response;
      try{
         response = await axios.post("calendar/deleteEvent/", e.appointmentData);
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
      props.getCalendarEvent(e.appointmentData.calendar_id);
      toast.success('Event deleted succesfully');
    }
    const handlePropertyChange = (e) => {
      console.log("test",e);
      if(e.name === "currentView") {
        console.log("a",e);
        
          // handle the property change here
      }else if(e.name === "currentDate") {
        console.log("a",e.value);
      }
    }
    return (
    <React.Fragment>
      <Scheduler
              timeZone="America/Los_Angeles"
              dataSource={props.appointments}
               views={views}
              defaultCurrentView="timelineMonth"
              defaultCurrentDate={currentDate}
              onOptionChanged={handlePropertyChange}
              height={300}
              groups={groups}
              cellDuration={60}
              firstDayOfWeek={0}
              startDayHour={9}
              endDayHour={24}
              editing={true}
              onAppointmentDeleted={deleteCalendarEvent}
              onAppointmentUpdated={updateCalendarEvent}
              onAppointmentAdded={(e) =>props.addCalendarEvent(e.appointmentData)}
              >
                
                <AppointmentDragging
                    group={props.draggingGroupName}
                    onAdd={props.onAppointmentAdd}
                />
                <Resource
                    fieldExpr="calendar_id"
                    allowMultiple={false}
                    dataSource={props.resourcesData}
                    label="Owner"
                    useColorAsDefault={ true }
                />
          </Scheduler>
    </React.Fragment>
  )
}

export default Timeline
