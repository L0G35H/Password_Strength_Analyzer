'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { PasswordAnalysis } from '@/lib/password-analyzer'

interface StrengthMeterProps {
  analysis: PasswordAnalysis
  showLabel?: boolean
}

const strengthColors = {
  'Very Weak': 'bg-destructive',
  'Weak': 'bg-orange-500',
  'Medium': 'bg-warning',
  'Strong': 'bg-chart-2',
  'Very Strong': 'bg-success',
}

const strengthGlowColors = {
  'Very Weak': 'shadow-destructive/50',
  'Weak': 'shadow-orange-500/50',
  'Medium': 'shadow-warning/50',
  'Strong': 'shadow-chart-2/50',
  'Very Strong': 'shadow-success/50',
}

export function StrengthMeter({ analysis, showLabel = true }: StrengthMeterProps) {
  const { score, strength } = analysis

  return (
    <div className="space-y-3">
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Password Strength</span>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                'rounded-md px-2 py-1 text-xs font-bold',
                strength === 'Very Weak' && 'bg-destructive/20 text-destructive',
                strength === 'Weak' && 'bg-orange-500/20 text-orange-500',
                strength === 'Medium' && 'bg-warning/20 text-warning',
                strength === 'Strong' && 'bg-chart-2/20 text-chart-2',
                strength === 'Very Strong' && 'bg-success/20 text-success'
              )}
            >
              {strength}
            </span>
            <span className="font-mono text-sm font-bold text-foreground">{score}/100</span>
          </div>
        </div>
      )}
      <div className="relative h-3 overflow-hidden rounded-full bg-muted">
        <motion.div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full shadow-lg',
            strengthColors[strength],
            strengthGlowColors[strength]
          )}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Animated glow effect */}
        <motion.div
          className={cn(
            'absolute inset-y-0 left-0 rounded-full blur-sm',
            strengthColors[strength]
          )}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: `${score}%`, opacity: 0.5 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {/* Tick marks */}
      <div className="flex justify-between px-1">
        {[0, 25, 50, 75, 100].map((tick) => (
          <div key={tick} className="flex flex-col items-center">
            <div className={cn(
              'h-1 w-px',
              score >= tick ? strengthColors[strength] : 'bg-muted-foreground/30'
            )} />
            <span className="mt-1 text-[10px] text-muted-foreground">{tick}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
