import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { isLoggedIn } from '../../../shared/lib/utils';
import { ScrollReveal } from './scroll-reveal';

export const HeroSection = () => {
  const nav = useNavigate();
  const isUserLoggedIn = isLoggedIn();

  return (
    <section
      id="hero"
      className="relative w-full h-screen py-12 md:py-20 lg:pt-16 lg:pb-24 flex snap-start snap-always overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient-x"></div>

      <img
        src="/placeholder.svg?height=550&width=550"
        alt="Calendar App Dashboard"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 animate-pulse-slow"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative container px-4 md:px-6 min-w-full my-auto z-10">
        <div className="flex flex-col justify-center space-y-4">
          <ScrollReveal delay={300} direction="down">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-center text-white">
                Organize your life with our free Calendar
              </h1>
              <p className="text-muted-foreground md:text-xl text-center">
                Seamlessly manage your schedule, set reminders, and never miss an important event again.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={600} direction="up">
            <div className="flex flex-col gap-2">
              <Button
                size="lg"
                className="gap-1 m-auto min-w-40 min-h-12 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                onClick={() => (isUserLoggedIn ? nav('/dashboard') : nav('/sign-up'))}>
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </section>
  );
};
