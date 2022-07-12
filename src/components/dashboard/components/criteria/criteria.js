import React from 'react'
import Caption from '../caption/caption';
import ComparingBars from "../../components/comparing-bars/ComparingBars"; 
import SalesByRange from "../../components/sales-by-range/sales-by-range"; 

function Criteria(props) {
   let criteria = props.criteria;

 return (
    <>
    <Caption caption={ "REVENUE BY " + criteria}/>
      <div className='c-bars'>    
        <div className='left-bar'>
          <ComparingBars type='day' category={criteria}/>
        </div>
        <div className='right-bar'>
          <ComparingBars type='month' category={criteria}/>
        </div>
      </div>
      <div className='gray-line'>
        <SalesByRange category={criteria}/>
      </div> 
   </>   
 );

}

export default Criteria