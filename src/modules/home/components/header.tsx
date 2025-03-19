import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Button } from '@/shared/components/ui/button';

import { Logo } from '../../../assets/logos/logo';
import { isLoggedIn } from '../../../shared/lib/utils';
import { useAuth } from '../../../shared/store/auth.store';
import { useUserStore } from '../../../shared/store/user.store';
import { AuthService } from '../../auth/services/auth.service';

export enum LandingSection {
  HERO = 'hero',
  FEATURES = 'features',
  FAQ = 'faq',
  ABOUT = 'about'
}
const NavItem = [
  {
    id: LandingSection.FEATURES,
    title: 'Features'
  },
  {
    id: LandingSection.ABOUT,
    title: 'About'
  },
  {
    id: LandingSection.FAQ,
    title: 'FAQ'
  }
];

export const Header = () => {
  const [activeSection, setActiveSection] = useState<LandingSection>(LandingSection.HERO);
  const nav = useNavigate();
  const isUserLoggedIn = isLoggedIn();
  const { deleteTokens, tokens } = useAuth();
  const { setUser } = useUserStore();

  const { mutate } = useMutation({
    mutationFn: AuthService.logout
  });

  const handleLogout = () => {
    if (tokens?.refreshToken) {
      mutate(tokens.refreshToken);
    }
    nav('/');
    setUser(null);
    deleteTokens();
  };

  useEffect(() => {
    const handleScroll = () => {
      // Track active section
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = z
          .nativeEnum(LandingSection)
          .default(LandingSection.HERO)
          .safeParse(section.getAttribute('id'));

        if (sectionId.data && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId.data);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 max-h-16 w-full border-b backdrop-blur transition-all duration-300 px-4`}>
      <div className="@container flex h-16 items-center justify-between gap-4">
        <a
          href="#"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(LandingSection.HERO);
          }}>
          <Logo className="size-8" />
          <span className="text-xl font-bold">Chronos</span>
        </a>
        <nav className="flex items-center gap-2 sm:gap-4">
          {NavItem.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-sm max-md:hidden font-medium hover:underline underline-offset-4 transition-all duration-300 ${
                activeSection === item.id ? 'text-primary scale-105' : 'hover:text-primary/80'
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}>
              {item.title}
            </a>
          ))}
          <Button
            size="lg"
            variant="outline"
            className="transition-all duration-300 hover:border-primary max-sm:hidden"
            onClick={() => (isUserLoggedIn ? handleLogout() : nav('/login'))}>
            {isUserLoggedIn ? 'Logout' : 'Sigh In'}
          </Button>
          <Button
            size="lg"
            className="gap-1 rounded-full transition-all duration-300 hover:shadow-lg hover:bg-primary/90 hover:scale-105"
            onClick={() => (isUserLoggedIn ? nav('/dashboard') : nav('/sign-up'))}>
            {isUserLoggedIn ? 'Go to app' : 'Sign Up for Free'}
          </Button>
        </nav>
      </div>
    </header>
  );
};
