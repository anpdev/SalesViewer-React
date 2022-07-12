import React,  { useRef , useState} from 'react';
import DataGrid, { Column, Paging, Pager, Selection } from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';

import RangeSlider from "../../components/rangeselector/rangeselector"; 
import Caption from '../../components/caption/caption';
import cellTemplate from './cellTemplate';

import useAxios from "../../../../hooks/useAxios";

import moment from 'moment';

function Sales () {
  const Gridref = useRef(null);
  const axios = useAxios(); 
   
  const[range,SetRange]=useState({});
  let strDate = (range.strDate!==undefined) ? range.strDate : moment().startOf('year').format('MM/DD/YYYY');
  let endDate = (range.endDate!==undefined) ? range.endDate : moment().format('MM/DD/YYYY'); 
  
  const isNotEmpty = (value)  => {
    return value !== undefined && value !== null && value !== '';
  }
  const sendRangeToParent = (range) => { // the callback. Use a better name
    SetRange(range);  
      
   };
   

  const dataSource = new CustomStore({
    key: 'product_id',
    async load(loadOptions) {
      let params = '?';
      [
        'skip',
        'take',
        'sort',
        'filter',
        'group'
      ].forEach((i) => {
        if (i in loadOptions && isNotEmpty(loadOptions[i])) { params += `${i}=${JSON.stringify(loadOptions[i])}&`; }
      });
      params = params.slice(0, -1);
      try {
        
        const response = await axios.get('/dashboard/salesgrid/?startDate='+strDate+'&endDate='+ endDate);
        
        return ({
           data: response.data.data.values,
           totalCount: parseInt(response.data.data.total_count)
         });
       } catch {
         
         throw new Error('Data Loading Error');
       } 
       
    }
  }); 

 
    return (
      <>
      <div className='table-responsive'>
        <div className='data-grid'>

         
      <Caption caption="SALES BY DATE RANGE" />
      <DataGrid ref ={Gridref}
        className='data-grid'
        dataSource={dataSource}
        keyExpr={'product_id'}
        showBorders={true}
        remoteOperations={true}
        showRowLines= {false}
        rowAlternationEnabled={true}
        >
      <Selection mode="none" />
         <Column
          dataField="Channel"
          dataType="string"
        />
         <Column
          dataField="Product"
          dataType="string"
        />
        
        <Column
        caption = "Sale Amount"
          dataField="Amount"
          dataType="string"
        />
         <Column
          dataField="Discount"
          dataType="number"
          alignment='left'
          allowGrouping={true} 
          width={150} 
          cellRender={cellTemplate}
        
        />
         <Column
        caption = "Last Sale Date"
          dataField="saleDate"
          dataType="string"
        />
        <Paging defaultPageSize={10} />
        <Pager visible={true}
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
        />
      </DataGrid>
       </div>
      </div> 
      <div className='gray-line'>
         
         <RangeSlider range={range} sendRangeToParent={sendRangeToParent} />  
         
      </div>
      </>  
    );
  
 
}

export default Sales


