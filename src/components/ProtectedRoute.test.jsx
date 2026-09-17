import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/user-context';
import ProtectedRoute from './ProtectedRoute';

const renderAt = (email) =>
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <UserContext.Provider value={{ userData: { email }, updateUserData: () => {} }}>
        <Routes>
          <Route path="/" element={<div>Public home</div>} />
          <Route
            path="/profile"
            element={(
              <ProtectedRoute>
                <div>Protected content</div>
              </ProtectedRoute>
            )}
          />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  );

describe('ProtectedRoute', () => {
  it('renders the children when the user is authenticated', () => {
    renderAt('visitor@accenture.com');

    expect(screen.getByText('Protected content')).toBeInTheDocument();
    expect(screen.queryByText('Public home')).not.toBeInTheDocument();
  });

  it('redirects to the login page when there is no email', () => {
    renderAt('');

    expect(screen.getByText('Public home')).toBeInTheDocument();
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument();
  });

  it('treats a whitespace-only email as unauthenticated', () => {
    renderAt('   ');

    expect(screen.getByText('Public home')).toBeInTheDocument();
  });
});
