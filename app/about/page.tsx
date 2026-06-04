'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Target, 
  Zap, 
  Lock, 
  Code2, 
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react'
import { Navigation } from '@/components/navigation'
import { GlassCard } from '@/components/glass-card'

const objectives = [
  'Provide real-time password strength analysis',
  'Calculate password entropy accurately',
  'Detect common passwords and weak patterns',
  'Generate cryptographically secure passwords',
  'Educate users on password security best practices',
]

const technologies = [
  { name: 'Next.js 16', description: 'React framework with App Router' },
  { name: 'TypeScript', description: 'Type-safe development' },
  { name: 'Tailwind CSS', description: 'Utility-first styling' },
  { name: 'Framer Motion', description: 'Smooth animations' },
  { name: 'crypto.getRandomValues()', description: 'Cryptographic randomness' },
]

const securityFeatures = [
  {
    title: 'Client-Side Only',
    description: 'All password analysis happens in your browser. No passwords are sent to any server.',
  },
  {
    title: 'No Data Storage',
    description: 'We do not store, log, or transmit any passwords or analysis results.',
  },
  {
    title: 'Cryptographic RNG',
    description: 'Password generation uses crypto.getRandomValues() for true randomness.',
  },
  {
    title: 'Open Analysis',
    description: 'Our scoring algorithm is transparent and based on established security principles.',
  },
]

export default function AboutPage() {
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
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">About</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            About PassGuard
          </h1>
          <p className="mt-3 text-muted-foreground">
            A professional cybersecurity tool for password analysis and generation
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Project Overview */}
          <GlassCard glow glowColor="primary">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Project Overview</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              PassGuard is a comprehensive password security tool designed to help users understand 
              and improve their password security. The application analyzes passwords in real-time, 
              providing detailed feedback on strength, entropy, vulnerabilities, and actionable 
              recommendations. It also includes a cryptographically secure password generator for 
              creating strong, random passwords.
            </p>
          </GlassCard>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Objectives */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Target className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Objectives</h2>
              </div>
              <ul className="space-y-3">
                {objectives.map((objective, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                    <span className="text-muted-foreground">{objective}</span>
                  </motion.li>
                ))}
              </ul>
            </GlassCard>

            {/* Technologies */}
            <GlassCard>
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold text-foreground">Technologies</h2>
              </div>
              <div className="space-y-3">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
                  >
                    <span className="font-medium text-foreground">{tech.name}</span>
                    <span className="text-sm text-muted-foreground">{tech.description}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Security & Privacy */}
          <GlassCard glow glowColor="success">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="h-6 w-6 text-success" />
              <h2 className="text-xl font-bold text-foreground">Security & Privacy</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {securityFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-lg bg-muted/50 p-4"
                >
                  <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Why Password Security Matters */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-6 w-6 text-warning" />
              <h2 className="text-xl font-bold text-foreground">Why Password Security Matters</h2>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Weak passwords are one of the most common vulnerabilities exploited by attackers. 
                According to security research, compromised credentials are involved in over 80% of 
                data breaches. A strong password is your first line of defense against unauthorized 
                access to your accounts and sensitive information.
              </p>
              <p>
                Modern password cracking techniques can attempt billions of guesses per second using 
                specialized hardware. This means short passwords or those based on common patterns 
                can be cracked almost instantly. Using long, random passwords with a mix of character 
                types significantly increases the time and resources required to crack them.
              </p>
              <div className="mt-6 rounded-lg bg-warning/10 p-4">
                <h3 className="mb-2 font-semibold text-foreground">Key Statistics</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    <span>81% of breaches involve weak or stolen passwords</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    <span>A 6-character password can be cracked in under 1 second</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                    <span>A 16-character password with symbols takes centuries to crack</span>
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Resources */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Learn More</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { 
                  title: 'NIST Password Guidelines', 
                  url: 'https://pages.nist.gov/800-63-3/',
                  description: 'Official guidelines from the National Institute of Standards and Technology'
                },
                { 
                  title: 'OWASP Password Cheat Sheet', 
                  url: 'https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html',
                  description: 'Best practices from the Open Web Application Security Project'
                },
              ].map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg bg-muted/50 p-4 transition-colors hover:bg-muted"
                >
                  <ExternalLink className="mt-0.5 h-5 w-5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground group-hover:text-primary">{resource.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  )
}
