import React from 'react';
import { render } from 'react-dom';
import Component from 'react-class';
import { Flex } from 'react-flex';
import DataGrid, { ColumnGroup } from 'react-datagrid';
import 'react-datagrid/index.css';

import gen from './generate';
import Perf from 'react-addons-perf';

window.Promise = require('es6-promise').Promise;
// window.Perf = Perf

window.start = () => Perf.start()
window.stop = () => {
  Perf.stop()
  Perf.printWasted()
  // Perf.printInclusive()
}


const data = new Promise((rez, rej) => {
  setTimeout(() => {
    rez(gen(10000))
    // rez('hello world')
  }, 100)
})


const columns = [
  {
    name: 'id',
    textAlign: 'center'
  }, {
    name: 'lastName',
    width: 150,
    textAlign: 'center'
  }
]

const columns2 = [
  {
    name: 'firstName',
    textAlign: 'center',
    width: 200
  }, {
    title: 'bau',
    width: 300,
    render(value, something, cellProps) {
      if (!cellProps.headerCell) {
        return <input type="text" />
      }
    }
  }, {
    name: 'email',
    width: 400
  }, {
    name: 'email',
    width: 400
  }, {
    name: 'email',
    width: 400
  }, {
    name: 'email',
    width: 400
  },
]

class MyDataGrid extends Component {
  constructor(props){
    super(props)

    this.state = {
      height: 500,
      sortInfo: {dir: 1, name: "firstName", index: 2}
    }
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
        className="grid"
        columns={columns}
        dataSource={data}
        idProperty="id"
        xrowHeight={70}
        defaultSelected={{1:1, 2:2, 3:3}}
        aonSelectionChange={selected => console.log(selected)}
        defaultActiveIndex={4}
        xscrollTop={400}
        ref={(c) => window.c = c}
        azebraRows={false}
        //rowPlaceholder={true}
        // renderRowPlaceholder={() => <div> asdasd</div>}
        rowPlaceholderDelay={300}
        rowRef='renderIndex'
        onScrollBottom={() => {console.log('scrolled to bottom')}}
        onSortInfoChange={(sortInfo) => {
            console.log('onsortChange :', sortInfo)
            this.setState({sortInfo: sortInfo})
          }}
        sortable
        sortInfo={this.state.sortInfo}
      >
        <ColumnGroup width={900} fixed columns={columns} />
        <ColumnGroup renderRowPlaceholder={() => <div> aaa</div>} className="myColumnGroup" columns={columns2} />
      </DataGrid>
    </Flex>
  }
}

export default MyDataGrid;
