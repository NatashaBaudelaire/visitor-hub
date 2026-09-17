import { describe, it, expect, vi } from 'vitest';
import { render, renderHook, act } from '@testing-library/react';
import { UserProvider } from './UserContext';
import { useUser } from './user-context';

describe('UserContext', () => {
  it('throws when useUser is used outside of a provider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const Broken = () => {
      useUser();
      return null;
    };

    expect(() => render(<Broken />)).toThrow('useUser must be used within a UserProvider');
    errorSpy.mockRestore();
  });

  it('exposes the initial user data', () => {
    const { result } = renderHook(() => useUser(), { wrapper: UserProvider });

    expect(result.current.userData).toEqual({ name: '', email: '' });
  });

  it('merges new data into the user state', () => {
    const { result } = renderHook(() => useUser(), { wrapper: UserProvider });

    act(() => {
      result.current.updateUserData({ name: 'Ada Lovelace', email: 'ada@accenture.com' });
    });

    expect(result.current.userData).toEqual({ name: 'Ada Lovelace', email: 'ada@accenture.com' });
  });
});
