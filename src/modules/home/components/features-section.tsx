import { Calendar, CheckCircle, Clock, Users } from 'lucide-react';
import type React from 'react';

import { FeatureCard } from './feature-card';
import { ScrollReveal } from './scroll-reveal';

// SVG components for the features that use custom SVGs
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

// Feature data
const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Intelligent scheduling suggestions based on your availability and preferences.'
  },
  {
    icon: Clock,
    title: 'Reminders & Alerts',
    description: 'Never miss an important event with customizable notifications.'
  },
  {
    icon: Users,
    title: 'Seamless Sharing',
    description: 'Share your calendar with friends, family, or colleagues with just a few clicks.'
  },
  {
    icon: CheckCircle,
    title: 'Task Management',
    description: 'Integrate your to-do list with your calendar for complete productivity.'
  },
  {
    icon: CheckIcon,
    title: 'Cross-Platform Sync',
    description: 'Access your calendar from any device with real-time synchronization.'
  },
  {
    icon: SettingsIcon,
    title: 'Customizable Views',
    description: 'Personalize your calendar with daily, weekly, or monthly views to suit your needs.'
  }
];

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="w-full min-h-screen py-12 md:py-16 lg:py-20 bg-muted flex flex-col justify-center snap-start snap-always relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      <div className="@container px-4 md:px-6 space-y-8 relative z-10">
        <ScrollReveal className="flex flex-col items-center justify-center text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Powerful Calendar Features
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Everything you need to stay organized and productive in one simple app.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              delay={150 * (index + 1)}
              direction={index % 2 === 0 ? 'up' : 'down'}
              className="grow">
              <FeatureCard icon={feature.icon} title={feature.title} description={feature.description} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
