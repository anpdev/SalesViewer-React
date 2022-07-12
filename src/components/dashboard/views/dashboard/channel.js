import React from 'react'
import Caption from '../../components/caption/caption';
import SalesByRange from "../../components/sales-by-range/sales-by-range"; 
import DailyChannels from '../../components/daily-channels/daily-channels';
function RevenueByChannels() {
    return (
        <>
         
    <Caption caption="REVENUE BY SALES CHANNELS"/> 
    <DailyChannels /> 

    <div className="gray-line">
        <SalesByRange category="CHANNEL" /> 
    </div>
    <div className="gray-line empty"></div>
 
        </>
    )
}

export default RevenueByChannels
