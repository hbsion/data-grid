import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
  react: '0.14.x',
  'react-addons-pure-render-mixin': '0.14.x',
}, 'react-meteor-data');

const createContainer = require('./createContainer.jsx').default;
const ReactMeteorData = require('./ReactMeteorData.jsx').default;

export { createContainer, ReactMeteorData };
