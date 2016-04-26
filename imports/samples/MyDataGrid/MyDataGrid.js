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
      allFilterValues: {},
    };

    this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
  render() {
    const {
      sortInfo,
      allFilterValues,
    } = this.state;

    let list = this.props.list;
    // filter
    Object.keys(allFilterValues).forEach((name) => {
      const columnFilter = (allFilterValues[name] + '').toUpperCase();

      if (columnFilter === '') {
        return;
      }

      list = list.filter((item) => {
        if ((item[name] + '').toUpperCase().indexOf(columnFilter) === 0) {
          return true;
        }
      });
    });
    // sort
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
      onFilter={this.handleFilter}
      liveFilter={true}
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
  handleFilter(column, value, allFilterValues) {
    this.setState({allFilterValues});
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
