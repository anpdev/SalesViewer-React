import React, { useState ,useEffect } from 'react'
import Moment from 'react-moment';
import moment from 'moment';

import './DateSwitcher.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
//const DateSwitcher = ({sendDataToParent }) => { 
 function DateSwitcher(props) { 
  const DAY_TYPE = 'day';

  let currentDate = new Date();
  let endDate = new Date(currentDate.getFullYear() - 2, 0, 1); 
  
  let format = (props.dateFormat == 'day') ? "MMMM D YYYY" : "MMMM";  
  let[date,setDate] = useState(currentDate);
  
  const updateDate=(param,format)=>{  
    date = (format=='day') ? date = moment(date).add(param, 'd')
    : date = moment(date).startOf('month').add(param, 'M');
  
    if(date >= currentDate){ return false; }
     setDate(date); 
     props.sendDateToParent(date,format);
     
  }

  return (
        <>
        <div className='switcher'>
         <div className={ (date <= endDate) ? 'fa-angle-left disabled' : 'fa-angle-left' } >
            <FontAwesomeIcon icon={faCaretLeft} onClick={() => updateDate(-1,props.dateFormat)}></FontAwesomeIcon>          
          </div> 
          <Moment format={format}>{date}</Moment>
          <div  className={(date >= currentDate) ? 'fa-angle-right disabled' : 'fa-angle-right' }>
          <FontAwesomeIcon icon={faCaretRight} onClick={() => updateDate(1,props.dateFormat)}></FontAwesomeIcon>
          </div> 
          </div>
        </>
    )
}
export default DateSwitcher