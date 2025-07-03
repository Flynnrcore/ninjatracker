export const mockUser = { id: 1, name: 'Test', email: 'test@mail.com' };

export const mockContext = {
  user: mockUser,
  setUser: () => {},
  csrfToken: 'test-csrf-token',
  loading: false,
  dataRefreshTrigger: 0,
  refreshData: () => {},
};
