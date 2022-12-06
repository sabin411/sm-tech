import { useCallback, useState } from 'react';

// packages
import { Modal as AntDModal } from 'antd';

export default function customModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const Modal = useCallback(
    ({ children, title }: { children: JSX.Element; title: string }) => {
      return (
        <>
          <AntDModal
            title={title}
            open={modalOpen}
            onOk={() => {
              setModalOpen(false);
            }}
            onCancel={() => setModalOpen(false)}
            footer={[]}
          >
            {children}
          </AntDModal>
        </>
      );
    },
    [modalOpen],
  );

  return {
    Modal,
    setModalOpen,
  };
}
