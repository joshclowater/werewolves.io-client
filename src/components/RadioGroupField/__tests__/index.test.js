import React from 'react';
import { shallow } from 'enzyme';
import RadioGroupField, { RenderField } from '../';

it('RadioGroupField renders correctly', () => {
  expect(shallow(<RadioGroupField anyProp="mock prop" />)).toMatchSnapshot();
});

it('RenderField renders correctly', () => {
  expect(
    shallow(
      <RenderField
        input={{ name: 'mockName', value: 'mock value' }}
        options={['mock value', 'mock value 2']}
        meta={{
          touched: true,
          error: 'mock error',
          warning: 'mock warning',
          submitting: true
        }}
      />
    )
  ).toMatchSnapshot();
});
