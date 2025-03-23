'use client';

import { useEffect, useRef, useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import { FaHistory, FaSquare } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa6';

import { Button } from '../../../../shared/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../../../shared/components/ui/tooltip';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const addLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [...prevLaps, time]);
    }
  };

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-primary rounded-3xl shadow-lg min-w-fit h-full justify-between">
      <h2 className="text-lg font-semibold mb-2 text-muted-foreground">Stopwatch</h2>
      <div className="text-5xl font-mono mb-4 text-primary-foreground transition-all">{formatTime(time)}</div>
      <div className="flex gap-2 mb-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size={'icon'}
                variant={'link'}
                onClick={() => setIsRunning(!isRunning)}
                className="rounded-full text-primary bg-primary-foreground hover:scale-110 transition-transform">
                {isRunning ? <FaPause /> : <BiSolidRightArrow />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isRunning ? 'Pause' : 'Start'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size={'icon'}
                className="rounded-full hover:scale-110 transition-transform"
                onClick={resetTimer}>
                <FaSquare />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size={'icon'}
                className="rounded-full hover:scale-110 transition-transform"
                onClick={addLap}
                disabled={!isRunning}>
                <FaHistory />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Lap</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {laps.length > 0 && (
        <div className="w-full overflow-auto max-h-24 text-primary-foreground">
          <h3 className="text-sm font-semibold mb-1">Laps</h3>
          <ul className="space-y-1">
            {laps.map((lap, index) => (
              <li key={index} className="text-sm flex justify-between">
                <span>Lap {index + 1}</span>
                <span>{formatTime(lap)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
