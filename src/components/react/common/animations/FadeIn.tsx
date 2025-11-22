import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-200px" }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
};
