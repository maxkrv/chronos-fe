import { FaRegCalendarAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import { Button } from './ui/button';

const ITEMS = [
  {
    icon: <FaRegCalendarAlt />,
    path: '/calendar'
  }
];

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      {ITEMS.map((item, index) => (
        <Link to={item.path} key={index}>
          <Button variant={pathname === item.path ? 'default' : 'ghost'}>{item.icon}</Button>
        </Link>
      ))}
    </nav>
  );
};
