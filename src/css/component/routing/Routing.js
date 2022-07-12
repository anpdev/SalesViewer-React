import React from 'react'
import Maps from './Maps';
import Timeline from './Timeline'
import UserData from './UserData'

function Routing() {
  const draggingGroupName = 'appointmentsGroup';
  return (
    <React.Fragment>
      <div className='container-fluid' style={{ padding: '20px 35px', background: '#ffffff'}}>
          <Timeline draggingGroupName={draggingGroupName} />
      </div>

      <div className="row container-fluid">
          <div className="col-md-7">
              <UserData draggingGroupName={draggingGroupName}/>
          </div>
          <div className='col-md-5'>
            <Maps />
          </div>
      </div>
    </React.Fragment>
  )
}

export default Routing
