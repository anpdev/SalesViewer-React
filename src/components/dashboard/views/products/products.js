import React, { useState,useEffect } from "react";

import ProductGrid from "../../components/products-grid/products-grid";
import ProductsChart from "../../components/products-chart/products-chart";
import ProductInfo from "../../components/products-info/products-info";
import RangeSlider from "../../components/rangeselector/rangeselector";
import Caption from "../../components/caption/caption";

import useAxios from "../../../../hooks/useAxios";
import moment from 'moment';
import './products.scss';

function Products() { 
  const axios = useAxios();
  const[range, setRange]=useState(1);
  const[product, setProduct]=useState(1);
  const[productInfo, setProductInfo]=useState(1);

  const[sectorDataSource, setSectorsDataSource]=useState({});
  const[regionDataSource, setRegionsDataSource]=useState({});
  const[channelDataSource, setChannelsataSource]=useState({});
  const handleOnSelection = (row) => {  
    setProductInfo(row);
    setProduct(row.product_id);
  }

  const sendRangeToParent = (range)=>{
    setRange(range);  
   } 
   
  useEffect(async() => {  
    let strDate = (range.strDate!==undefined) ? range.strDate : moment().startOf('year').format('MM-DD-YYYY');
    let endDate = (range.endDate!==undefined) ? range.endDate : moment().format('MM-DD-YYYY'); 
     
    let sectors = await axios.get('/dashboard/sectors/?productId='+product+'&startDate='+strDate+'&endDate='+endDate);
      if(sectors.data.success){   
        setSectorsDataSource(sectors.data.data);
      
      }
      let regions = await axios.get('/dashboard/regions/?productId='+product+'&startDate='+strDate+'&endDate='+endDate);
      if(regions.data.success){   
        setRegionsDataSource(regions.data.data);
        
      } 
      
      let channels = await axios.get('/dashboard/channels/?productId='+product+'&startDate='+strDate+'&endDate='+endDate);
      if(channels.data.success){   
        setChannelsataSource(channels.data.data);
        
      }
  }, [product,range]);
  
  return ( 
     <>
      <Caption caption='Products'/>
      <ProductGrid range={range} onSelectionChange={handleOnSelection}/>
        <div className="gray-line">
          <div className="product-info">
            <ProductInfo productInfo={productInfo}/>
            <div className="pie-charts">
              <div className="products-pie-container">
                  <ProductsChart Category='sector' Source={sectorDataSource}/>
                  <ProductsChart Category='region' Source={regionDataSource}/>
                  <ProductsChart Category='channel' Source={channelDataSource}/>
              </div>    
          </div>    
      </div>
          <RangeSlider sendRangeToParent={sendRangeToParent}/>  
      </div>     
    
    </>
  );
}

export default Products;
