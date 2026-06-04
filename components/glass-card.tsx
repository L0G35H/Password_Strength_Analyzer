'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  glowColor?: string
}

export function GlassCard({ children, className, glow = false, glowColor = 'primary' }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative overflow-hidden rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm',
        glow && 'shadow-lg',
        className
      )}
    >
      {glow && (
        <div
          className={cn(
            'pointer-events-none absolute -inset-px rounded-xl opacity-20',
            glowColor === 'primary' && 'bg-gradient-to-br from-primary/50 to-transparent',
            glowColor === 'success' && 'bg-gradient-to-br from-success/50 to-transparent',
            glowColor === 'warning' && 'bg-gradient-to-br from-warning/50 to-transparent',
            glowColor === 'destructive' && 'bg-gradient-to-br from-destructive/50 to-transparent'
          )}
        />
      )}
      {children}
    </motion.div>
  )
}
