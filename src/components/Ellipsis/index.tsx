import React from 'react';

// packages
import { Tooltip } from 'antd';

// style
import './styles.css';

export default function Ellipsis({ children }: { children: JSX.Element }) {
  return (
    <Tooltip title={children}>
      <p className='ellipsis-wrapper'>{children}</p>
    </Tooltip>
  );
}
