import { FaShareAlt } from 'react-icons/fa';
import { FaRegCircleCheck } from 'react-icons/fa6';
import { IoIosSettings } from 'react-icons/io';
import { LuAlarmClock, LuCalendarClock } from 'react-icons/lu';
import { TbDeviceDesktopHeart } from 'react-icons/tb';

import { FeatureCard } from './feature-card';
import { ScrollReveal } from './scroll-reveal';

const features = [
  {
    icon: LuCalendarClock,
    title: 'Smart Scheduling',
    description: 'Intelligent scheduling suggestions based on your availability and preferences.'
  },
  {
    icon: LuAlarmClock,
    title: 'Reminders & Alerts',
    description: 'Never miss an important event with customizable notifications.'
  },
  {
    icon: FaShareAlt,
    title: 'Seamless Sharing',
    description: 'Share your calendar with friends, family, or colleagues with just a few clicks.'
  },
  {
    icon: FaRegCircleCheck,
    title: 'Task Management',
    description: 'Integrate your to-do list with your calendar for complete productivity.'
  },
  {
    icon: TbDeviceDesktopHeart,
    title: 'Cross-Platform Sync',
    description: 'Access your calendar from any device with real-time synchronization.'
  },
  {
    icon: IoIosSettings,
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
