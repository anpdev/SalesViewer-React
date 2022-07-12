import React, {useState,useEffect} from 'react';
import useAxios from "../../../../hooks/useAxios"
import RangeSelector, {
Chart,
Label,
Font,
Tick,
Shutter,
Series,
Scale, 
Size,
Indent,
TickInterval,
MinorTick,
SliderMarker,
Marker,
SliderHandle,
} from 'devextreme-react/range-selector';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft,faAngleRight} from "@fortawesome/free-solid-svg-icons";

import moment from 'moment';
import './rangeselector.scss'
import { LoadingIndicator, Point } from 'devextreme-react/chart';

function RangeSlider(props) {  
    
  const axios = useAxios(); 
   
    let currentYear = new Date().getFullYear();
    let str = moment(new Date(currentYear, 0, 1)).format('YYYY-MM-DD');
    let end = moment().format('YYYY-MM-DD'); 

    const[thisYear, setThisYear] = useState(currentYear); 
    const[strDate, setStrDate] = useState(str);
    const[endDate, setEndDate] = useState(end);
    
    const defaultValue = [strDate, endDate];
    
    const[rangeDataSource,setRangeDataSource] = useState({});

    const onRangeChanged = (e) => {
      let strDate = moment(e.value[0]).format('YYYY-MM-DD');
      let endDate = moment(e.value[1]).format('YYYY-MM-DD');
      props.sendRangeToParent({strDate:strDate,endDate,endDate});
      
  }
   const changeYear = (offset) => {  
      setThisYear(thisYear+offset);
      setStrDate(moment(new Date(thisYear, 0, 1)).format('YYYY-MM-DD'));
      setEndDate(moment(new Date(thisYear, 11, 31)).format('YYYY-MM-DD'));
      
     
   }
  useEffect(async() => {  
    let rangeData = await axios.get('/dashboard/rangeselector/?startDate='+strDate+'&endDate='+endDate);
      if(rangeData.data.success){   
        
        setRangeDataSource(rangeData.data.data);
       
      }
  }, [strDate,endDate]);


    return (
      <>
    <div className='range-selector'>  
     <div className='container'> 
     <div className='icon icon-left' onClick={() => changeYear(-1)}>
        <FontAwesomeIcon   icon={faAngleLeft} className='icon'></FontAwesomeIcon>
     </div>
     <RangeSelector
        selectedRangeColor="rgba(0,0,0,0)"
        dataSource={rangeDataSource}
        //defaultValue={defaultValue}
        onValueChanged={onRangeChanged}
      > 
        <LoadingIndicator backgroundColor="rgba(0,0,0,0)"/>
        <Indent right={34} left={34} /> 
        <Size height="90"/>
        <SliderMarker format="monthAndDay" />
        <SliderHandle opacity={0.1} />  
          
        <Chart>
          <Series type="line" opacity={0.8} argumentField="SaleDate" valueField="Sales" />
          <Point visible={false} />
        </Chart>
   
        <Scale valueType="datetime">
        <Marker visible={false}/>
            <TickInterval months={1} />
            <MinorTick visible={false} />
            <Tick opacity='0.1'/>
            <Label>
              <Font opacity={0.6}/>
            </Label>
        </Scale>

        <Shutter color='rgb(244, 244, 244)' opacity='0.75'/>
        
      </RangeSelector>
          <div onClick={() => changeYear(1)} className={"icon icon-right " + (thisYear=>currentYear?'disabled':'')} >
            <FontAwesomeIcon  icon={faAngleRight} className='icon'></FontAwesomeIcon>
          </div>
        </div>
      </div>  
      </>  
    );
  }
  export default RangeSlider;