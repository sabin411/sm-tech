import React, { useCallback } from 'react'

// packages
import { notification } from 'antd';

export default function showNotification() {
    const [api, contextHolder] = notification.useNotification();
    // notification
    const notify = useCallback(({
    message,
    desp, 
  }: {
    message: string,
    desp: string,
  }) => {
    api.open({
      message: message,
      description: desp,
      className: 'custom-class',
      style: {
        width: 400,
      },
    });
  }, []);

return {
    notify,
    contextHolder,
}
}
