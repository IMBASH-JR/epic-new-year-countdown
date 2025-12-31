import { useEffect, useState } from 'react';

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  speed: number;
  color: string;
  size: number;
}

interface FireworkBurst {
  id: number;
  x: number;
  y: number;
  particles: FireworkParticle[];
  createdAt: number;
}

const COLORS = [
  'hsl(320, 100%, 60%)',
  'hsl(185, 100%, 55%)',
  'hsl(45, 100%, 55%)',
  'hsl(270, 100%, 65%)',
  'hsl(0, 100%, 60%)',
  'hsl(120, 100%, 50%)',
  'hsl(60, 100%, 50%)',
];

const createBurst = (id: number): FireworkBurst => {
  const x = 10 + Math.random() * 80;
  const y = 10 + Math.random() * 60;
  const particleCount = 20 + Math.floor(Math.random() * 15);
  const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];

  const particles: FireworkParticle[] = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      id: i,
      x: 0,
      y: 0,
      angle: (360 / particleCount) * i + Math.random() * 20,
      speed: 2 + Math.random() * 4,
      color: Math.random() > 0.3 ? baseColor : COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 3 + Math.random() * 4,
    });
  }

  return { id, x, y, particles, createdAt: Date.now() };
};

const Firework = () => {
  const [bursts, setBursts] = useState<FireworkBurst[]>([]);

  useEffect(() => {
    // Create initial bursts
    const initialBursts = [createBurst(0), createBurst(1), createBurst(2)];
    setBursts(initialBursts);

    let burstId = 3;
    const interval = setInterval(() => {
      setBursts(prev => {
        const now = Date.now();
        // Remove old bursts (older than 2 seconds)
        const filtered = prev.filter(b => now - b.createdAt < 2000);
        // Add new burst
        return [...filtered, createBurst(burstId++)];
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-30">
      {bursts.map(burst => (
        <div
          key={burst.id}
          className="absolute"
          style={{
            left: `${burst.x}%`,
            top: `${burst.y}%`,
          }}
        >
          {burst.particles.map(particle => (
            <div
              key={particle.id}
              className="firework-particle"
              style={{
                '--angle': `${particle.angle}deg`,
                '--speed': `${particle.speed * 30}px`,
                '--color': particle.color,
                '--size': `${particle.size}px`,
              } as React.CSSProperties}
            />
          ))}
          {/* Center flash */}
          <div className="firework-center" />
        </div>
      ))}
    </div>
  );
};

export default Firework;
