// packages
import { Button, Tag, Typography, Image } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';

// globals
import { CategoryProps } from '../../../globals/types';

// utils
import { getTagColor } from '../../../utils/tagColor';

// components
import Ellipsis from '../../../components/Ellipsis';

// types
import { ProductDataProps } from '../types';
import { units, category } from '../../../globals/constants';
import { useState } from 'react';

// columns for table
export const columns = (
  edit: (record: ProductDataProps) => void,
  deleteRecord: (id: number) => void,
  searchedText: string,
) => [
  {
    title: 'Name',
    dataIndex: 'name',
    width: '15%',
    render: (text: string) => (
      <Typography.Title level={5} style={{ margin: 0 }}>
        {text}
      </Typography.Title>
    ),
    filteredValue: [searchedText],
    onFilter: (value: any, record: ProductDataProps) => {
      return String(record.name).toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: '30%',
    render: (description: string) => {
      return (
        <Ellipsis>
          <span> {description} </span>
        </Ellipsis>
      );
    },
  },
  {
    title: 'Category Name',
    dataIndex: 'categoryname',
    width: '10%',
    render: (categoryname: CategoryProps) => {
      return <Tag color={getTagColor(categoryname)}>{categoryname}</Tag>;
    },
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    width: '5%',
  },
  {
    title: 'Unit',
    dataIndex: 'unit',
    width: '10%',
  },
  {
    title: 'Image URL',
    dataIndex: 'image_url',
    width: '100px',
    render: (image_url: string) => {
      return (
        <Image
          width={100}
          height={100}
          style={{ objectFit: 'cover', borderRadius: '10px' }}
          src={`${image_url}`}
          placeholder={<Image preview={false} src={image_url} width={200} />}
        />
      );
    },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render: (_: any, record: ProductDataProps) => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            gap: '10px',
          }}
        >
          <Button
            type='primary'
            onClick={() => {
              edit(record);
            }}
            icon={<EditFilled />}
            size={'large'}
          >
            Edit
          </Button>
          <Button
            type='default'
            icon={<DeleteFilled />}
            size={'large'}
            danger
            onClick={() => {
              deleteRecord(record.id);
            }}
          >
            Delete
          </Button>
        </div>
      );
    },
  },
];
