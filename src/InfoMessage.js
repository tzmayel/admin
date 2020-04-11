import React from 'react';

export default (props) => {
    return (
        <div style={{
            background: '#eee',
            marginTop: 16,
            marginBottom: 16,
            padding: 10,
            borderRadius: 10,
            height: 30
        }}>
            <span>{props.message}</span>
        </div>
    );
}
