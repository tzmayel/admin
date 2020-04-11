import React from 'react';
import Button from '@material-ui/core/Button';

export default (props) => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around'
        }}>
            <div>
                <Button variant="contained" color="primary" onClick={props.showSelected}>
                    Send Email
                </Button>
                <div>(only shows selected rows)</div>
            </div>
        </div>
    );
}