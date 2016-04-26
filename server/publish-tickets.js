import { Collection } from 'meteor/tapfuse:collection-global';
import { Meteor } from 'meteor/meteor';

Collection.offlineSettings = new Mongo.Collection('offlineSettings');

Meteor.publish('ticket-list-all', (params) => {
  // console.log('start publish ticket-all with limit -', session);
  return Collection.Tickets.find({isDeleted: false, appId: params.session},
    {sort: {updatedAt: 1}, fields: {isDeleted: 0}});
});

Meteor.publish('ticket-list-update', function({lastUpdatedAt = 0, session}) {
  // console.log('start publish ticket-list-update with lastUpdated -', lastUpdatedAt);
  // console.log('start publish ticket-list-update with session -', session);
  const query = {
    updatedAt: {$gte: lastUpdatedAt},
  };
  if (session) {
    query.appId = session;
  }
  return Collection.Tickets.find(query, {sort: {updatedAt: 1}});
});


// offlineSettings holds offline collection removal sequeance
// assignedToId: Meteor.userId() it is assigned to, or all
// deviceUUID: device this
// dbName - name of the database to remove
//
Meteor.publish('offlineSettingsByUser', function({userId, deviceUUID}) {
  if (userId) {
    const userIdInArray = Array.isArray(userId) ? userId : [userId];
    const query = {
      assignedToId: userIdInArray,
      deviceUUID: deviceUUID,
    };
    return Collection.offlineSettings.find({$or: [query, {assignedToId: 'all'}], isDeleted: false, readBy: {$nin: userId}});
  }
  this.stop();
});
