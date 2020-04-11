import React from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import Button from '@material-ui/core/Button';

import './App.css';
import { TextField } from '@material-ui/core';

const ROWS_PER_PAGE = 10;

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

  loadApiData() {
    const sendDate = (new Date()).getTime();
    let responseTimeMs = 0;
    fetch(`http://localhost:3001/api/subscribers/${this.state.page}/${this.state.recordsPerPage}`)
      .then(res => {
        const receiveDate = (new Date()).getTime();
        responseTimeMs = receiveDate - sendDate;

        if (res.status === 404) {
          this.setState({
            rowData: null,
            responseTime: responseTimeMs
          })
        }
        else {
          return res.json();
        }
      })
      .then(res => {
        this.setState({
          rowData: res.records,
          totalDbRecords: res.debugInfo.totalRecordsCount,
          responseTime: responseTimeMs
        })
      })
      .catch(e => {
        console.log('e=', e);
      });
  }

  componentDidMount() {
    this.loadApiData();
  }

  componentDidUpdate(prevProp, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.page !== prevState.page || this.state.recordsPerPage !== prevState.recordsPerPage) {
      this.loadApiData();
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

  handleCountChange(event) {
    console.log('this', this);
    this.setState({ recordsPerPage: event.target.value });
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
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 14
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 14,
              width: 240

            }}>
              <Button variant="outlined" color="primary" onClick={() => this.changePage(1)} >+</Button>
              <div style={{
                marginTop: 6,
                fontSize: 18,
                marginLeft: 10,
                marginRight: 10
              }}>page: {this.state.page}</div>
              <Button variant="outlined" color="primary" onClick={() => this.changePage(-1)} >-</Button>
            </div>
            <div>
              <TextField
                label="count"
                value={this.state.recordsPerPage}
                variant="outlined"
                onChange={(e) => this.setState({ recordsPerPage: e.target.value })}
              />
            </div>
            <div style={{fontSize: 14}}>
              <div>Total records in DB: {this.state.totalDbRecords}</div>
              <div>Response time: {this.state.responseTime} ms</div>
            </div>
          </div>
          <div style={{
            background: '#eee',
            marginTop: 16,
            marginBottom: 16,
            padding: 10,
            borderRadius: 10,
            height: 30
          }}>
            <span>{this.state.messageSelected}</span>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
            <Button variant="contained" color="primary" onClick={this.showSelected}>
              Send Email
            </Button>

            <Button variant="contained" color="secondary" onClick={this.showSelected}>
              Delete Selected
            </Button>
          </div>


        </div>
      </div>
    );
  }
}

export default App;
