import React from 'react';

import { FlexTable, FlexColumn, AutoSizer, SortDirection, SortIndicator } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once

// Table data as a array of objects
const list = [
  { name: 'Brian Vaughn', description: 'Software engineer' }
  // And so on...
];

const CmsTable = (props) => {
  console.log('😈', props);
  return (
    <div>
      {/* FlexTable */}
      <AutoSizer>
        {({ width }) => (
          <FlexTable
              width={width}
              height={500}
              headerHeight={20}
              rowHeight={30}
              rowsCount={props.count}
              rowGetter={index => props.data[index]}
            >
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
  );
};

export default CmsTable;
