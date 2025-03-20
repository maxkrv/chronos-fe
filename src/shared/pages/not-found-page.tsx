import { ArrowLeft, Calendar, Clock, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/components/ui/button';

const formatDay = (date: Date) => date.getDate().toString().padStart(2, '0');

const formatTime = (date: Date) =>
  [
    date.getHours().toString().padStart(2, '0'),
    date.getMinutes().toString().padStart(2, '0'),
    date.getSeconds().toString().padStart(2, '0')
  ].join(':');

const AnimatedBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-primary/5 animate-gradient-slow" />
);

const FloatingCalendarElements = ({ randomDates }: { randomDates: Date[] }) => (
  <>
    {randomDates.map((date, i) => (
      <div
        key={i}
        className={`absolute rounded-lg border bg-background/80 backdrop-blur-sm shadow-md p-2 flex flex-col items-center justify-center animate-float ${i % 3 === 0 ? 'animation-delay-1000' : i % 3 === 1 ? 'animation-delay-2000' : ''}`}
        style={{
          width: `${Math.random() * 40 + 60}px`,
          height: `${Math.random() * 40 + 60}px`,
          top: `${Math.random() * 70 + 5}%`,
          left: `${Math.random() * 70 + 5}%`,
          zIndex: 0,
          opacity: 0.7,
          transform: `rotate(${Math.random() * 20 - 10}deg)`
        }}>
        <div className="text-xs font-bold">{date.toLocaleString('default', { month: 'short' })}</div>
        <div className="text-2xl font-bold">{formatDay(date)}</div>
      </div>
    ))}
  </>
);

const ErrorCard = ({ currentTime, onBackClick }: { currentTime: Date; onBackClick: () => void }) => (
  <div className="relative z-10 mx-auto max-w-xl px-4 py-8 text-center">
    <div className="mb-8 flex justify-center">
      <div className="relative">
        <div className="relative flex h-40 w-40 items-center justify-center rounded-xl border-4 border-primary bg-background shadow-xl">
          <div className="absolute top-0 left-0 right-0 bg-primary/10 text-center py-1">
            <span className="text-sm font-semibold">ERROR</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold text-primary animate-pulse-slow">404</span>
            <span className="text-sm text-muted-foreground mt-1">Page Not Found</span>
          </div>

          <X className="absolute top-2 right-2 h-4 w-4 text-muted-foreground" />

          {/* Clock display */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-4 py-1 rounded-full border shadow-md flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-sm font-mono">{formatTime(currentTime)}</span>
          </div>
        </div>

        {/* Calendar icon with animation */}
        <div className="absolute -top-6 -right-6 bg-background rounded-full p-3 border shadow-lg animate-pulse-slow">
          <Calendar className="h-8 w-8 text-primary" />
        </div>
      </div>
    </div>

    <h1 className="mb-4 text-3xl font-bold tracking-tight">Oops! This page doesn&apos;t exist</h1>
    <p className="mb-8 text-muted-foreground">
      The page you&apos;re looking for seems to have been lost in time. Maybe it&apos;s scheduled for a future release?
    </p>

    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/">
        <Button className="gap-2 transition-all duration-300 hover:scale-105 group w-full">
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Home
        </Button>
      </a>

      <Button variant="outline" className="transition-all duration-300 hover:border-primary" onClick={onBackClick}>
        Go Back
      </Button>
    </div>
  </div>
);

const AnimatedBlobs = () => (
  <>
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
  </>
);

const NotFoundPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [randomDates, setRandomDates] = useState<Date[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const dates = Array.from({ length: 8 }, () => {
      const date = new Date();
      date.setDate(date.getDate() + Math.floor(Math.random() * 60) - 30);
      return date;
    });
    setRandomDates(dates);

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-muted">
      <AnimatedBackground />
      <FloatingCalendarElements randomDates={randomDates} />
      <ErrorCard currentTime={currentTime} onBackClick={() => nav(-1)} />
      <AnimatedBlobs />
    </div>
  );
};

export default NotFoundPage;
