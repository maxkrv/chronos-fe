import { User } from '../modules/user/user.interface';

export const users: User[] = [
  {
    id: 1,
    name: 'Alice',
    surname: 'Johnson',
    email: 'alice.johnson@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    isActive: true
  },
  {
    id: 2,
    name: 'Bob',
    surname: 'Smith',
    email: 'bob.smith@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    isActive: false
  },
  {
    id: 3,
    name: 'Charlie',
    surname: 'Davis',
    email: 'charlie.davis@example.com',
    avatarUrl: null,
    isActive: true
  },
  {
    id: 4,
    name: 'Diana',
    surname: 'Evans',
    email: 'diana.evans@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    isActive: false
  },
  {
    id: 5,
    name: 'Ethan',
    surname: 'Miller',
    email: 'ethan.miller@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    isActive: true
  }
];
