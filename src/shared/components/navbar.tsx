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
    <nav className="mx-1">
      {ITEMS.map((item, index) => (
        <Link to={item.path} key={index}>
          <Button variant={pathname === item.path ? 'default' : 'ghost'} size="icon">
            {item.icon}
          </Button>
        </Link>
      ))}
    </nav>
  );
};
