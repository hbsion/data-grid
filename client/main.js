import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';


// import Testing from '/imports/samples/Testing/Testing';
// import CmsTable from '/imports/samples/CmsTable/CmsTable';
// import FlexTableExample from '/imports/samples/FlexTableExample/FlexTableExample';
import MyDataGrid from '/imports/samples/MyDataGrid/MyDataGrid';
import MultiSelectField from '/imports/samples/MultiSelectField/MultiSelectField';
import MultiSelectFilter from '/imports/samples/MultiSelectFilter/MultiSelectFilter';
// import MdEditor from '/imports/samples/MdEditor/MdEditor';

import BadgePrintPage from '/imports/ui/components/BadgePrintPage/BadgePrintPage';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Collection } from 'meteor/tapfuse:collection-global';
import { Spinner } from 'belle';

Collection.PeopleGroups = new Mongo.Collection('PeopleGroups');
Meteor.subscribe('PeopleGroups-list-all', {session: '1248hdi1bqwe2124'});


const UserData = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      items: Collection.offlineTickets.find().fetch(),
      groups: Collection.PeopleGroups.find({}, {fields: {groupName: 1}}).fetch(),
    };
  },
  render() {
    return (
      <MyList list={this.data.items} groups={this.data.groups}/>
    );
  },
});
    // <UserData/>

const MyList = (props) => {
  let myItem = {};
  const modifiedList = props.list;
  const modifiedGroups = [];
  modifiedList.map(item => {
    item.inGroups = item.inGroups.join(', ');
  });

  props.groups.map(item => {
    modifiedGroups.push({value: item.groupName, label: item.groupName});
  });
  if (props.list.length > 0 && props.groups.length > 0) {
    myItem = <MyDataGrid list={modifiedList} groups={modifiedGroups}/>;
  } else {
    myItem = <div> Loading <Spinner /> </div>;
  }
  return (
    <div>
      {myItem}
    </div>
  );
};

const Groups = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

testUpdate = (val) => {
  console.log('🌶', val);
};

    // <UserData/>
    // <MultiSelectField groups={Groups} label="Groups" onUpdate={testUpdate}/>

const App = (props) => {
  return (
    <BadgePrintPage/>
  );
};

// const MyList = (props) => {
//   let myItem = {};
//   if (props.list.length > 0) {
//     myItem = <FlexTableExample list={Immutable.List(props.list)}/>;
//   } else {
//     myItem = <div> Loading  </div>;
//   }
//   return (
//     <div>
//       {myItem}
//     </div>
//   );
// };

Template.hello.helpers({
  App() {
    return App;
  },
});

// Meteor.startup(() => {
//   const content = document.getElementById('main');
//   ReactDOM.render(
//     <App/>, content);
// });
