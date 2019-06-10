require('raf/polyfill');
require('jest-localstorage-mock');

const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.fetch = require('jest-fetch-mock');
