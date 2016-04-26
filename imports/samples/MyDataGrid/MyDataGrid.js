import React from 'react';
import DataGrid from 'react-datagrid';
import 'react-datagrid/index.css';

// const data = [
//   { id: '1', firstName: 'John', lastName: 'Bobson'},
//   { id: '2', firstName: 'Bob', lastName: 'Mclaren'},
// ];

const columns = [
  { name: 'index', title: '#', width: 50 },
  { name: 'firstName'},
  { name: 'lastName'},
  { name: 'company'},
  { name: 'position'},
  { name: 'email'},
];


// const MyDataGrid = React.createClass({
//   handleColumnOrderChange: function (index, dropIndex){
//     var col = columns[index]
//     columns.splice(index, 1) //delete from index, 1 item
//     columns.splice(dropIndex, 0, col)
//     this.setState({})
//   },
//   render: function(){
//     return <DataGrid
//       idProperty='id'
//       dataSource={data}
//       columns={columns}
//       style={{height: 500}}
//       onColumnOrderChange={this.handleColumnOrderChange}
//     />
//   }
// })


const MyDataGrid = (props) => {
  return (
    <DataGrid idProperty="id" dataSource={props.list} columns={columns} />
  );
};

export default MyDataGrid;
