import { FaRegCalendarAlt } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';
import { SlEnvolopeLetter } from 'react-icons/sl';
import { Link, useLocation } from 'react-router-dom';

import { useInvitationData } from '@/modules/invitation/hooks/use-invitation';

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
    icon: <SlEnvolopeLetter />,
    path: '/invitation'
  }
];

export const Navbar = () => {
  const { pathname } = useLocation();
  const { hasInvitations } = useInvitationData();

  return (
    <nav className="flex flex-col gap-2 mx-1">
      {ITEMS.map((item, index) => (
        <Link to={item.path} key={index}>
          <Button variant={pathname === item.path ? 'default' : 'ghost'} className="relative" size="icon">
            {item.path === '/invitation' && hasInvitations && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-red-600" />
              </span>
            )}
            {item.icon}
          </Button>
        </Link>
      ))}
    </nav>
  );
};
