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
// import MyDataGrid2 from '/imports/samples/MyDataGrid/MyDataGrid2';

import { ReactMeteorData } from 'meteor/react-meteor-data';
import { Collection } from 'meteor/tapfuse:collection-global';


// const UserData = React.createClass({
//   mixins: [ReactMeteorData],
//   getMeteorData() {
//     return {
//       items: Collection.offlineTickets.find().fetch(),
//     };
//   },
//   render() {
//     return (
//       <MyList list={this.data.items}/>
//     );
//   },
// });
    // <UserData/>

const App = (props) => {
  return (
    <MyDataGrid/>
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
