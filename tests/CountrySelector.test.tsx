import React from 'react';
import renderer from 'react-test-renderer';
import { expect, it } from 'vitest';
import {
  CountrySelectItem,
  CountrySelector,
} from '../src/organisms/country-selector';

it('renders correctly', () => {
  const defaults: CountrySelectItem = {
    label: '',
    rtl: false,
    value: '',
  };
  const tree = renderer
    .create(
      <CountrySelector
        direction="rtl"
        menuAlign="end"
        defaultValue={defaults}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
