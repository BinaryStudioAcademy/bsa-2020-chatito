const users = [{
  id: '1',
  name: 'Alik'
}, {
  id: '2',
  name: 'Petr'
}];

export const getUsers = () => Promise.resolve(users);

export const getUserById = (id: string) => Promise.resolve(users.find(u => u.id === id));
