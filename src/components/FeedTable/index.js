import React from 'react'
import styled from 'styled-components'
import { Table, Button } from 'antd';

const StyledButton = styled(Button)`
  color: #6CC7A3;
  border-color: #6CC7A3;
  font-size: 20px;
  border-radius: 10px;
  background: transparent;
  &:hover, &:active, &:focus {
    background-color: transparent;
  }
`

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Cash Assets',
    dataIndex: 'money',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: '',
    dataIndex: 'action',
    render: text => <StyledButton>+</StyledButton>
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

const StyledTable = styled(Table)`
&&& {
  table {
    border-top: none;
    border-left: none;
    tr, td, th {
      color: white;
    }
    td:first-child {
      border-left: 1px solid white;
    }
    th {
      border-right: none;
      background: transparent;
    }
    tr:hover {
      td {
        background-color: #536350;
      }
    }
  }
}
`

export default () => {
  return (
    <StyledTable
      columns={columns}
      dataSource={data}
      bordered
    />
  )
}