import Countdown from '@/components/Countdown';
import ParticleField from '@/components/Particle';

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <ParticleField />
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/5 via-transparent to-neon-cyan/5 pointer-events-none" />
      
      {/* Main content */}
      <main className="relative z-10 w-full max-w-6xl mx-auto py-8">
        <Countdown />
      </main>
      
      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center">
        <p className="text-muted-foreground text-sm">
          🎆 Synced to your local time 🎆
        </p>
      </footer>
    </div>
  );
};

export default Index;
