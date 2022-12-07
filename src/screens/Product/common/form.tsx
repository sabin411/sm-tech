import React, { useState } from 'react';

// components
import TextArea from 'antd/es/input/TextArea';
import { Button, Form, Input, Select, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

// api
import { createProduct, updateProduct } from '../../../apis/productsApi';

// globals
import { category, units } from '../../../globals/constants';

// types
import { ProductDataProps, ProductFormProps } from '../types';
import Spinner from '../../../components/Spinner';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function ProductForm({
  data,
  notify,
  setData,
  formStatus,
  initialValue,
  setModalOpen,
}: ProductFormProps) {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isCreateLoading, setIsCreateLoading] = useState(false);
  const [previewSource, setPreviewSource] = useState<string | null>(null);

  // This edit form submit handler checks for initial
  // value first and if it is present then it will update the product
  const handleEdit = (record: { product: ProductDataProps }) => {
    if (!initialValue) {
      return null;
    }

    setIsUpdateLoading(true);
    let { product } = record;
    product = { ...product, id: initialValue?.id };

    if (initialValue?.id) {
      try {
        updateProduct(product)
          .then(res => {
            const updatedData = data.map(item => {
              if (item.id === product.id) {
                return product;
              }
              return item;
            });
            setData(updatedData);
            setIsUpdateLoading(false);
            notify({
              message: 'success',
              desp: 'Product Updated Successfully',
            });
            setModalOpen(false);
          })
          .catch(err => {
            console.log(err);
            setIsUpdateLoading(false);
            notify({
              message: 'error',
              desp: 'Something went wrong',
            });
          });
      } catch (err) {
        console.log(err);
        setIsUpdateLoading(false);
        notify({
          message: 'error',
          desp: `Error: ${err}`,
        });
      }
    }
  };

  // This create form submit handler will create a new product
  const handleCreate = (record: { product: ProductDataProps }) => {
    setIsCreateLoading(true);
    const randomNumber = Math.floor(Math.random() * 100); // ! [NOTE] this is just for demo purpose to generate unique identifier for each product however id is handles in backend
    const { product } = record;
    product.id = randomNumber;

    try {
      createProduct(product)
        .then(res => {
          setData([...data, product]);
          setModalOpen(false);
          notify({
            message: 'Product Created',
            desp: 'Product has been created successfully',
          });
          setIsCreateLoading(false);
        })
        .catch(err => {
          console.log(err);
          notify({
            message: 'Product Creation Failed',
            desp: 'Product has not been created',
          });
          setIsCreateLoading(false);
        });
    } catch (err) {
      console.log(err);
      notify({
        message: 'Product Creation Failed',
        desp: `Error: ${err}`,
      });
      setIsCreateLoading(false);
    }
  };

  // a function to display image for optimistic rendering
  function previewProfileImage(file: File | null) {
    if (!file) {
      setPreviewSource(null);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result && reader?.result.toString());
    };
  }

  const onSubmit = (record: { product: ProductDataProps }) => {
    formStatus === 'CREATE' ? handleCreate(record) : handleEdit(record);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '500px',
        marginInline: 'auto',
        marginTop: '24px',
      }}
    >
      {
        <Form
          {...layout}
          name='nest-messages'
          onFinish={onSubmit}
          // validateMessages={validateMessages}
        >
          {isUpdateLoading || isCreateLoading ? (
            <Spinner />
          ) : (
            <>
              <Form.Item
                name={['product', 'name']}
                label='Name'
                rules={[
                  { required: true, message: 'The name is required' },
                  {
                    whitespace: true,
                    message: 'The name is required',
                  },
                ]}
                initialValue={initialValue && initialValue.name}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['product', 'description']}
                label='description'
                rules={[
                  {
                    required: true,
                    message: 'The description is required',
                  },
                  {
                    whitespace: true,
                    message: 'The description is required',
                  },
                ]}
                initialValue={initialValue && initialValue.description}
              >
                <TextArea
                  rows={4}
                  placeholder='maxLength is 6'
                  maxLength={200}
                />
              </Form.Item>
              <Form.Item
                name={['product', 'quantity']}
                label='Quantity'
                rules={[
                  { required: true, message: 'The quantity is required' },
                  {
                    whitespace: true,
                    message: 'The quantity is required',
                  },
                ]}
                initialValue={initialValue && initialValue.quantity}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['product', 'unit']}
                label='Unit'
                rules={[
                  {
                    required: true,
                    message: 'The unit is required',
                  },
                  {
                    whitespace: true,
                    message: 'The unit is required',
                  },
                ]}
                initialValue={initialValue && initialValue.unit}
              >
                <Select style={{ width: '100%' }} options={units} />
              </Form.Item>
              <Form.Item
                name={['product', 'categoryname']}
                label='Category Name'
                rules={[
                  {
                    required: true,
                    message: 'The category is required',
                  },
                  {
                    whitespace: true,
                    message: 'The category is required',
                  },
                ]}
                initialValue={initialValue && initialValue.categoryname}
              >
                <Select style={{ width: '100%' }} options={category} />
              </Form.Item>
              <Form.Item
                name={['product', 'image_url']}
                label='Image URL'
                rules={[
                  {
                    required: true,
                    message: 'The image url is required',
                  },
                  {
                    type: 'url',
                    message: 'The input is not valid URL',
                  },
                ]}
                initialValue={initialValue && initialValue.image_url}
              >
                <Input />
              </Form.Item>

              {/* Testing */}
              {/* ![NOTE]:  I had to leave it on this due to time constraint also had veryyy important work at home. my great grand mother died. */}
              {/* <Form.Item
                name={['product', 'image_url']}
                label='Image URL'
                rules={[
                  {
                    required: true,
                    message: 'The image url is required',
                  },
                  {
                    type: 'url',
                    message: 'The input is not valid URL',
                  },
                ]}
                initialValue={initialValue && initialValue.image_url}
              >
                <Upload
                  customRequest={req => {
                    console.log('custom request', req.file);
                  }}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item> */}
              {/* Testing */}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  htmlType='button'
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  htmlType='submit'
                  style={{
                    marginLeft: '16px',
                  }}
                  type='primary'
                >
                  OK
                </Button>
              </div>
            </>
          )}
        </Form>
      }
    </div>
  );
}
