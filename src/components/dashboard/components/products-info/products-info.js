import React from 'react';
import './products-info.scss';

function ProductInfo (props) {
 
    return (
      <>
      <div className="info">   
      { (Object.keys(props.productInfo).length > 0) ?
       <>
            {props.productInfo.department!='' ? <div><h5>Department</h5><div className='plant-description'>{props.productInfo.department}</div></div>:''}
            {props.productInfo.department!='' ? <div><h5>Supplier</h5><div className='plant-description'>{props.productInfo.supplier}</div></div> :''} 
            {props.productInfo.department!='' ? <div><h5>Supplier Code</h5><div className='plant-description'>{props.productInfo.supplier_code}</div></div> :''}  
            {props.productInfo.department!='' ? <div><h5>Brand</h5><div className='plant-description'>{props.productInfo.brand}</div></div> :''}  
            {props.productInfo.department!='' ? <div><h5>Location</h5><div className='plant-description'>{props.productInfo.location}</div></div> :''} 
            {props.productInfo.department!='' ? <div><h5>Restock Level</h5><div className='plant-description'>{props.productInfo.restock_level}</div></div> :''} 
            {props.productInfo.department!='' ? <div><h5>Stock</h5><div className='plant-description'>{props.productInfo.unitsInInventory}</div></div> :''}  
            </>
            : ''
            
          }    
          </div>
      </>  
    );
}
export default ProductInfo
