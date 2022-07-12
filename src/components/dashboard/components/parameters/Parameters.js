import React from 'react';
import './Parameters.scss';
//import useAxios from "../../../../hooks/useAxios"
 function Parameters(props) { 
   
   let filteredParameters =(props.day)? [
         { name: 'Today', data: '$'+(props.parameters.TodaySales/1000).toFixed(0)+'K' },
         { name: 'Yesterday', data: '$'+(props.parameters.YesterdaySales/1000).toFixed(0)+'K' },
         { name: 'Last Week', data: '$'+(props.parameters.LastWeekSales/1000).toFixed(0)+'K' }
     ] 
     : 
     [
         { name: 'This Month', data: parseInt(props.parameters.ThisMonthUnits).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) },
         { name: 'Last Month', data: parseInt(props.parameters.LastMonthUnits).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) },
         { name: 'YTD', data: parseInt(props.parameters.YtdUnits).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) }
     ];
   
    return (
        <>
            <div className="line">
            { filteredParameters.map((item, index) => (
                <div className="parameters" key={index}>  
                <div className="parameter-name" > {item.name}</div>
                <div className="parameter currency"> {item.data} </div>
                </div>
                ))}
            </div>   
        </>
    )
}

export default Parameters
