import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>
            <Button variant="contained" color="primary" onClick={props.showSelected}>
                Send Email
            </Button>

            <Button variant="contained" color="secondary" onClick={props.showSelected}>
                Delete Selected
            </Button>
        </div>
    );
}