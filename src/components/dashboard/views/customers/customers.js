import React,{useState,useEffect} from 'react'
import VectorMap, {
  Layer,
  Source,
  ControlBar,
  Size,
} from 'devextreme-react/vector-map';
import {
  Chart,
  CommonSeriesSettings,
  ArgumentAxis, 
  ValueAxis,
  Series,
  Tooltip,
  Format,
  Legend, 
  Tick,
  Title,
  Label,Hatching,  SeriesTemplate,
} from 'devextreme-react/chart'; 
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';
import Caption from '../../components/caption/caption';
import CustomerGrid from '../../components/customers-grid/customers-grid';
import RangeSlider from '../../components/rangeselector/rangeselector';
import useAxios from "../../../../hooks/useAxios";
import moment from 'moment';
import './customers.scss'
import { Font, Margin } from 'devextreme-react/range-selector';
 function Customers() {
  const axios = useAxios();
  const[range, setRange]=useState(1);
  const[customer, setCustomer]=useState(1);
  const[citiesDataSource, setCitiesDataSource]=useState({})
  const[barDataSource,setBarDataSource] = useState({});

  const sendRangeToParent= (range)=>{
    setRange(range);  
  } 

  const handleOnSelection = (row) => {  
    setCustomer(row.id);  
  } 
  const customizeTooltipBar =(pointInfo) => {
    return { text: '<span style="font-size: 14px; color: #808080">' + pointInfo.argument + '</span><br />'
    + '<span style="font-size: 18px;>$' + pointInfo.value + '</span>' };
  }
  
   useEffect(async() => {  
    let strDate = (range.strDate!==undefined) ? range.strDate : moment().startOf('year').format('MM-DD-YYYY');
    let endDate = (range.endDate!==undefined) ? range.endDate : moment().format('MM-DD-YYYY'); 
     
    let cities = await axios.get('/dashboard/cities/?customerId='+customer+'&startDate='+strDate+'&endDate='+endDate);
      if(cities.data.success) {   
       let data = cities.data.data.map(item => {
           return {
            coordinates: [item.Coordinates[1],item.Coordinates[0]] ,
            attributes: item.City,
          }
        }); 
        setCitiesDataSource(data);
      }

      let detail = await axios.get('/dashboard/customerdetail/?customerId='+customer+'&startDate='+strDate+'&endDate='+endDate);
      if(detail.data.success){   
        setBarDataSource(detail.data.data);
      }  
      
  },[customer,range]);
  const bounds = [-40, 35];
    return (
        <>
          <Caption caption="Customers" />
          <CustomerGrid range={range} onSelectionChange={handleOnSelection}/>
          <div className="gray-line">
           <div className='charts'>
             <div className='map left-bar'>
             <VectorMap
                zoomFactor={3.5}
                center={bounds}
                >
                  <Size height={310} /> 
                  <ControlBar enabled={false}/>
                <Layer
                  dataSource={mapsData.world}
                  color="rgba(150, 150, 150, 0.6)"
                  borderColor="transparent" 
                  hoveredBorderColor="transparent"
                  >
                </Layer>
                <Layer
                  dataSource={citiesDataSource} 
                  elementType="bubble"
                  hoveredColor="transparent"
                  hoveredBorderColor="#000"
                  borderWidth={7}
                  hoveredBorderWidth={7}
                  minSize={10}
                  maxSize={35}
                  color='red'
                  >
                  <Label enabled={false}></Label>
                </Layer>
                <Tooltip enabled={true}
                   
                ></Tooltip>
                <Legend
                  markerShape="circle" 
                  >
                  <Source layer="bubbles" grouping="size"></Source>
                </Legend>
               
              </VectorMap>
             </div>
    <div className='bar right-bar'>
               
        <Chart 
       
        rotated ={true}
        dataSource={barDataSource}>
            <Title  horizontalAlignment="left" text="PURCHASES BY PRODUCT">
             <Font size={14} weight={400}/>
             <Margin left={16} />  
            </Title>  
            <Size height={310} /> 
            <ArgumentAxis visible={false} placeholderSize={17}> 
                <Tick visible={false} />
                <Label visible={false}></Label> 
            </ArgumentAxis>

            <ValueAxis visible={false}
              placeholderSize={30}
              
              > 
              <Tick visible={false} />
              <Label format="currency millions" indentFromAxis={5}>
                
              </Label>
           </ValueAxis>
           <CommonSeriesSettings argumentField="Criteria" valueField="Sales" type="bar">
          
                <hoverStyle>
                  <Hatching opacity={0} step={6} width={3}></Hatching>
                </hoverStyle>
              </CommonSeriesSettings>
              <SeriesTemplate nameField="Criteria" />
            
              <Tooltip  
                enabled={true}
                customizeTooltip={customizeTooltipBar}
              />  
              <Legend visible={false} />
              
              </Chart>
             </div>
           </div>


        <RangeSlider sendRangeToParent={sendRangeToParent}/>  
    </div>   
        </>
    )
}

export default Customers
