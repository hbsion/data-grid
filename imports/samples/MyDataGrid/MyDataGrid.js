import React, { Component, PropTypes } from 'react';
import DataGrid, { ColumnGroup } from 'react-datagrid';
import sorty from 'sorty';
import 'react-datagrid/index.css';
import { Button, Card, Spinner, Toggle, ComboBox, Option } from 'belle';

const columns = [
  {
    name: 'index',
    textAlign: 'center',
    title: '#',
    width: 50,
  },
  {
    name: 'firstName',
    textAlign: 'center',
  },
  {
    name: 'lastName',
    textAlign: 'center',
  },
  {
    name: 'company',
    textAlign: 'center',
  },
  {
    name: 'position',
    textAlign: 'center',
  },
  {
    name: 'email',
    textAlign: 'center',
  },
];

function filterRecords(records, params) {
  let list = records;
  Object.keys(params).forEach((name) => {
    const columnFilter = (params[name] + '').toUpperCase();

    if (columnFilter === '') {
      return;
    }

    list = list.filter((item) => {
      if ((item[name] + '').toUpperCase().indexOf(columnFilter) === 0) {
        return true;
      }
    });
  });
  return list;
}

class MyDataGrid extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      sortInfo: [ { name: 'firstName', dir: 'asc'}],
      allFilterValues: {},
      selectedIds: {},
      filteredItemCount: props.list.length,
    };

    this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onColumnResize = this.onColumnResize.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.selectFilteredRecords = this.selectFilteredRecords.bind(this);
  }
  render() {
    const {
      sortInfo,
      allFilterValues,
      selectedIds,
      filteredItemCount,
    } = this.state;

    let list = this.props.list;
    // filter
    list = filterRecords(list, allFilterValues);
    // sort
    list = [].concat(list);
    list = sorty(sortInfo, list);

    return <div>
      <div className="padding:1">
        <Button primary className="margin-r:1" onClick={this.selectFilteredRecords}>Select</Button>
        <p>Selected: {Object.keys(selectedIds).length}</p>
        <p>Filtered: {filteredItemCount}</p>
      </div>
      <DataGrid
        idProperty='_id'
        dataSource={list}
        columns={columns}
        style={{height: 500}}
        sortInfo={sortInfo}
        onSortChange={this.handleSortChange}
        onColumnOrderChange={this.handleColumnOrderChange}
        onFilter={this.handleFilter}
        liveFilter={true}
        onColumnResize={this.onColumnResize}
        selected={selectedIds}
        onSelectionChange={this.onSelectionChange}
      />
      <ColumnGroup width={900} fixed columns={columns} />
    </div>;
  }
  handleColumnOrderChange(index, dropIndex) {
    const col = columns[index];
    columns.splice(index, 1);  // delete from index, 1 item
    columns.splice(dropIndex, 0, col);
    this.setState({});
  }
  handleSortChange(sortInfo) {
    this.setState({sortInfo});
  }
  handleFilter(column, value, allFilterValues) {
    this.setState({filteredItemCount: filterRecords(this.props.list, allFilterValues).length});
    this.setState({allFilterValues});
  }
  onColumnResize(firstCol, firstSize, secondCol, secondSize) {
    firstCol.width = firstSize;
    this.setState({});
  }
  onSelectionChange(selectedIds) {
    this.setState({selectedIds});
  }
  selectFilteredRecords(e) {
    const filteredRecords = filterRecords(this.props.list, this.state.allFilterValues);
    const selectedIds = this.state.selectedIds;
    filteredRecords.map(record => {
      selectedIds[record._id] = record;
    });
    this.setState({selectedIds});
  }
}

export default MyDataGrid;
