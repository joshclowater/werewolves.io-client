import React from 'react';
import { shallow } from 'enzyme';
import App from '../';

it('renders correctly', () => {
  expect(shallow(<App />)).toMatchSnapshot();
});
