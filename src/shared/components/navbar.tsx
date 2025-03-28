import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdOutlinePublic, MdSpaceDashboard } from 'react-icons/md';
import { Link, useLocation } from 'react-router-dom';

import { Button } from './ui/button';

const ITEMS = [
  {
    icon: <MdSpaceDashboard />,
    path: '/dashboard'
  },
  {
    icon: <FaRegCalendarAlt />,
    path: '/calendar'
  },
  {
    icon: <MdOutlinePublic />,
    path: '/public-calendars'
  }
];

export const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-2 mx-1">
      {ITEMS.map((item, index) => (
        <Link to={item.path} key={index}>
          <Button variant={pathname === item.path ? 'default' : 'ghost'} className="relative" size="icon">
            {item.icon}
          </Button>
        </Link>
      ))}
    </nav>
  );
};
