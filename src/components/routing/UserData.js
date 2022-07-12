import React from 'react'
import { Table } from 'react-bootstrap';
import Draggable from 'devextreme-react/draggable';
import ScrollView from 'devextreme-react/scroll-view';

function UserData(props) {
    const currentDate = new Date();
    const date = `${currentDate.getMonth()+1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
  
    return (
    <>
        <h4>Non-Scheduled Service Calls</h4>
        <ScrollView id="scroll">
              <Table className='themeTable'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Order</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Order Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.tasks.map((task,index) =>  
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <Draggable
                            key={task.order_id}
                            clone={true}
                            group={props.draggingGroupName}
                            data={task}
                            onDragStart={props.onItemDragStart}
                            onDragEnd={props.onItemDragEnd}
                          >
                            {task.order_id}
                          </Draggable>
                        </td>
                        <td>{task.text}</td>
                        <td>{task.description}</td>
                        <td>{date}</td>
                      </tr>
                    )}
                  </tbody>
              </Table>
            </ScrollView>
    </>
  )
}

export default UserData
