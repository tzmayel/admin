import React from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { AgGridReact } from 'ag-grid-react';
import RecordActions from './RecordActions';
import InfoMessage from './InfoMessage';
import PageControls from './PageControls';

import api from './api';
import './App.css';

const ROWS_PER_PAGE = 20;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: 'Name',
          field: 'personName',
          sortable: true,
          filter: true,
          checkboxSelection: true,
        },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        {
          headerName: 'Message',
          field: 'message',
          sortable: true,
          filter: true,
          width: 800,
        },
      ],
      rowData: null,
      messageSelected: '',
      page: 1,
      recordsPerPage: ROWS_PER_PAGE,
      responseTime: 0,
    };

    this.changePageBinded = this.changePage.bind(this);
    this.changeCountPerPageBinded = this.changeCountPerPageBinded(this);
  }

  componentDidMount() {
    this.setGridContent(this.state);
  }

  componentDidUpdate(prevProp, prevState) {
    const { page, recordsPerPage } = this.state;
    if (
      page !== prevState.page ||
      recordsPerPage !== prevState.recordsPerPage
    ) {
      this.setGridContent(this.state);
    }
  }

  setGridContent({ page, recordsPerPage }) {
    api.loadApiData(page, recordsPerPage).then((data) => {
      this.setState({
        rowData: data.records,
        responseTime: data.responseTime,
        totalDbRecords: data.totalRecordsCount,
      });
    });
  }

  showSelected() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    let message = '';
    if (selectedData.length > 0) {
      message += 'selected rows with emails: ';
      message += selectedData.map((node) => node.email).join(', ');
    } else {
      message = 'No selected rows';
    }

    this.setState({
      messageSelected: message,
    });
  }

  changePage(step) {
    this.setState((oldState) => {
      return {
        page: oldState.page + step > 0 ? oldState.page + step : oldState.page,
      };
    });
  }

  changeCountPerPage(e) {
    this.setState({ recordsPerPage: e.target.value });
  }

  render() {
    const {
      columnDefs,
      rowData,
      totalDbRecords,
      responseTime,
      recordsPerPage,
      messageSelected,
      page,
    } = this.state;
    return (
      <div
        style={{
          marginTop: 70,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="ag-theme-balham"
          style={{
            width: 1200,
            height: 600,
          }}
        >
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            rowSelection="multiple"
            onGridReady={(params) => {
              // console.log('onGridReady: params.gridApi', params.api);
              this.gridApi = params.api;
            }}
          />

          <PageControls
            changePage={this.changePageBinded}
            page={page}
            changeCountPerPage={this.changeCountPerPageBinded}
            totalDbRecords={totalDbRecords}
            responseTime={responseTime}
            recordsPerPage={recordsPerPage}
          />

          <InfoMessage message={messageSelected} />

          <RecordActions showSelected={this.showSelected} />
        </div>
      </div>
    );
  }
}

export default App;
