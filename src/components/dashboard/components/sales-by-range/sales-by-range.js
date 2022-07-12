import React,{ useState, useEffect } from 'react';
import RangeSlider from "../rangeselector/rangeselector";  
import useAxios from "../../../../hooks/useAxios"
import {
  Chart,CommonSeriesSettings, Tick, ArgumentAxis, ValueAxis , SeriesTemplate
} from 'devextreme-react/chart'; 
import PieChart, {
  Series,
  Legend,
  Label,
  Font, 
  Format, 
  Connector,
  Tooltip,
  Size
} from 'devextreme-react/pie-chart';
import moment from 'moment';
import './sales-by-range.scss'; 

function SalesByRange(props){
  
  let salesbyrange = props.category === 'product' ? 'productsalesbyrange' : 'categorysalesbyrange';
  let category = props.category.toUpperCase();
  const axios = useAxios();
  const[range,setRange] = useState({});
  const customizeTooltipBar =(arg) => {
   return {
      text: `${arg.argumentText} <br> $${arg.valueText} `,
    };
   }
    

 const customizeLable =(arg) => {
  return arg.percentText;
 } 

 const sendRangeToParent= (range)=>{
  setRange(range);
 } 

 const[pieDataSource,setPieDataSource] = useState({});
 const[barDataSource,setBarDataSource] = useState({});
 useEffect(async() => {  
  let strDate = (range.strDate!==undefined) ? range.strDate : moment().startOf('year').format('MM/DD/YYYY');
  let endDate = (range.endDate!==undefined) ? range.endDate : moment().format('MM/DD/YYYY'); 
   
  let rangeData = await axios.get('/dashboard/'+salesbyrange+'/?startDate='+strDate+'&endDate='+endDate);
    if(rangeData.data.success){   
      setPieDataSource(rangeData.data.data);
      setBarDataSource(rangeData.data.data);
      
    }
}, [range]);

 return(
     <>
     <div className="sales-by-range">
            <div className="doughnut-container"> 
            <div className="title">{category} SALES BY RANGE</div>

            <PieChart
                dataSource={pieDataSource}
                type="doughnut"
                innerRadius={0.65}
                minDiameter={0.7}
            > 
            <Size width={310} height={310} />
                <Series
                argumentField="Criteria"
                valueField="Sales"
                
                >
                  <Label visible={true}
                  backgroundColor="transparent" 
                  radialOffset={-15}
                  customizeText={customizeLable}>
                    <Font size={12} color="#909090"></Font>
                    <Connector visible={false} width={0}></Connector>
                  </Label> 
                </Series>
                
                
                <Legend visible={false}></Legend> 
            </PieChart>
            </div>
      
        <div className="bar-container">
        <div className="year">2022</div>
        <div className="title">{category} SALES BY RANGE</div>
        <Chart className="chart" 
         rotated ={true}
        
         //customizePoint = {customizePoint}
         dataSource={barDataSource}>
        
        <ArgumentAxis placeholderSize={40} visible={false}> 
          <Tick visible={false} />
          <Label visible={false} ></Label> 
        </ArgumentAxis>
           
        <ValueAxis visible={false}
         valueMarginsEnabled={false}
         axisDivisionFactor={80}
         placeholderSize={30}
         > 
           <Tick visible={false} />
           <Label indentFromAxis={5}>
           
              <Font opacity={0.6}/>
            
             <Format size={12} type="currency"></Format>
           </Label>
        </ValueAxis>
        <CommonSeriesSettings argumentField="Criteria" valueField="Sales" ignoreEmptyPoints="true"  type="bar" />
        <SeriesTemplate nameField="Criteria" />
       
       
        <Tooltip
          enabled={true}
          customizeTooltip={customizeTooltipBar}
        />  
         
        <Legend visible={false}></Legend>
        </Chart>
        </div>   
        </div>
     <RangeSlider range={range} sendRangeToParent={sendRangeToParent}/>  
     
     <div className="gray-line empty"></div>
    </>
 )
}
export default SalesByRange