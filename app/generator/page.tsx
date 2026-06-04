'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  Settings2,
  Shield,
  Zap
} from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { GlassCard } from '@/components/glass-card'
import { StrengthMeter } from '@/components/strength-meter'
import { generateSecurePassword, analyzePassword } from '@/lib/password-analyzer'
import { cn } from '@/lib/utils'

interface GeneratedPassword {
  id: string
  password: string
}

export default function GeneratorPage() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [generatedPasswords, setGeneratedPasswords] = useState<GeneratedPassword[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = useCallback(() => {
    const newPasswords: GeneratedPassword[] = []
    for (let i = 0; i < 4; i++) {
      newPasswords.push({
        id: `${Date.now()}-${i}`,
        password: generateSecurePassword({
          length,
          includeUppercase,
          includeLowercase,
          includeNumbers,
          includeSymbols,
        }),
      })
    }
    setGeneratedPasswords(newPasswords)
    setCopiedId(null)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const handleCopy = useCallback(async (id: string, password: string) => {
    await navigator.clipboard.writeText(password)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  const currentAnalysis = generatedPasswords[0] 
    ? analyzePassword(generatedPasswords[0].password) 
    : null

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
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Password Generator</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Generate Secure Passwords
          </h1>
          <p className="mt-3 text-muted-foreground">
            Create cryptographically secure passwords with customizable options
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <GlassCard glow glowColor="primary">
              <div className="mb-6 flex items-center gap-2">
                <Settings2 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Configuration</h3>
              </div>

              {/* Length Slider */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Password Length</label>
                  <span className="rounded-md bg-primary/10 px-2 py-1 font-mono text-sm font-bold text-primary">
                    {length}
                  </span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={64}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>8</span>
                  <span>64</span>
                </div>
              </div>

              {/* Character Options */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-foreground">Include Characters</label>
                
                <ToggleOption
                  label="Uppercase (A-Z)"
                  checked={includeUppercase}
                  onChange={setIncludeUppercase}
                />
                <ToggleOption
                  label="Lowercase (a-z)"
                  checked={includeLowercase}
                  onChange={setIncludeLowercase}
                />
                <ToggleOption
                  label="Numbers (0-9)"
                  checked={includeNumbers}
                  onChange={setIncludeNumbers}
                />
                <ToggleOption
                  label="Symbols (!@#$%)"
                  checked={includeSymbols}
                  onChange={setIncludeSymbols}
                />
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <RefreshCw className="h-5 w-5" />
                Generate Passwords
              </motion.button>

              {/* Info */}
              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Cryptographically Secure</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Uses crypto.getRandomValues() for true randomness. Never uses Math.random().
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Generated Passwords */}
          <div className="space-y-6 lg:col-span-2">
            {/* Strength Preview */}
            {currentAnalysis && (
              <GlassCard>
                <div className="mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Password Strength Preview</h3>
                </div>
                <StrengthMeter analysis={currentAnalysis} />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Entropy</p>
                    <p className="font-mono text-lg font-bold text-primary">{currentAnalysis.entropy} bits</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Crack Time</p>
                    <p className="font-mono text-lg font-bold text-success">{currentAnalysis.crackTime}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3 text-center">
                    <p className="text-xs text-muted-foreground">Score</p>
                    <p className="font-mono text-lg font-bold text-foreground">{currentAnalysis.score}/100</p>
                  </div>
                </div>
              </GlassCard>
            )}

            {/* Password Cards */}
            <GlassCard>
              <div className="mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">Generated Passwords</h3>
              </div>

              <AnimatePresence mode="popLayout">
                {generatedPasswords.length > 0 ? (
                  <div className="space-y-3">
                    {generatedPasswords.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-sm font-bold text-primary">
                          {index + 1}
                        </div>
                        <code className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-foreground">
                          {item.password}
                        </code>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCopy(item.id, item.password)}
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                            copiedId === item.id
                              ? 'bg-success/20 text-success'
                              : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                          )}
                        >
                          {copiedId === item.id ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 rounded-full bg-muted p-4">
                      <Sparkles className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Click the generate button to create secure passwords
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </GlassCard>

            {/* Tips */}
            <GlassCard>
              <h3 className="mb-4 font-semibold text-foreground">Password Best Practices</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { title: 'Use 16+ characters', desc: 'Longer passwords are exponentially harder to crack' },
                  { title: 'Mix character types', desc: 'Combine uppercase, lowercase, numbers, and symbols' },
                  { title: 'Avoid patterns', desc: 'Do not use keyboard patterns or sequential characters' },
                  { title: 'Unique per account', desc: 'Never reuse passwords across different services' },
                ].map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 rounded-lg bg-muted/30 p-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{tip.title}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
    </div>
  )
}

function ToggleOption({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string
  checked: boolean
  onChange: (checked: boolean) => void 
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg bg-muted/50 p-3">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 rounded-full transition-colors',
          checked ? 'bg-primary' : 'bg-muted'
        )}
      >
        <span
          className={cn(
            'absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform',
            checked && 'translate-x-5'
          )}
        />
      </button>
    </label>
  )
}
