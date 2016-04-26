import React from 'react';
import { render } from 'react-dom';
import Component from 'react-class';
import { Flex } from 'react-flex';
import DataGrid, { ColumnGroup } from 'react-datagrid';
import 'react-datagrid/index.css';

import gen, { gen2 } from './generate'
import Perf from 'react-addons-perf';


const data = gen2(100)
const columns = [
  {
    name: 'name',
    titleClassName: 'helloHEader',
    className: 'test'
  }, {
    name: 'age'
  }, {
    name: 'gender'
  }, {
    name: 'location'
  }, {
    name: 'status',
  } , {
    title: 'Actions',
    render({value, data, cellProps}) {
      if (cellProps.headerCell){
        value = 'test'
        return
      }

      cellProps.children = <div>
        <button>add</button>
        <button>remove</button>
      </div>
    }
  }
]


class MyDataGrid2 extends Component {
  constructor(props){
    super(props)

    this.state = {
      height: 500,
      sortInfo: {dir: 1, name: "firstName", index: 2},
      data: data
    }

    setTimeout(() => {
      this.setState({
        data: gen2(100)
      })
    }, 5000)
  }

  render(){
    return <Flex
      column
      alignItems="stretch"
      className="app"
      wrap={false}
      style={{
        height: this.state.height
      }}
    >
      <h1>
        React DataGrid by ZippyUi
      </h1>

      <div>
        <button
          style={{
            marginBottom: 10
          }}
          onClick={() => this.setState({
            height: this.state.height + 10
          })}
        >
          Add Height
        </button>
        <button
          style={{
            marginBottom: 10
          }}
          onClick={() => this.setState({
            height: this.state.height - 10
          })}
        >
          Remove Height
        </button>
      </div>

      <DataGrid
        // defaultActiveIndex={3}
        hideHeader
        idProperty={'id'}
        dataSource={this.state.data}
        columns={columns}
        sortable
        onSortInfoChange={(sortInfo) => this.setState({sortInfo})}
        sortInfo={this.state.sortInfo}
        renderRow={(rowProps) => {
          if (rowProps.data.error) {
            rowProps.className = rowProps.className + ' classErroare'
          }
        }}
      />
    </Flex>
  }
}

export default MyDataGrid2;
