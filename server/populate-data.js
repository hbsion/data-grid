import { Collection } from 'meteor/tapfuse:collection-global';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

import faker from 'faker';

const compact = arr => arr.filter(Boolean);

Collection.Tickets = new Mongo.Collection('tickets');
Collection.PeopleGroups = new Mongo.Collection('PeopleGroups');


const names = ['Billi', 'Breana', 'Marisha', 'Zella', 'Markita', 'Macie', 'Annmarie', 'Corrine', 'Georgine', 'Eddie', 'Christeen', 'Rhoda', 'Yuonne', 'Shannan', 'Fawn', 'Merna', 'Bernarda', 'Glenna', 'Hana', 'Rebbeca', 'Denita', 'Lettie', 'Sergio', 'Brady', 'Herbert', 'Ines', 'Tara', 'Sierra', 'Aide', 'Lasandra', 'Grazyna', 'Jesusita', 'Felicia', 'Allen', 'Bernadine', 'Lura', 'Myong', 'James', 'Elmer', 'Shara', 'Claretha', 'Chi', 'Jin', 'Marta', 'Eric', 'Akilah', 'Kaye', 'Melinda', 'Madalyn', 'Viola'];
const comanies = ['IBM', 'DELL', 'Apple', 'Sony', 'Microsoft', 'Nokia', 'Samsung', 'Hitachi'];
const positions = ['CEO', 'CTO', 'CFO', 'Worker', 'Enginner', 'Developer', 'Sales Manager', 'Sales person', 'Idiot', 'Accountant', 'General Manager', 'Senior Developer', 'Junior Developer', 'Sys admin', 'Consultant'];
const labelArray  = ['', 'moderator', '', 'judge'];
const infoLabels  = ['', '', '', 'warning', '', 'duplicate', '', ''];
const groups  = ['', '', '', 'speakers', '', '', 'attendees', ''];
const groups2  = ['', '', '', 'judges', '', '', '', '', '', '', '', ''];

Meteor.startup(function() {
  if (!Collection.PeopleGroups.find().count()) {
    Collection.PeopleGroups.insert({
      groupName: 'speakers',
      appId: '1248hdi1bqwe2124',
      isDeleted: false,
      updatedAt: Date.now(),
    });
    Collection.PeopleGroups.insert({
      groupName: 'attendees',
      appId: '1248hdi1bqwe2124',
      isDeleted: false,
      updatedAt: Date.now(),
    });
    Collection.PeopleGroups.insert({
      groupName: 'moderators',
      appId: '1248hdi1bqwe2124',
      isDeleted: false,
      updatedAt: Date.now(),
    });
  }
})

Meteor.methods({
  populateData(docNumbers = 1) {
    for (let i = 0; i < docNumbers; i++) {
      const label = Random.choice(labelArray);
      const infoLabel = Random.choice(infoLabels);
      const inGroups = compact([Random.choice(groups), Random.choice(groups2)]);
      const profile = {
        index: i,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        company: faker.company.companyName(),
        position: faker.name.jobTitle(),
        picture: faker.image.avatar(),
        email: faker.internet.email(),
        roles: {
          role2: true,
        },
        isDeleted: false,
        appId: '1248hdi1bqwe2124',
        updatedAt: Date.now(),
        inGroups: inGroups,
        labels: label ? [label] : [],
        infoLabels: infoLabel ? [infoLabel] : [],
      };
      profile.fullName = `${profile.firstName} ${profile.lastName}`;
      profile.name = `${profile.firstName} ${profile.lastName}`;
      Collection.Tickets.insert(profile);
    }
    // return ;
  },
});
