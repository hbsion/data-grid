async function _updatePeopleGroups( query, params) {
  try {
    for (const id of params.idArray) {
      await Collection.Tickets.update({_id: id}, query, (err, res) => {
        if (err) {
          console.log(err);
          return err;
        }
      });
    }
    return 'done';
  } catch (err) {
    console.log(err);
    return err;
  }
}

Meteor.methods({
  'PeopleGroups/add'(params) {
    const query = {};
    query.$addToSet = {
      inGroups: {$each: params.groupsArray},
    };
    query.$set = {updatedAt: Date.now()};
    return _updatePeopleGroups(query, params);
  },
  'PeopleGroups/remove'(params) {
    const query = {};
    query.$pull = {
      inGroups: {$in: params.groupsArray},
    };
    query.$set = {updatedAt: Date.now()};
    return _updatePeopleGroups(query, params);
  },
});
