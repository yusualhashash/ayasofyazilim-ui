import React from 'react';
import renderer from 'react-test-renderer';
import { expect, it } from 'vitest';
import { CountrySelector } from '../src/organisms/country-selector';

it('renders correctly', () => {
  const tree = renderer
    .create(<CountrySelector menuAlign="end" defaultValue="tr" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
