/** @flow */

import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react';
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from './ContentBox'
import { FlexTable, FlexColumn, AutoSizer, SortDirection, SortIndicator } from 'react-virtualized';
import { LabeledInput, InputRow } from './LabeledInput'
import shallowCompare from 'react-addons-shallow-compare'
import 'react-virtualized/styles.css'; // only needs to be imported once
import '/imports/samples/FlexTableExample/Application.css'
import '/imports/samples/FlexTableExample/FlexTableExample.css'

import without from 'lodash.without';

class FlexTableExample extends Component {

  constructor (props, context) {
    super(props, context)

    this.state = {
      headerHeight: 30,
      height: 270,
      hideIndexRow: false,
      overscanRowsCount: 0,
      rowHeight: 40,
      rowsCount: 100,
      scrollToIndex: undefined,
      sortBy: 'index',
      sortDirection: SortDirection.ASC,
      useDynamicRowHeight: false,
      selectedItems: ['nqtD5yeMZxJQfo7JY'],
    }

    this._getRowHeight = this._getRowHeight.bind(this)
    this._updateCheckArray = this._updateCheckArray.bind(this)
    this._headerRenderer = this._headerRenderer.bind(this)
    this._cellRenderer = this._cellRenderer.bind(this)
    this._noRowsRenderer = this._noRowsRenderer.bind(this)
    this._onRowsCountChange = this._onRowsCountChange.bind(this)
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this)
    this._sort = this._sort.bind(this)
  }
  render () {
    const {
      headerHeight,
      height,
      hideIndexRow,
      overscanRowsCount,
      rowHeight,
      rowsCount,
      scrollToIndex,
      sortBy,
      sortDirection,
      useDynamicRowHeight,
      selectedItems
    } = this.state

    const { list, ...props } = this.props
    const sortedList = this._isSortEnabled()
      ? list
        .sortBy(item => item[sortBy])
        .update(list =>
          sortDirection === SortDirection.DESC
            ? list.reverse()
            : list
        )
      : list

    const rowGetter = index => this._getDatum(sortedList, index)

    return (
      <ContentBox {...props}>
        <ContentBoxHeader
          text='FlexTable'
          sourceLink='https://github.com/bvaughn/react-virtualized/blob/master/source/FlexTable/FlexTable.example.js'
          docsLink='https://github.com/bvaughn/react-virtualized/blob/master/docs/FlexTable.md'
        />

        <ContentBoxParagraph>
          The table layout below is created with flexboxes.
          This allows it to have a fixed header scrollable body content.
          It also makes use of <code>VirtualScroll</code> so that large lists of tabular data can be rendered efficiently.
          Adjust its configurable properties below to see how it reacts.
        </ContentBoxParagraph>

        <ContentBoxParagraph>
          <label className={'.checkboxLabel'}>
            <input
              aria-label='Use dynamic row heights?'
              className={'.checkbox'}
              type='checkbox'
              value={useDynamicRowHeight}
              onChange={event => this._updateUseDynamicRowHeight(event.target.checked)}
            />
            Use dynamic row heights?
          </label>

          <label className={'.checkboxLabel'}>
            <input
              aria-label='Add new Array?'
              className={'.checkbox'}
              type='checkbox'
              onChange={this._updateCheckArray}
            />
            Add new Array?
          </label>

          <label className={'.checkboxLabel'}>
            <input
              aria-label='Hide index row?'
              className={'.checkbox'}
              type='checkbox'
              value={hideIndexRow}
              onChange={event => this.setState({ hideIndexRow: event.target.checked })}
            />
            Hide index row?
          </label>
        </ContentBoxParagraph>

        <InputRow>
          <LabeledInput
            label='Num rows'
            name='rowsCount'
            onChange={this._onRowsCountChange}
            value={rowsCount}
          />
          <LabeledInput
            label='Scroll to'
            name='onScrollToRow'
            placeholder='Index...'
            onChange={this._onScrollToRowChange}
            value={scrollToIndex}
          />
          <LabeledInput
            label='List height'
            name='height'
            onChange={event => this.setState({ height: parseInt(event.target.value, 10) || 1 })}
            value={height}
          />
          <LabeledInput
            disabled={useDynamicRowHeight}
            label='Row height'
            name='rowHeight'
            onChange={event => this.setState({ rowHeight: parseInt(event.target.value, 10) || 1 })}
            value={rowHeight}
          />
          <LabeledInput
            label='Header height'
            name='headerHeight'
            onChange={event => this.setState({ headerHeight: parseInt(event.target.value, 10) || 1 })}
            value={headerHeight}
          />
          <LabeledInput
            label='Overscan'
            name='overscanRowsCount'
            onChange={event => this.setState({ overscanRowsCount: parseInt(event.target.value, 10) || 0 })}
            value={overscanRowsCount}
          />
        </InputRow>

        <div>
          <AutoSizer disableHeight>
            {({ width }) => (
              <FlexTable
                ref='Table'
                headerClassName={'.headerColumn'}
                headerHeight={headerHeight}
                height={height}
                noRowsRenderer={this._noRowsRenderer}
                overscanRowsCount={overscanRowsCount}
                rowClassName={this._rowClassName.bind(this)}
                rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                rowGetter={rowGetter}
                rowsCount={list.size}
                scrollToIndex={scrollToIndex}
                sort={this._sort}
                sortBy={sortBy}
                sortDirection={sortDirection}
                width={width}
              >
                {!hideIndexRow &&
                  <FlexColumn
                    label='Index'
                    cellDataGetter={
                      (dataKey, rowData, columnData) => rowData.index
                    }
                    dataKey='index'
                    disableSort={!this._isSortEnabled()}
                    width={100}
                  />
                }
                <FlexColumn
                  dataKey='_id'
                  label='Select'
                  cellRenderer={this._cellRenderer}
                  width={90}
                />
                <FlexColumn
                  dataKey='name'
                  disableSort={!this._isSortEnabled()}
                  headerRenderer={this._headerRenderer}
                  width={90}
                />
                <FlexColumn
                  label='First Name'
                  dataKey='firstName'
                  width={100}
                />
                <FlexColumn
                  label='Last Name'
                  dataKey='lastName'
                  width={100}
                />
                <FlexColumn
                  width={300}
                  label='Company'
                  dataKey='company'
                />
                <FlexColumn
                  width={300}
                  label='Position'
                  dataKey='position'
                />
              </FlexTable>
            )}
          </AutoSizer>
        </div>
      </ContentBox>
    )
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  _getDatum (list, index) {
    return list.get(index % list.size)
  }

  _getRowHeight (index) {
    const { list } = this.props

    return this._getDatum(list, index).size
  }

  _headerRenderer ({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection
  }) {
    return (
      <div>
        Full Name
        {sortBy === dataKey &&
          <SortIndicator sortDirection={sortDirection}/>
        }
      </div>
    )
  }

  _cellRenderer (
    cellData,
    cellDataKey,
    rowData,
    rowIndex,
    columnData
  ) {
    if (cellData === null || cellData === undefined) {
      return ''
    } else {
      return <input
              aria-label='Hide index row?'
              className={'.checkbox'}
              type='checkbox'
              checked={this._getCheckedValue(cellData)}
              onChange={event => {
                let { selectedItems } =  this.state;
                console.log('☎️', this.state.selectedItems);
                console.log('🔑', cellData);
                  if (event.target.checked && !selectedItems.includes(cellData)) {
                    selectedItems.push(cellData)
                    this.setState({ selectedItems: selectedItems })
                  } else {
                    selectedItems = without(selectedItems, cellData);
                    this.setState({ selectedItems: selectedItems })
                  }
                }
              }
            />
    }
  }

  _isSortEnabled () {
    const { list } = this.props
    const { rowsCount } = this.state

    return rowsCount <= list.size
  }

  _noRowsRenderer () {
    return (
      <div className={'.noRows'}>
        No rows
      </div>
    )
  }

  _onRowsCountChange (event) {
    const rowsCount = parseInt(event.target.value, 10) || 0

    this.setState({ rowsCount })
  }

  _onScrollToRowChange (event) {
    const { rowsCount } = this.state
    let scrollToIndex = Math.min(rowsCount - 1, parseInt(event.target.value, 10))

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined
    }

    this.setState({ scrollToIndex })
  }

  _rowClassName (index) {
    if (index < 0) {
      return '.headerRow'
    } else {
      return index % 2 === 0 ? '.evenRow' : '.oddRow'
    }
  }

  _sort (sortBy, sortDirection) {
    this.setState({ sortBy, sortDirection })
  }

  _updateUseDynamicRowHeight (value) {
    this.setState({
      useDynamicRowHeight: value
    })
  }

  _getCheckedValue (cellData) {
    console.log('🍳', this.state.selectedItems);
    const currentValue = this.state.selectedItems.includes(cellData);
    console.log('👽', currentValue);
    return currentValue;
  }

  _updateCheckArray (event) {
    let { selectedItems } =  this.state;
    if (event.target.checked) {
      selectedItems.push('nqtD5yeMZxJQfo7JY')
      this.setState({ selectedItems: selectedItems })
    } else {
      selectedItems = without(selectedItems, 'nqtD5yeMZxJQfo7JY');
      this.setState({ selectedItems: selectedItems })
    }
  }
}

// FlexTableExample.propTypes = {
//     list: PropTypes.instanceOf(Immutable.List).isRequired
//   }

export default FlexTableExample;


          // <FlexColumn
          //         width={210}
          //         disableSort
          //         label='The description label is really long so that it will be truncated'
          //         dataKey='random'
          //         cellClassName={'.exampleColumn'}
          //         cellRenderer={
          //           (cellData, cellDataKey, rowData, rowIndex, columnData) => cellData
          //         }
          //         flexGrow={1}
          //       />
