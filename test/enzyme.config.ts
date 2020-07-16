require('raf/polyfill');
require('jest-localstorage-mock');

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/* eslint @typescript-eslint/no-unsafe-assignment: 0 */
global.fetch = require('jest-fetch-mock');
