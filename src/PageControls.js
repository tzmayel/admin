import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

export const PageControls = (props) => {

    return (
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
                <Button variant="outlined" color="primary" onClick={()=>props.changePage(1)} >+</Button>
                <div style={{
                    marginTop: 6,
                    fontSize: 18,
                    marginLeft: 10,
                    marginRight: 10
                }}>page: {props.page}</div>
                <Button variant="outlined" color="primary" onClick={()=>props.changePage(-1)} >-</Button>
            </div>
            <div>
                <TextField
                    label="count"
                    value={props.recordsPerPage}
                    variant="outlined"
                    onChange={props.changeCountPerPage}
                />
            </div>
            <div style={{ fontSize: 14 }}>
                <div>Total records in DB: {props.totalDbRecords}</div>
                <div>Response time: {props.responseTime} ms</div>
            </div>
        </div>
    )
}
