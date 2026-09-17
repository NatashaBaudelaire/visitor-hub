import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginViaCode from './LoginViaCode';
import { UserContext } from '../../context/user-context';
import { fakeValidateCode } from '../../services/authService';

vi.mock('../../services/authService', () => ({
  fakeSendCode: vi.fn(),
  fakeValidateCode: vi.fn(),
}));

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={['/login-code']}>
      <UserContext.Provider value={{ userData: { email: 'visitor@accenture.com' }, updateUserData: () => {} }}>
        <Routes>
          <Route path="/login-code" element={<LoginViaCode />} />
          <Route path="/loading" element={<div>Loading page</div>} />
        </Routes>
      </UserContext.Provider>
    </MemoryRouter>
  );

const typeCode = async (user, code) => {
  for (let i = 0; i < code.length; i += 1) {
    await user.type(screen.getByLabelText(`Digit ${i + 1}`), code[i]);
  }
};

const submit = async (user) => {
  await user.click(screen.getByRole('button', { name: /confirm code/i }));
};

describe('LoginViaCode', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('navigates to the loading page when the code is valid', async () => {
    fakeValidateCode.mockResolvedValue(true);
    const user = userEvent.setup();
    renderPage();

    await typeCode(user, '123456');
    await submit(user);

    expect(await screen.findByText('Loading page')).toBeInTheDocument();
    expect(fakeValidateCode).toHaveBeenCalledWith('visitor@accenture.com', '123456');
  });

  it('alerts and stays put when the code is incorrect', async () => {
    fakeValidateCode.mockResolvedValue(false);
    const user = userEvent.setup();
    renderPage();

    await typeCode(user, '000000');
    await submit(user);

    await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Incorrect code. Please try again.'));
    expect(screen.queryByText('Loading page')).not.toBeInTheDocument();
  });

  it('alerts when the code is incomplete', async () => {
    const user = userEvent.setup();
    renderPage();

    await typeCode(user, '12345');
    await submit(user);

    expect(window.alert).toHaveBeenCalledWith('Enter the complete code.');
    expect(fakeValidateCode).not.toHaveBeenCalled();
  });
});
