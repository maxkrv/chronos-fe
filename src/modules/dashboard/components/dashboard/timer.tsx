import { useEffect, useRef, useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';
import { FaSquare } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa6';

import { Button } from '../../../../shared/components/ui/button';

export default function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
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

  return (
    <div className="flex flex-col items-center p-4 bg-primary rounded-3xl  shadow-lg min-w-fit h-full justify-center">
      <h2 className="text-lg font-semibold mb-2 text-muted-foreground">Stopwatch</h2>
      <div className="text-4xl font-mono mb-4 text-primary-foreground">{formatTime(time)}</div>
      <div className="flex gap-2">
        <Button
          size={'icon'}
          variant={'link'}
          onClick={() => setIsRunning(!isRunning)}
          className="rounded-full text-primary bg-primary-foreground">
          {isRunning ? <FaPause /> : <BiSolidRightArrow />}
        </Button>
        <Button
          variant="destructive"
          size={'icon'}
          className="rounded-full"
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}>
          <FaSquare />
        </Button>
      </div>
    </div>
  );
}
