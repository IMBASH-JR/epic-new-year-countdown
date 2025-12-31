import { useEffect, useState } from 'react';
import { Sparkles, PartyPopper, Star } from 'lucide-react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  size: number;
}

const Celebration = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(320, 100%, 60%)',
      'hsl(185, 100%, 55%)',
      'hsl(45, 100%, 55%)',
      'hsl(270, 100%, 65%)',
      'hsl(0, 100%, 60%)',
      'hsl(120, 100%, 50%)',
      'hsl(60, 100%, 50%)',
    ];

    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        size: Math.random() * 12 + 6,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      {/* Confetti */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="particle"
            style={{
              width: piece.size,
              height: piece.size,
              left: `${piece.left}%`,
              background: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: '4s',
              boxShadow: `0 0 ${piece.size}px ${piece.color}`,
              borderRadius: Math.random() > 0.5 ? '50%' : '0',
            }}
          />
        ))}
      </div>

      {/* Main celebration content */}
      <div className="relative z-20">
        <div className="flex items-center justify-center gap-4 mb-6">
          <PartyPopper className="w-12 h-12 md:w-16 md:h-16 text-neon-gold animate-bounce" />
          <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-neon-pink animate-pulse" />
          <Star className="w-12 h-12 md:w-16 md:h-16 text-neon-cyan animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-black gradient-text celebration-text mb-6">
          HAPPY
        </h1>
        <h1 className="font-display text-5xl md:text-7xl lg:text-9xl font-black gradient-text celebration-text mb-6">
          NEW YEAR!
        </h1>

        <p className="text-xl md:text-3xl lg:text-4xl font-display glow-gold text-neon-gold mt-8">
          {new Date().getFullYear()}
        </p>

        <p className="text-muted-foreground text-lg md:text-xl mt-8 max-w-md mx-auto">
          Wishing you a year filled with joy, success, and wonderful moments! 🎉
        </p>

        <div className="flex items-center justify-center gap-2 mt-6">
          <Sparkles className="w-6 h-6 text-neon-purple animate-sparkle" />
          <Sparkles className="w-6 h-6 text-neon-pink animate-sparkle" style={{ animationDelay: '0.3s' }} />
          <Sparkles className="w-6 h-6 text-neon-cyan animate-sparkle" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </div>
  );
};

export default Celebration;
