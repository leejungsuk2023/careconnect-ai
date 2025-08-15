import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface CountUpAnimationProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  format?: boolean;
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  format = false,
}) => {
  const spring = useSpring(0, { 
    damping: 30,
    stiffness: 100,
    duration: duration * 1000,
  });
  
  const display = useTransform(spring, (current) => {
    const rounded = decimals > 0 
      ? current.toFixed(decimals)
      : Math.round(current);
    
    if (format && typeof rounded === 'number') {
      return new Intl.NumberFormat('ko-KR').format(rounded);
    }
    
    return rounded.toString();
  });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default CountUpAnimation;