import React, { useState ,useEffect } from 'react'
import ComparingBars from "../../components/comparing-bars/ComparingBars"; 
import SalesByRange from "../../components/sales-by-range/sales-by-range"; 
import Criteria from "../../components/criteria/criteria"; 
import useAxios from "../../../../hooks/useAxios";
import moment from 'moment';


function RevenueByProduct() {
   
const axios = useAxios();
const [date, setDate] = useState({}); // the lifted state
const [format, setFormat] = useState('');
 
const [leftBar, setLeftBar] = useState({});
const [rightBar, setRightBar] = useState({});
const [leftParameters, SetLeftParameters] = useState({});
const [rightParameters, SetRightParameters] = useState({});
const sendDateToPParent = (date,format) => { // the callback. Use a better name
 setDate(date);
 setFormat(format);

};
useEffect(async() => {  
  let parameter = await axios.get("/dashboard/revenuebyproduct/?now="+moment(date).format('YYYY-MM-DD'));
    if(parameter.data.success){ 
      SetLeftParameters({ TodaySales: parameter.data.data.TodaySales,
                    YesterdaySales: parameter.data.data.YesterdaySales,
                    LastWeekSales: parameter.data.data.LastWeekSales
                  });
      SetRightParameters({ TodaySales: parameter.data.data.ThisMonthUnits,
                  YesterdaySales: parameter.data.data.LastMonthUnits,
                  LastWeekSales: parameter.data.data.YtdUnits
      });            
    }
}, []);

useEffect(async() => {  
  if(format==='day') {
  let product = await axios.get("/dashboard/revenuebyproduct/?twoDays="+moment(date).format('YYYY-MM-DD'));
    if(product.data.success){ 
      setLeftBar(product.data.data);
    }
  }
  if(format=='month') {
  let category = await axios.get("/dashboard/revenuebyproduct/?twoMonths="+moment(date).format('YYYY-MM-DD'));
    if(category.data.success) { 
      setRightBar(category.data.data);  
    }
}
}, [date,format]);
useEffect(async() => {  
  
  let product = await axios.get("/dashboard/revenuebyproduct/?twoDays="+moment(date).format('YYYY-MM-DD'));
    if(product.data.success){ 
      setLeftBar(product.data.data);
    }
  
  let category = await axios.get("/dashboard/revenuebyproduct/?twoMonths="+moment(date).format('YYYY-MM-DD'));
    if(category.data.success) { 
      setRightBar(category.data.data);  
    
}
}, []);



 return (
    <>
    
    <Criteria criteria='PRODUCT'/>  
      <div className='bars'>    
        <div className='left-bar'>
           <ComparingBars dateFormat='day' criteria="PERFORMANCE" sendDateToPParent={sendDateToPParent} Source={leftBar} parameter={leftParameters} />
        </div>
      <div className='right-bar'>
           <ComparingBars dateFormat='month' criteria="CATEGORY" sendDateToPParent={sendDateToPParent} Source={rightBar} parameter={rightParameters} />
         </div>
        </div>
      <div className='gray-line'>
        <SalesByRange  />
      </div>  
   </>   
 );
}

export default RevenueByProduct