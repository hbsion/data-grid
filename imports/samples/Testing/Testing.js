import React from 'react';
import { Button, Card, Spinner, Toggle, ComboBox, Option } from 'belle';

import {cyan500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';

import MultiSelectField from '/imports/samples/MultiSelectField/MultiSelectField';


// Material theme setup
const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50,
  },
});

const Testing = (props) => {
  return (
    <div>
      {/* Belle */}
      <div className="padding:1">
        <Button primary className="margin-r:1">Follow</Button>
        <Button primary disabled style={{marginRight: 10}}>Follow</Button>
        <Button style={{marginRight: 10}}>Follow</Button>
        <Button disabled>Follow</Button>
      </div>
      {/* Material */}
      <div className="padding:1">
        <MuiThemeProvider muiTheme={muiTheme}>
          <RaisedButton label="cool!" />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={muiTheme}>
          <Slider/>
        </MuiThemeProvider>
      </div>
      {/* Select */}
      <div className="padding:1">
        <MultiSelectField/>
      </div>
      {/* Virtual list */}
      <div className="scroll-wrap">
        {/* import user list here */}
      </div>
    </div>
  );
};

export default Testing;
