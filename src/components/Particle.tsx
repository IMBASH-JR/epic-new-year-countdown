import { useEffect, useState } from 'react';

interface ParticleProps {
  color: string;
  delay: number;
  size: number;
  left: number;
  duration: number;
}

const Particle = ({ color, delay, size, left, duration }: ParticleProps) => {
  return (
    <div
      className="particle"
      style={{
        width: size,
        height: size,
        left: `${left}%`,
        background: color,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        boxShadow: `0 0 ${size * 2}px ${color}`,
      }}
    />
  );
};

const ParticleField = () => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  useEffect(() => {
    const colors = [
      'hsl(320, 100%, 60%)',
      'hsl(185, 100%, 55%)',
      'hsl(45, 100%, 55%)',
      'hsl(270, 100%, 65%)',
      'hsl(0, 100%, 60%)',
      'hsl(120, 100%, 50%)',
    ];

    const generatedParticles: ParticleProps[] = [];
    for (let i = 0; i < 50; i++) {
      generatedParticles.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 10,
        size: Math.random() * 8 + 4,
        left: Math.random() * 100,
        duration: Math.random() * 8 + 6,
      });
    }
    setParticles(generatedParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle, index) => (
        <Particle key={index} {...particle} />
      ))}
    </div>
  );
};

export default ParticleField;
