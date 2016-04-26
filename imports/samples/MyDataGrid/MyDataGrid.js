import React from 'react';
import DataGrid from 'react-datagrid';
import 'react-datagrid/index.css';

const data = [
  { id: '1', firstName: 'John', lastName: 'Bobson'},
  { id: '2', firstName: 'Bob', lastName: 'Mclaren'},
];

const columns = [
  { name: 'firstName'},
  { name: 'lastName'},
];

const MyDataGrid = (props) => {
  return (
    <DataGrid idProperty="id" dataSource={data} columns={columns} />
  );
};

export default MyDataGrid;
