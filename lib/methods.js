Meteor.methods({
  'PeopleGroups/add'(props) {
    Collection.Tickets.update({_id: {$in: props.idArray}}, {$addToSet: {inGroups: props.groupsArray}}, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  },
  'PeopleGroups/remove'(props) {
    Collection.Tickets.update({_id: {$in: props.idArray}}, {$pull: {inGroups: props.groupsArray}}, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  },
});
