interface CountdownUnitProps {
  value: number;
  label: string;
  glowClass: string;
}

const CountdownUnit = ({ value, label, glowClass }: CountdownUnitProps) => {
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="countdown-card flex flex-col items-center justify-center min-w-[80px] md:min-w-[140px] lg:min-w-[180px]">
      <span
        className={`font-display text-4xl md:text-6xl lg:text-8xl font-black ${glowClass} animate-pulse-glow`}
      >
        {formattedValue}
      </span>
      <span className="text-muted-foreground text-xs md:text-sm lg:text-base uppercase tracking-widest mt-2">
        {label}
      </span>
    </div>
  );
};

export default CountdownUnit;
