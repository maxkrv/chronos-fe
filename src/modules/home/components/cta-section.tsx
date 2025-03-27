import { FaArrowRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

import { isLoggedIn } from '../../../shared/lib/utils';
import { ScrollReveal } from './scroll-reveal';

export const CTASection = () => {
  const isUserLoggedIn = isLoggedIn();
  const nav = useNavigate();

  return (
    <section className="w-full h-screen py-12 md:py-24 lg:py-32 grid snap-start snap-always relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-background to-primary/10 animate-gradient-slow"></div>

      {/* Floating elements */}
      <div className="absolute w-20 h-20 rounded-full bg-primary/10 top-1/4 left-1/4 animate-pulse"></div>
      <div className="absolute w-16 h-16 rounded-full bg-primary/5 bottom-1/4 right-1/4  animate-pulse animation-delay-1000"></div>
      <div className="absolute w-24 h-24 rounded-full bg-primary/10 top-1/3 right-1/3  animate-pulse animation-delay-2000"></div>

      <div className="@container flex flex-col items-center justify-center gap-4 px-4 text-center md:px-6 relative z-10">
        <ScrollReveal direction="up">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Ready to take control of your schedule?
            </h2>
            <p className="mx-auto max-w-lg text-muted-foreground md:text-xl/relaxed">
              Join thousands of users who have transformed how they manage their time.
            </p>
          </div>
        </ScrollReveal>
        {!isUserLoggedIn && (
          <ScrollReveal direction="up" delay={300}>
            <div className="mx-auto flex gap-2 flex-row items-center justify-center">
              <Button
                size="lg"
                variant="outline"
                className="transition-all duration-300 hover:bg-primary/10 hover:border-primary"
                onClick={() => nav('/login')}>
                Login
              </Button>
              <Button
                size="lg"
                className="gap-1 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                onClick={() => nav('/sign-up')}>
                Register
                <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
