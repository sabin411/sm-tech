import React from 'react';

// packages
import { Spin } from 'antd';

export default function Spinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Spin />
    </div>
  );
}
