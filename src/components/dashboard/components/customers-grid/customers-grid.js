import React, { useState,useRef,useMemo} from "react";
import DataGrid, {
  Column,
  Pager,
  Paging,
  Selection,
  FilterRow,
  
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import useAxios from "../../../../hooks/useAxios";


function CustomerGrid(props) {
   console.log(props)
    const axios = useAxios();
    const Gridref = useRef(null);
     
    const isNotEmpty = (value)  => {
      return value !== undefined && value !== null && value !== '';
    }

    const store = useMemo(() => new CustomStore({
      key: 'id',
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
         const response = await axios.get('/dashboard/customergrid/?startDate=2022-01-02&endDate=2022-06-02');
         return ({
            data: response.data.data.values,
            totalCount: parseInt(response.data.data.total_count)
          });
        } catch {
          throw new Error('Data Loading Error');
        }
      },
    }),[props.range]);
    const selectionChanged = (e) => {
       let row = e.selectedRowsData[0];
        props.onSelectionChange(row);
    }
    return (
        <>  
            <React.Fragment>
                  
            <DataGrid 
            dataSource={store}
            className='data-grid'
            keyExpr={'id'}
            allowColumnReordering={true}
            allowColumnResizing={true}
            remoteOperations={true}
            showColumnLines={false}
            showBorders= {true}
            onSelectionChanged={selectionChanged}
            >
            
            <Selection mode="single" />
            <FilterRow visible={true} />
            <Column
                dataField='id'
                caption='User ID'
                allowSorting={true}
                cellRender={cellRender}
            />
            <Column
                dataField="name"
                allowSorting={true}
                
            />
            <Column
                dataField="address"
                allowSorting={true}
                
            />
            <Column
                dataField="city"
                allowSorting={true}
                 
            />
            <Column
                dataField="state"
                allowSorting={true}
                
            />

            <Column
                dataField="postalCode"
                allowFiltering={true}
                
            />
            <Column
                dataField="phone"
                allowSorting={true}
                allowFiltering={true}
                
            />
            <Column
                dataField="totalSales"
                allowSorting={true}
                allowFiltering={true}
               
            />
            <Column
                dataField="date_added"
                caption="Last Purchase Date"
                allowSorting={true}
                allowFiltering={true}
               
            />
            
            <Pager visible={true} allowedPageSizes={[5,10, 20, 50, 100]} showPageSizeSelector={true} />
            <Paging defaultPageSize={10} />
            </DataGrid>
           
            </React.Fragment>
           

           
            </>
  );

  function cellRender(data) {
    return <a href={"https://del.hiecor.biz/all_in_one/?custID="+data.value} target='blank' >{data.value}</a>
  }
}

export default CustomerGrid