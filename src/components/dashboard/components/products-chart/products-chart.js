import React from 'react';
import PieChart, {
  Series,
  Legend,
  Tooltip,
  Size
} from 'devextreme-react/pie-chart';
import { 
  Font,
  Hatching,
  HoverStyle 
} from 'devextreme-react/chart';
import './products-chart.scss'

function ProductsChart(props){
    let dataSource = props.Source;  
    const customizeTooltip = (pointInfo) => {  
        return {
          text: '<span style="font-size: 14px; color: #808080;">' + pointInfo.argument + '</span><br />'
          + '<span style="font-size: 18px; color: #000;">$' + (pointInfo.originalValue).toFixed(2) + '</span>'
        };
      };


 return(
     <>
     <div  className='sector'>
      <div className="pie-content">REVENUES BY { props.Category.toUpperCase() }</div> 
       <PieChart
        dataSource={dataSource}
        type="doughnut"
        sizeGroup="products-chart"
        innerRadius={0.65}
      > 
       <Size height={310} />
        <Series
          argumentField="Criteria"
          valueField="Sales"
        > 
           <HoverStyle>
              <Hatching opacity={0} step={6} width={2}></Hatching>
           </HoverStyle>
        
        </Series>
         
         <Legend 
            verticalAlignment="bottom"
            horizontalAlignment="center" 
            itemTextPosition="right"
            rowItemSpacing={5}
            columnCount={2}
            rowCount={3}
            orientation="vertical"
            paddingLeftRight={0}
            paddingTopBottom={0}
          
         >
           <Font opacity={0.6}></Font>
           </Legend>
           
          <Tooltip
          enabled={true}
          color='#fff'
          
          customizeTooltip={customizeTooltip}
           > 
        </Tooltip>  
      </PieChart>
      </div>   
     </>
 )
}
export default ProductsChart