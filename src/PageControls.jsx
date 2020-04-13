import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const PageControls = (props) => {
  const {
    page,
    recordsPerPage,
    changeCountPerPage,
    totalDbRecords,
    responseTime,
  } = props;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 14,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          padding: 14,
          width: 240,
        }}
      >
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.changePage(1)}
        >
          +
        </Button>
        <div
          style={{
            marginTop: 6,
            fontSize: 18,
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          page:
          {page}
        </div>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => props.changePage(-1)}
        >
          -
        </Button>
      </div>
      <div>
        <TextField
          label="count"
          value={recordsPerPage}
          variant="outlined"
          onChange={changeCountPerPage}
        />
      </div>
      <div style={{ fontSize: 14 }}>
        <div>
          Total records in DB:
          {totalDbRecords}
        </div>
        <div>
          Response time:
          {responseTime}
          ms
        </div>
      </div>
    </div>
  );
};

PageControls.propTypes = {
  page: PropTypes.number.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  changeCountPerPage: PropTypes.func.isRequired,
  totalDbRecords: PropTypes.number.isRequired,
  responseTime: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default PageControls;
