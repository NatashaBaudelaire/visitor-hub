import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import UserProfile from './index';

const renderProfile = (updateUserData) =>
  render(
    <MemoryRouter initialEntries={['/profile']}>
      <UserContext.Provider
        value={{ userData: { name: 'Ada Lovelace', email: 'ada@accenture.com' }, updateUserData }}
      >
        <Routes>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<div>Public home</div>} />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  );

describe('UserProfile', () => {
  it('renders the badge with the logged-in user data', () => {
    renderProfile(vi.fn());

    expect(screen.getByRole('heading', { name: /my digital badge/i })).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('ada@accenture.com')).toBeInTheDocument();
  });

  it('switches to the agenda tab', async () => {
    const user = userEvent.setup();
    renderProfile(vi.fn());

    await user.click(screen.getByRole('button', { name: /my agenda/i }));

    expect(screen.getByText(/personalized agenda/i)).toBeInTheDocument();
  });

  it('clears the session and redirects home on sign out', async () => {
    const user = userEvent.setup();
    const updateUserData = vi.fn();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    renderProfile(updateUserData);

    await user.click(screen.getByRole('button', { name: /sign out/i }));

    expect(updateUserData).toHaveBeenCalledWith({ name: '', email: '' });
    expect(await screen.findByText('Public home')).toBeInTheDocument();
  });

  it('keeps the session when sign out is cancelled', async () => {
    const user = userEvent.setup();
    const updateUserData = vi.fn();
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderProfile(updateUserData);

    await user.click(screen.getByRole('button', { name: /sign out/i }));

    expect(updateUserData).not.toHaveBeenCalled();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
  });
});
