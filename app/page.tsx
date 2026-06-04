'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Shield, 
  KeyRound, 
  Sparkles, 
  Zap, 
  Lock, 
  Eye, 
  ChevronRight,
  ShieldCheck,
  BarChart3,
  AlertTriangle
} from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { GlassCard } from '@/components/glass-card'

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Analysis',
    description: 'Get instant feedback as you type with live strength scoring and entropy calculation',
  },
  {
    icon: AlertTriangle,
    title: 'Vulnerability Detection',
    description: 'Identifies common passwords, sequential patterns, and repeated characters',
  },
  {
    icon: Zap,
    title: 'Entropy Calculator',
    description: 'Calculates password entropy and estimates time to crack with modern hardware',
  },
  {
    icon: Sparkles,
    title: 'Secure Generator',
    description: 'Generate cryptographically secure passwords using crypto.getRandomValues()',
  },
  {
    icon: Eye,
    title: 'Pattern Recognition',
    description: 'Detects keyboard patterns, dictionary words, and common substitutions',
  },
  {
    icon: ShieldCheck,
    title: 'Security Suggestions',
    description: 'Provides actionable recommendations to improve password strength',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <main className="relative">
        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-2 backdrop-blur-sm"
            >
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Cybersecurity Tool</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Password Strength
              <br />
              <span className="text-primary">Analyzer</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              Analyze password security in real-time, calculate entropy, detect vulnerabilities, 
              and generate cryptographically secure passwords with our professional cybersecurity tool.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/analyzer"
                className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                <KeyRound className="h-5 w-5" />
                Analyze Password
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/generator"
                className="group flex items-center gap-2 rounded-lg border border-border bg-card/50 px-6 py-3 font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
              >
                <Sparkles className="h-5 w-5" />
                Generate Password
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-16 max-w-3xl"
          >
            <GlassCard glow glowColor="primary" className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  <div className="h-14 flex-1 rounded-lg border border-border bg-input px-4 py-4">
                    <span className="font-mono text-muted-foreground">Enter your password...</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Password Strength</span>
                  <span className="rounded-md bg-success/20 px-2 py-0.5 text-xs font-bold text-success">Very Strong</span>
                </div>
                <div className="relative h-3 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-success shadow-lg shadow-success/50"
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1, delay: 0.8 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>25</span>
                  <span>50</span>
                  <span>75</span>
                  <span>100</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border/50 bg-card/30 py-20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                Comprehensive Security Analysis
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Our tool provides detailed analysis and recommendations to help you create 
                and maintain strong, secure passwords.
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <GlassCard glow glowColor="primary" className="text-center">
              <div className="mx-auto max-w-2xl py-8">
                <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  Ready to secure your passwords?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Start analyzing your passwords today and take the first step towards better security.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link
                    href="/analyzer"
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <KeyRound className="h-5 w-5" />
                    Start Analyzing
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-mono text-sm font-bold">
                <span className="text-primary">Pass</span>
                <span className="text-foreground">Guard</span>
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              A professional cybersecurity tool for password analysis and generation
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
