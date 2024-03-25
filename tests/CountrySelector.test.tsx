import React from 'react';
import renderer from 'react-test-renderer';
import { expect, it } from 'vitest';
import {
  CountrySelector,
  CountrySelectItem,
} from '../src/organisms/country-selector/country-selector';

it('renders correctly', () => {
  const defaults: CountrySelectItem = {
    label: '',
    rtl: false,
    value: '',
  };
  const tree = renderer
    .create(<CountrySelector menuAlign="end" defaultValue={defaults} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
