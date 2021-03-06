import React, { Component, PropTypes } from 'react';
import DataGrid from 'react-datagrid';
import sorty from 'sorty';
import 'react-datagrid/index.css';
import { Button, Toggle, Choice } from 'belle';
import MultiSelectField from '/imports/samples/MultiSelectField/MultiSelectField';
import { Meteor } from 'meteor/meteor';

const columns = [
  { name: 'index', title: '#', width: 50 },
  { name: 'firstName'},
  { name: 'lastName'},
  { name: 'company'},
  { name: 'position'},
  { name: 'email'},
  { name: 'inGroups'},
  { name: 'labels'},
  { name: 'infoLabels'},
];

function filterRecords(records, params) {
  let list = records;
  Object.keys(params).forEach((name) => {
    const columnFilter = (params[name] + '').toUpperCase();

    if (columnFilter === '') {
      return;
    }
    list = list.filter((item) => {
      if ((item[name] + '').toUpperCase().indexOf(columnFilter) !== -1) {
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
      selectedGroups: '',
      filteredItemCount: props.list.length,
      updateOperation: 'add',
    };

    this.handleColumnOrderChange = this.handleColumnOrderChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onColumnResize = this.onColumnResize.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.selectFilteredRecords = this.selectFilteredRecords.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.toggleUpdateMode = this.toggleUpdateMode.bind(this);
    this.setCurrentSelection = this.setCurrentSelection.bind(this);
    this.callRecordUpdate = this.callRecordUpdate.bind(this);
  }
  render() {
    const {
      sortInfo,
      allFilterValues,
      selectedIds,
      filteredItemCount,
      selectedGroups,
      updateOperation,
    } = this.state;

    let list = this.props.list;
    // filter
    list = filterRecords(list, allFilterValues);
    // sort
    list = [].concat(list);
    list = sorty(sortInfo, list);

    let UpdateButton;
    if (Object.keys(selectedIds).length && selectedGroups) {
      UpdateButton = <Button primary className="margin-r:1" onClick={this.callRecordUpdate}>Update Selected</Button>;
    } else {
      UpdateButton = <Button disabled className="margin-r:1" onClick={this.callRecordUpdate}>Update Selected</Button>;
    }

    return <div>
      <div className="padding:1">
        <div className="display:flex flex:items-center">
          <Button className="margin-r:1" onClick={this.deselectAll}>Deselect All</Button>
          <Button primary className="margin-r:1" onClick={this.selectFilteredRecords}>Select Filtered</Button>
          <div style={{minWidth: '200px'}}>
            <MultiSelectField onUpdate={this.setCurrentSelection} groups={this.props.groups}/>
          </div>
          <Toggle className="margin-x:1"
                  defaultValue
                  firstChoiceStyle={{ backgroundColor: 'rgba(46, 204, 113, 0.8)' }}
                  secondChoiceStyle={{ backgroundColor: 'rgba(231, 76, 60, 0.8)' }}
                  onUpdate={this.toggleUpdateMode}
                  >
            <Choice value>Add</Choice>
            <Choice value={ false }>Del</Choice>
          </Toggle>
          {UpdateButton}
        </div>
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
  deselectAll(e) {
    this.setState({selectedIds: {}});
  }
  toggleUpdateMode(val) {
    if (val.value) {
      this.setState({updateOperation: 'add'});
    } else {
      this.setState({updateOperation: 'remove'});
    }
  }
  setCurrentSelection(selectedGroups) {
    this.setState({selectedGroups: selectedGroups.value});
  }
  callRecordUpdate() {
    const options = {
      idArray: Object.keys(this.state.selectedIds),
      groupsArray: this.state.selectedGroups.split(','),
    };
    console.log('🎵', options);
    Meteor.call(`PeopleGroups/${this.state.updateOperation}`, options, (err, res) => {
      if (err) {
        console.log('💡', err);
      }
    });
  }
}

export default MyDataGrid;
