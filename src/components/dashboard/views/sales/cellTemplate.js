import React from 'react';
import {Bullet, Margin, Shadow, Size, Tooltip, Font } from 'devextreme-react/bullet';


function cellTemplate(cell) {
     
   
const customizeTooltip = (pointInfo) => {
return { text: '$' + pointInfo.originalValue};
}    
return( 
        <>       
<div className="bullet-container">
        <Bullet value={cell.value} 
         target={0}  
         startScaleValue={0}  
         endScaleValue={100} 
         showTarget={false}
        showZeroLevel={true}
        >
                <Size width={150} height={35}></Size>
                <Margin top={5} bottom={0} left={5}></Margin>
                <Tooltip enabled={true} paddingTopBottom={2} zIndex={5} customizeTooltip={customizeTooltip}>
                   <Font opacity={1} size={18}></Font>  
                   <Shadow opacity={0.15} blur={0} color='#000' offsetX={3} offsetY={3}></Shadow>   
                </Tooltip>
        </Bullet>
        </div>
       </> 
        ) 
       
}

export default cellTemplate