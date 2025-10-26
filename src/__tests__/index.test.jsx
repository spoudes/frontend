import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { expect, test } from '@jest/globals';
import { App } from '../components/app/app';

test('renders home page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByText(/Linker/i)).toBeInTheDocument();
});
