 
import React,{useState,useEffect} from 'react'
import useAxios from "../../../../hooks/useAxios";
import moment from 'moment';
import {
  Chart,Label,Size, Tick, Series, CommonSeriesSettings, Tooltip ,Legend, ValueAxis,ArgumentAxis, Hatching
} from 'devextreme-react/chart'; 
import './ComparingBars.scss';
import themeService , {getColor} from '../../services/theme.service';


import Parameters from "../../components/parameters/Parameters"; 
import DateSwitcher from "../../components/date-switcher/DateSwitcher"; 
import { HoverStyle } from 'devextreme-react/range-selector';
 
 
function ComparingBars(props) { 
  const DAY_TYPE = 'day';
  const CATEGORY = 'product'; 
    
  let criteria = props.criteria;
  let category = props.category === 'product' ? 'revenuebyproduct' : 'revenuebysector';
  
  
  let type = props.type === DAY_TYPE ? true : false;
  let caption= (props.type === DAY_TYPE)? 'DAILY SALES PERFORMANCE' : 'UNIT SALES BY CATEGORY';
  let pastValueField = (props.type === DAY_TYPE)?'YesterdaySales':'LastMonthUnits';
  let pastName = (props.type === DAY_TYPE)?'Yesterday':'LastMonth';
  let presentValueField = (props.type === DAY_TYPE)?'TodaySales':'ThisMonthUnits';
  let presentName = (props.type === DAY_TYPE)?'Today':'ThisMonth';
  let maxAxisValue = 0;
  let maxLevels =[];
  for(let i = 1e3; i <= 1e7; i*=10) {
    for(let level of [ 4, 8, 12, 20 ]) {
        maxLevels.push(level*i);
    }
}
  const axios = useAxios();
  const [date, setDate] = useState({});
  const [format, setFormat] = useState('');
  const [parameters, SetParameters] = useState({});
  const [dataSource,SetDataSource] = useState({});

  let dataField = props.type === DAY_TYPE ? 'twoDays'+"="+moment(date).format('YYYY-MM-DD')
   : 'twoMonths'+"="+moment(date).startOf('month').format('YYYY-MM-DD');
  const customizeTooltip = (arg) => { 

    return {
      text: '<span style="font-size: 14px; color: #808080;">' + arg.argumentText.toUpperCase() + '</span><br />'
          + '<span>' + arg.valueText + '</span><br />'
          + '<span style="font-size: 14px; color: #808080;">' + arg.seriesName + '</span>'
  };
  };
  let array =['rgb(251, 119, 100)',
  'rgb(115, 212, 127)',
  'rgb(185, 214, 111)',
  'rgb(254, 216, 94)',
  'rgb(233, 167, 113)',
  'rgb(212, 118, 131)',
  'rgb(217, 173, 139)',
  'rgb(221, 227, 146)',
  'rgb(169, 175, 162)',
  'rgb(117, 122, 178)',
];
  const customizePoint = (pointInfo) => { 
 
 if(pointInfo.seriesName =='Yesterday' || pointInfo.seriesName=='LastMonth') {
            return {
              color: '#e0e0e0',
              hoverStyle: {
                  color: '#e0e0e0',
                  hatching: {
                      opacity: 0
                  }
              }
          };
      }
   
       //let color = getColor(props.category, pointInfo.argument);
       let index = Math.floor(Math.random() * array.length);
      //  let color = '#'+Math.random().toString(16).substr(2,6);
       let color = array[index]; array.splice(index,1);
      
        return {
            color: color,
            hoverStyle: {
                color: color,
                hatching: {
                    opacity: 0
                }
            }
        };
    }

    const getMaxAxisValue = (data)=> {
      let max = 0;

      for(let item of data) {
          let pastValue = item[pastValueField];
          let presentValue = item[presentValueField];
          let maxOfPair = pastValue < presentValue ? presentValue : pastValue;
          max = max > maxOfPair ? max : maxOfPair;
         
      }

      for(let maxLevel of maxLevels) {
          if(maxLevel > max) {
              return maxLevel;
          }
      }
      
      return max;
  }

    const sendDateToParent = (date,format) => { // the callback. Use a better name
      setDate(date);
      setFormat(format);
     
     };
    useEffect(async() => {   
     
      let parameters = await axios.get("/dashboard/"+category+"/?now="+moment(date).format('YYYY-MM-DD'));
        if(parameters.data.success){ 
          SetParameters(parameters.data.data); 
          
        }
    }, []);
    useEffect(async() => {  
      let product = await axios.get("/dashboard/"+category+"/?"+dataField);
        if(product.data.success){ 
          SetDataSource(product.data.data);
          maxAxisValue = getMaxAxisValue(product.data.data);
           
      }
      
    }, [date,format]);
    
  return ( 
    
    <>
     <div className="caption">{ caption }</div>    
     { (Object.keys(parameters).length > 0) ?
       <Parameters parameters={parameters} day={props.type === DAY_TYPE}/> 
       : ''
     }
      

      <DateSwitcher dateFormat={props.type} sendDateToParent={sendDateToParent}/>
      <div className="chart">   
        <Chart  
          dataSource={dataSource}
          customizePoint={customizePoint}
          
        >
          <Size height={215}></Size>
          <CommonSeriesSettings argumentField="Criteria" type="bar" hoverMode="onlyPoint" selectionMode="onlyPoint" minBarSize={5} />
          <Legend visible={false} ></Legend>
          <ArgumentAxis visible={false} axisDivisionFactor={40} max={maxAxisValue}>
              <Tick visible={false} />
              <Label customizeText="customizeArgumentLabel" wordWrap="none"/>
          </ArgumentAxis> 

          <Tooltip
              enabled={true}
              customizeTooltip={customizeTooltip}
            /> 

            <ValueAxis visible={false} >
              <Tick visible={false} />
            </ValueAxis>
            <Series
              argumentField="Criteria"
              valueField={pastValueField}
              name={pastName}
              color="rgba(175, 175, 175, 0.45)"
            >
             
              </Series>      
          <Series
              argumentField="Criteria"
              valueField={presentValueField}
              name={presentName}
              color="rgba(175, 175, 175, 0.45)" 
            />
           
        </Chart>
      </div>
    </>  
        
  );
}
export default ComparingBars