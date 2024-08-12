import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
        <h1
            style={{
                marginLeft: '10px',
                color: 'blue'
            }}
        >
            Loading...
        </h1>
    </div>
);

export default Loading;
