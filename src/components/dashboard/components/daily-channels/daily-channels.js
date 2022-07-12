import React,{ useState, useEffect } from 'react';
import useAxios from '../../../../hooks/useAxios';
import DateSwitcher from "../../components/date-switcher/DateSwitcher";  
import moment from 'moment';
import {
    Chart,
    Label,
    Size,
    Grid,
    Tick,
    MinorGrid,
    TickInterval,
    MinorTickInterval,
    Series,Point,
    CommonSeriesSettings,
    Tooltip,
    Legend, 
    ValueAxis,
    ArgumentAxis,
    Pane,
    Border
  } from 'devextreme-react/chart'; 
  import'./daily-channels.scss';
 function DailyChannels() {
    const axios = useAxios();
    let currentDate = new Date();
    const[channelsDataSource,setChannelsDataSource] = useState({});
    const[summaryData,setSummaryData] = useState({});
    const[summary,setSummary] = useState(0);
    const [date, setDate] = useState(currentDate);
  
    useEffect(async() => {  
       
     let channelData = await axios.get('/dashboard/revenuebychannel/?day='+moment(date).format('YYYY-MM-DD'));
     let dataSource; 
     if(channelData.data.success){   
        dataSource = channelData.data.data.map(function(item) { 
              return {    
                 SaleDate: moment(item['SaleDate'], moment.defaultFormat).toDate(),
                 ...item['SalesByChannel']
             };
         }); 
         setChannelsDataSource(dataSource);
         resetSummary();
         calcSummary();
        
       }
   },[date]);
   const summaryKeys=()=>{ 
    return Object.keys(summaryData);
   } 
   const resetSummary=()=>{ 
    for(let field in summaryData) {
        if(summaryData.hasOwnProperty(field)) {
            summaryData[field] = 0;
        }
    }
    setSummaryData({});
    setSummary(0);
   }
  const calcSummary = () => { 
if (Object.keys(channelsDataSource).length > 0) { 
    let summariData = [];
    let summari = 0;
   for(let item of channelsDataSource) {
       for(let field in item) {
           if(item.hasOwnProperty(field) && field !== 'SaleDate') {
               item[field] = Number(item[field]);
               summariData[field] = summariData[field] || 0;
               summariData[field] += item[field];
               summari += item[field];
               
           }
          
        }
       
     } 
    
     setSummaryData(summariData);
           setSummary(summari); 
   } 
}

const sendDateToParent = (date) => { // the callback. Use a better name
    setDate(date);
 };

    return (
        <>
        <div className="bars">
          <div className="left-bar">
           <div className="caption">DAILY SUMMARY</div>
            <div className="vars">
            {summaryKeys().map(( key) => ( 
                  
                <div className="row" key={key}>
                <div className="name">{ key }</div>
                    <div>{ summaryData[key]  }</div>
                </div> 
                  
                
                ))}   
               <div className="row total">
                    <div className="name">Total</div>
                    <div>{ summary}</div>
                </div>   
            </div> 
          </div>


    <div className="right-bar">
     <div className="caption">DAILY SALES PERFORMANCE </div>
     <DateSwitcher dateFormat="day" sendDateToParent={sendDateToParent}/>
        <Chart 
        dataSource={channelsDataSource}> 
        <Pane>
            <Border visible={true}></Border>
        </Pane>
        <Size height={250}/>
        <ArgumentAxis visible={false} valueMarginsEnabled={false} placeholderSize={25} argumantType="datetime">
            <Grid visible={true} /> 
            <Tick visible={false} />
            <TickInterval hours={1}></TickInterval>
            <MinorTickInterval minutes={30}></MinorTickInterval>
            <MinorGrid visible={true} opacity={1}></MinorGrid>
            <Label overlappingBehavior="none" format="shorttime" customizeText="customizeLabel"></Label>
        </ArgumentAxis>
        <ValueAxis visible={false} placeholderSize={40} valueType="numeric">
        <Tick visible={false} />
                <Grid visible={true}></Grid>
        </ValueAxis> 
        <CommonSeriesSettings type="line" argumentField="SaleDate"></CommonSeriesSettings>
        <Tooltip enabled={true} customizeTooltip="customizeTooltip" > </Tooltip>
        <Legend  visible={false}></Legend>
        {summaryKeys().map(( key) => (   
           
         <Series key={key}  valueField={key } name={ key }>
              <Point visible={false}></Point>
          </Series> 
            ))}  
        
        </Chart>
        </div>
        </div>
    </>
    )
}

export default DailyChannels
