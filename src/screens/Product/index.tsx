import React, { useEffect, useState } from 'react';

// packages
import { Table, Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

// components
import Spinner from '../../components/Spinner';
import customModal from '../../components/Modal';

// commons
import ProductForm from './common/modal';
import { columns } from './common/columns';

// types
import { ProductDataProps } from './types';

// apis
import { getProducts, deleteProduct } from '../../apis/productsApi';

// utils
import showNotification from '../../utils/notification';

const Product: React.FC = () => {
  const { Modal, setModalOpen } = customModal();
  const { notify, contextHolder } = showNotification();
  const [data, setData] = useState<ProductDataProps[]>([]);
  const [isFetchLoading, setIsFetchLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [formStatus, setFormStatus] = useState<'EDIT' | 'CREATE'>('CREATE');
  const [initialValues, setInitialValues] = useState<ProductDataProps | null>();
  const [searchedText, setSearchedText] = useState('');

  // fetching Data with loading handling...
  useEffect(() => {
    setIsFetchLoading(true);
    try {
      getProducts().then(res => {
        setData(res);
        setIsFetchLoading(false);
      });
    } catch (err) {
      console.log(err);
      setIsFetchLoading(false);
    }
  }, []);

  const onEdit = (record: ProductDataProps) => {
    setModalOpen(true);
    setInitialValues(record);
    setFormStatus('EDIT');
  };

  // delete product with loading handling...
  const onDelete = (id: number) => {
    setIsDeleteLoading(true);
    try {
      deleteProduct(id).then(res => {
        setIsDeleteLoading(false);
        setData(data?.filter((item: ProductDataProps) => item.id !== id));
        notify({
          message: 'success',
          desp: 'Product deleted successfully',
        });
      });
    } catch (err) {
      console.log(err);
      setIsDeleteLoading(false);
    }
  };

  if (isFetchLoading || isDeleteLoading) {
    return <Spinner />;
  }

  return (
    <main>
      {contextHolder}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Button
          style={{ marginTop: '1rem', marginBottom: '1rem' }}
          onClick={() => {
            setInitialValues(null);
            setModalOpen(true);
            setFormStatus('CREATE');
          }}
          type='primary'
          icon={<PlusOutlined />}
          size={'large'}
        >
          Add Product
        </Button>
        <Input.Search
          placeholder='Search product...'
          onSearch={value => {
            setSearchedText(value);
          }}
          onChange={e => {
            setSearchedText(e.target.value);
          }}
          style={{ width: 250 }}
        />
      </div>
      <Table
        bordered
        dataSource={data}
        columns={columns(onEdit, onDelete, searchedText)}
        rowClassName='editable-row'
      />
      <Modal title={formStatus === 'CREATE' ? 'Add Product' : 'Update Product'}>
        <ProductForm
          data={data}
          notify={notify}
          setData={setData}
          formStatus={formStatus}
          setModalOpen={setModalOpen}
          initialValue={initialValues}
        />
      </Modal>
    </main>
  );
};

export default Product;
