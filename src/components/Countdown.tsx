import { useState, useEffect } from 'react';
import CountdownUnit from './CountdownUnit';
import Celebration from './Celebration';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);
      
      const difference = newYear.getTime() - now.getTime();

      if (difference <= 0) {
        setIsNewYear(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isNewYear) {
    return <Celebration />;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      {/* Title */}
      <h1 className="font-display text-3xl md:text-5xl lg:text-7xl font-black gradient-text mb-4">
        NEW YEAR COUNTDOWN
      </h1>
      
      <p className="text-muted-foreground text-lg md:text-xl mb-8 md:mb-12">
        Until {new Date().getFullYear() + 1} arrives
      </p>

      {/* Countdown Cards */}
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
        <CountdownUnit value={timeLeft.days} label="Days" glowClass="glow-pink text-neon-pink" />
        
        <span className="font-display text-4xl md:text-6xl lg:text-8xl text-muted-foreground animate-pulse">:</span>
        
        <CountdownUnit value={timeLeft.hours} label="Hours" glowClass="glow-cyan text-neon-cyan" />
        
        <span className="font-display text-4xl md:text-6xl lg:text-8xl text-muted-foreground animate-pulse hidden md:block">:</span>
        
        <CountdownUnit value={timeLeft.minutes} label="Minutes" glowClass="glow-gold text-neon-gold" />
        
        <span className="font-display text-4xl md:text-6xl lg:text-8xl text-muted-foreground animate-pulse hidden md:block">:</span>
        
        <CountdownUnit value={timeLeft.seconds} label="Seconds" glowClass="glow-purple text-neon-purple" />
      </div>

      {/* Motivational text */}
      <p className="text-muted-foreground text-sm md:text-base mt-8 md:mt-12 max-w-md">
        Make every second count. The new year brings new beginnings! ✨
      </p>
    </div>
  );
};

export default Countdown;
