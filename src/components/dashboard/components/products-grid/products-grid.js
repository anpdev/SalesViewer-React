import React, { useMemo } from "react";
import DataGrid, {
  Column,
  Pager,
  Paging,
  Selection,
  LoadPanel,
} from 'devextreme-react/data-grid';
import CustomStore from 'devextreme/data/custom_store';
import useAxios from "../../../../hooks/useAxios";
import 'devextreme/dist/css/dx.light.css';



function ProductGrid(props) {
  
    const axios = useAxios();
    
  
    const isNotEmpty = (value)  => {
      return value !== undefined && value !== null && value !== '';
    }
    const store = useMemo(() =>new CustomStore({
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
         let response = await axios.get('/dashboard/productgrid/?startDate=2022-01-02&endDate=2022-06-02');
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
           
           <div className="table-responsive">
            <div className="data-grid" id="productgrid">
            <div className='dx-theme-border-color'>
            
            <DataGrid 
            
              dataSource={store}
              showColumnLines={false}  
              showRowLines={false} 
              remoteOperations={true}  
              allowColumnReordering={true}
              allowColumnResizing={true}
              showBorders={true}
              onSelectionChanged={selectionChanged}
            // selectedRowKeys={selectedRows}
            >
            <LoadPanel enabled={true} />
            <Paging defaultPageSize={5} />
            <Pager visible={true} allowedPageSizes={[10, 20, 50, 100]} showPageSizeSelector={true} />
            
            <Selection mode="single"/>
            <Column
                dataField={'NAME'}
                width={'15%'}
                allowSorting={true}
                allowFiltering={true}
                
                
            />
            <Column
                dataField={'description'}
                width={'30%'}
                allowSorting={true}
                 
            />
            <Column
                dataField={'baseCost'}
                width={'10%'}
                alignment="right"
                allowSorting={true}
               
            />
            <Column
                dataField={'listPrice'}
                width={'10%'}
                alignment="right"
                allowSorting={true}
                
            />

            <Column
                dataField={'unitsInInventory'}
                width={'15%'}
                alignment="right"
                allowFiltering={true}
                 
            />
            <Column
                dataField={'unitsInManufacturing'}
                width={'20%'}
                alignment="right"
                allowSorting={true}
                allowFiltering={true}
                 
            />
            <Column
                dataField={'last_sale_date'}
                dataType='date'
                width={'20%'}
                alignment="right"
                allowSorting={true}
                allowFiltering={true}
                 
            />
            
           
            </DataGrid>
           
            </div>
            </div>
            </div>
            </>
  );
}

export default ProductGrid