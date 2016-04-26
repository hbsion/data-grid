import React, { Component, PropTypes } from 'react';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
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

let SORT_INFO = [ { name: 'firstName', dir: 'asc'}];

// function sort(arr) {
//   return sorty(SORT_INFO, arr);
// }

class MyDataGrid extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      sortInfo: [ { name: 'firstName', dir: 'asc'}],
    };

    this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }
  render() {
    const {
      sortInfo,
    } = this.state;

    let list = this.props.list;
    list = [].concat(list);
    list = sorty(sortInfo, list);

    return <DataGrid
      idProperty='id'
      dataSource={list}
      columns={columns}
      style={{height: 500}}
      sortInfo={sortInfo}
      onSortChange={this.handleSortChange}
      onColumnOrderChange={this.handleColumnOrderChange}
    />;
  }

  handleColumnOrderChange(index, dropIndex) {
    const col = columns[index];
    columns.splice(index, 1);  // delete from index, 1 item
    columns.splice(dropIndex, 0, col);
    this.setState({});
  }
  handleSortChange(sortInfo) {
    // console.log(sortInfo)


    // console.log('💣', data);
    // console.log('🔒', data2);
    this.setState({sortInfo});
  }
}


// const MyDataGrid = (props) => {
//   return (
//     <DataGrid idProperty="id" dataSource={props.list} columns={columns} />
//   );
// };

export default MyDataGrid;


// const MyDataGrid = React.createClass({
//   handleColumnOrderChange: function(index, dropIndex) {
//     const col = columns[index];
//     columns.splice(index, 1); // delete from index, 1 item
//     columns.splice(dropIndex, 0, col);
//     this.setState({});
//   },
//   render: function() {
//     return <DataGrid
//       idProperty='id'
//       dataSource={this.props.list}
//       columns={columns}
//       style={{height: 500}}
//       onColumnOrderChange={this.handleColumnOrderChange}
//     />;
//   },
// });
