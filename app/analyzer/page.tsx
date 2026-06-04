'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  EyeOff, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  Lock,
  Key,
  Clock,
  Hash
} from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { GlassCard } from '@/components/glass-card'
import { StrengthMeter } from '@/components/strength-meter'
import { analyzePassword, type PasswordAnalysis } from '@/lib/password-analyzer'
import { cn } from '@/lib/utils'

function CharacterCheck({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-2">
      {checked ? (
        <CheckCircle2 className="h-4 w-4 text-success" />
      ) : (
        <XCircle className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={cn(
        'text-sm',
        checked ? 'text-foreground' : 'text-muted-foreground'
      )}>
        {label}
      </span>
    </div>
  )
}

function MetricCard({ 
  icon: Icon, 
  label, 
  value, 
  subtext,
  color = 'primary' 
}: { 
  icon: React.ElementType
  label: string
  value: string | number
  subtext?: string
  color?: 'primary' | 'success' | 'warning' | 'destructive'
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-4">
      <div className={cn(
        'rounded-lg p-2',
        color === 'primary' && 'bg-primary/10 text-primary',
        color === 'success' && 'bg-success/10 text-success',
        color === 'warning' && 'bg-warning/10 text-warning',
        color === 'destructive' && 'bg-destructive/10 text-destructive'
      )}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-mono text-lg font-bold text-foreground">{value}</p>
        {subtext && <p className="text-xs text-muted-foreground">{subtext}</p>}
      </div>
    </div>
  )
}

function getStrengthIcon(strength: PasswordAnalysis['strength']) {
  switch (strength) {
    case 'Very Weak':
    case 'Weak':
      return ShieldAlert
    case 'Medium':
      return Shield
    case 'Strong':
    case 'Very Strong':
      return ShieldCheck
    default:
      return Shield
  }
}

export default function AnalyzerPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const analysis = useMemo(() => analyzePassword(password), [password])
  const StrengthIcon = getStrengthIcon(analysis.strength)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <Key className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Password Analyzer</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Analyze Your Password Security
          </h1>
          <p className="mt-3 text-muted-foreground">
            Get real-time feedback on password strength, entropy, and security recommendations
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Input Section */}
          <div className="lg:col-span-2">
            <GlassCard glow glowColor={
              analysis.strength === 'Very Strong' || analysis.strength === 'Strong' 
                ? 'success' 
                : analysis.strength === 'Medium' 
                  ? 'warning' 
                  : 'destructive'
            }>
              {/* Password Input */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Enter Password to Analyze
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type your password here..."
                    className="h-14 w-full rounded-lg border border-border bg-input pl-12 pr-12 font-mono text-lg text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Strength Meter */}
              <StrengthMeter analysis={analysis} />

              {/* Character Composition */}
              <div className="mt-6">
                <h3 className="mb-3 text-sm font-medium text-foreground">Character Composition</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <CharacterCheck label="Lowercase (a-z)" checked={analysis.hasLowercase} />
                  <CharacterCheck label="Uppercase (A-Z)" checked={analysis.hasUppercase} />
                  <CharacterCheck label="Numbers (0-9)" checked={analysis.hasNumbers} />
                  <CharacterCheck label="Symbols (!@#)" checked={analysis.hasSymbols} />
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  icon={Hash}
                  label="Length"
                  value={analysis.length}
                  subtext="characters"
                  color="primary"
                />
                <MetricCard
                  icon={Zap}
                  label="Entropy"
                  value={`${analysis.entropy} bits`}
                  subtext="randomness"
                  color={analysis.entropy >= 60 ? 'success' : analysis.entropy >= 40 ? 'warning' : 'destructive'}
                />
                <MetricCard
                  icon={Clock}
                  label="Crack Time"
                  value={analysis.crackTime}
                  subtext="estimated"
                  color={
                    analysis.crackTime.includes('Century') || analysis.crackTime.includes('years')
                      ? 'success'
                      : analysis.crackTime.includes('month') || analysis.crackTime.includes('day')
                        ? 'warning'
                        : 'destructive'
                  }
                />
                <MetricCard
                  icon={StrengthIcon}
                  label="Rating"
                  value={analysis.strength}
                  color={
                    analysis.strength === 'Very Strong' || analysis.strength === 'Strong'
                      ? 'success'
                      : analysis.strength === 'Medium'
                        ? 'warning'
                        : 'destructive'
                  }
                />
              </div>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vulnerabilities */}
            <GlassCard>
              <div className="mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="font-semibold text-foreground">Vulnerabilities</h3>
              </div>
              <AnimatePresence mode="popLayout">
                {analysis.vulnerabilities.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.vulnerabilities.map((vulnerability, index) => (
                      <motion.li
                        key={vulnerability}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                        <span className="text-muted-foreground">{vulnerability}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-sm text-success"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    No vulnerabilities detected
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>

            {/* Suggestions */}
            <GlassCard>
              <div className="mb-4 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Suggestions</h3>
              </div>
              <AnimatePresence mode="popLayout">
                {analysis.suggestions.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion, index) => (
                      <motion.li
                        key={suggestion}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{suggestion}</span>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-sm text-success"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Your password meets all requirements
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>

            {/* Pattern Warnings */}
            <GlassCard>
              <div className="mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Pattern Detection</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Common Password</span>
                  <span className={cn(
                    'rounded-md px-2 py-0.5 text-xs font-medium',
                    analysis.isCommon 
                      ? 'bg-destructive/20 text-destructive' 
                      : 'bg-success/20 text-success'
                  )}>
                    {analysis.isCommon ? 'Detected' : 'Clear'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Repeated Characters</span>
                  <span className={cn(
                    'rounded-md px-2 py-0.5 text-xs font-medium',
                    analysis.hasRepeated 
                      ? 'bg-warning/20 text-warning' 
                      : 'bg-success/20 text-success'
                  )}>
                    {analysis.hasRepeated ? 'Detected' : 'Clear'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sequential Pattern</span>
                  <span className={cn(
                    'rounded-md px-2 py-0.5 text-xs font-medium',
                    analysis.hasSequential 
                      ? 'bg-warning/20 text-warning' 
                      : 'bg-success/20 text-success'
                  )}>
                    {analysis.hasSequential ? 'Detected' : 'Clear'}
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  )
}
