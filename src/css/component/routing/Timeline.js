import React, { useEffect, useState } from 'react'
import Scheduler, { Resource,AppointmentDragging } from 'devextreme-react/scheduler';
import {resourcesData,appointments} from  './data.js';
import '../../css/component/timeline.scss';
function Timeline(props) {
    const[appointmentData,setAppointmentData] = useState(appointments);
    const currentDate = new Date();
    const views = ['Day', 'Week', 'Month'];
    const groups = ['userID'];


   
    const onAppointmentRemove = (e) => {
        appointmentData.push(e.itemData);
        setAppointmentData([...appointmentData]);
    }
     
    
    const onAppointmentAdd = (e) => {   
        appointmentData.push(e.itemData);
        setAppointmentData([...appointmentData]);
    }
    return (
    <React.Fragment>
      <Scheduler
              timeZone="America/Los_Angeles"
              dataSource={appointmentData}
              views={views}
              defaultCurrentView="timelineWeek"
              defaultCurrentDate={currentDate}
              height={400}
              groups={groups}
              cellDuration={60}
              firstDayOfWeek={0}
              startDayHour={9}
              endDayHour={24}>
              <AppointmentDragging
                  group={props.draggingGroupName}
                  onRemove={onAppointmentRemove}
                  onAdd={onAppointmentAdd}
              />
              <Resource
                  fieldExpr="userID"
                  allowMultiple={true}
                  dataSource={resourcesData}
                  label="Owner"
                  useColorAsDefault={ true }
                
              />
          </Scheduler>
    </React.Fragment>
  )
}

export default Timeline
