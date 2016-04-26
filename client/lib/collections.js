import { Mongo } from 'meteor/mongo';
import { Collection } from 'meteor/tapfuse:collection-global';
import { Session } from 'meteor/session';

Session.setDefault('active_APP', '1248hdi1bqwe2124');

global.Collection = Collection;
Collection.Tickets = new Mongo.Collection('tickets');
Collection.offlineTickets = new offLineCollection.Collection('offlineTickets', {connection: null, initialSubcribe: 'ticket-list-all', updateSubscribe: 'ticket-list-update', externalCollection: 'Tickets', session: 'active_APP', sessionField: 'appId'});
