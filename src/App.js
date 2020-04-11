import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


import { AgGridReact } from 'ag-grid-react';
import RecordActions from './RecordActions';
import InfoMessage from './InfoMessage';
import { PageControls } from './PageControls';

import api from './api';
import './App.css';

const ROWS_PER_PAGE = 20;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: 'Name', field: 'personName', sortable: true, filter: true, checkboxSelection: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Message', field: 'message', sortable: true, filter: true, width: 800 }
      ],
      rowData: null,
      messageSelected: '',
      page: 1,
      recordsPerPage: ROWS_PER_PAGE,
      responseTime: 0
    }
  }



  componentDidMount() {
    this.setState(api.loadApiData(this.state.page, this.state.recordsPerPage, (obj)=>{
      this.setState(obj);
    }));
  }

  componentDidUpdate(prevProp, prevState) {
    if (this.state.page !== prevState.page || this.state.recordsPerPage !== prevState.recordsPerPage) {
      this.setState(api.loadApiData(this.state.page, this.state.recordsPerPage, (obj)=>{
        this.setState(obj);
      }));
    }
  }




  showSelected = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    let message = '';
    if (selectedData.length > 0) {
      message += 'selected rows with emails: ';
      message += selectedData.map(node => node.email).join(', ');
    }
    else {
      message = 'No selected rows';
    }

    this.setState({
      messageSelected: message
    })
  }

  changePage(step) {
    const newPage = this.state.page + step;
    if (newPage < 1) {
      return;
    }
    this.setState({
      page: newPage
    })
  }

  changeCountPerPage(e){
    this.setState({ recordsPerPage: e.target.value });
  }



  render() {
    return (
      <div style={{
        marginTop: 70,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div
          className="ag-theme-balham"
          style={{
            width: 1200,
            height: 600

          }}
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            rowSelection="multiple"
            onGridReady={(params) => {
              console.log('onGridReady: params.gridApi', params.api);
              this.gridApi = params.api
            }}
          />

          <PageControls 
            changePage={this.changePage.bind(this)} 
            page={this.state.page} 
            changeCountPerPage={this.changeCountPerPage.bind(this)}
            totalDbRecords={this.state.totalDbRecords}
            responseTime={this.state.responseTime}
            recordsPerPage={this.state.recordsPerPage} />

          <InfoMessage message={this.state.messageSelected} />

          <RecordActions showSelected={this.showSelected} />

        </div>
      </div>
    );
  }
}

export default App;
