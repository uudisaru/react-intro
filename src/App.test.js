import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders filter', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Filter/i);
  expect(linkElement).toBeInTheDocument();
});
