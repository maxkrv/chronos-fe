import { FaShareAlt } from 'react-icons/fa';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';
import { LuCalendarClock } from 'react-icons/lu';
import { MdDashboard, MdEvent, MdPublic } from 'react-icons/md';
import { TbDeviceDesktopHeart } from 'react-icons/tb';

import { FeatureCard } from './feature-card';
import { ScrollReveal } from './scroll-reveal';

const features = [
  {
    icon: LuCalendarClock,
    title: 'Smart Calendar Management',
    description: 'Organize your schedule with daily, weekly, monthly, and yearly views for complete time management.'
  },
  {
    icon: MdEvent,
    title: 'Event Categories',
    description: 'Categorize events as tasks, arrangements, reminders, or occasions for better organization.'
  },
  {
    icon: FaShareAlt,
    title: 'Calendar Sharing',
    description: 'Share your calendars with friends, family, or colleagues and manage permissions easily.'
  },
  {
    icon: MdPublic,
    title: 'Public Calendars',
    description: 'Discover and subscribe to public calendars for holidays, events, and more.'
  },
  {
    icon: MdDashboard,
    title: 'Interactive Dashboard',
    description: 'Get insights into your schedule with visual analytics and event distribution charts.'
  },
  {
    icon: FaCalendarDays,
    title: 'Holiday Integration',
    description: 'Automatically import holidays for your country into your calendar.'
  },
  {
    icon: TbDeviceDesktopHeart,
    title: 'Cross-Platform Sync',
    description: 'Access your calendar from any device with real-time synchronization.'
  },
  {
    icon: IoIosSettings,
    title: 'Customizable Interface',
    description: 'Personalize your calendar with color coding, themes, and layout options.'
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

        <div className="mx-auto grid max-w-7xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
