// Common passwords list for detection
export const commonPasswords = new Set([
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567',
  'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine',
  'ashley', 'bailey', 'passw0rd', 'shadow', '123123', '654321', 'superman',
  'qazwsx', 'michael', 'football', 'password1', 'password123', 'welcome',
  'jesus', 'ninja', 'mustang', 'password2', 'amanda', 'jennifer', 'test',
  'admin', 'admin123', 'root', 'toor', 'pass', 'test123', 'guest',
  'master123', 'changeme', 'hello', 'charlie', 'donald', '666666', '111111',
  'hockey', 'ranger', 'killer', 'george', 'zxcvbn', 'asdfgh', 'qwerty123',
  'access', 'soccer', 'thunder', 'batman', '1234', '12345', '123456789',
  '0987654321', '0123456789', 'password!', 'p@ssword', 'P@ssw0rd', 'Welcome1',
  'Summer2024', 'Winter2024', 'Spring2024', 'Fall2024', 'January', 'February',
  'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october',
  'november', 'december', 'monday', 'tuesday', 'wednesday', 'thursday',
  'friday', 'saturday', 'sunday'
])

export interface PasswordAnalysis {
  password: string
  score: number
  strength: 'Very Weak' | 'Weak' | 'Medium' | 'Strong' | 'Very Strong'
  entropy: number
  crackTime: string
  length: number
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumbers: boolean
  hasSymbols: boolean
  hasRepeated: boolean
  hasSequential: boolean
  isCommon: boolean
  vulnerabilities: string[]
  suggestions: string[]
}

// Sequential patterns to detect
const sequentialPatterns = [
  'abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk', 'jkl',
  'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst', 'stu', 'tuv',
  'uvw', 'vwx', 'wxy', 'xyz',
  '012', '123', '234', '345', '456', '567', '678', '789', '890',
  'qwe', 'wer', 'ert', 'rty', 'tyu', 'yui', 'uio', 'iop',
  'asd', 'sdf', 'dfg', 'fgh', 'ghj', 'hjk', 'jkl',
  'zxc', 'xcv', 'cvb', 'vbn', 'bnm',
  '!@#', '@#$', '#$%', '$%^', '%^&', '^&*', '&*(', '*()' 
]

// Keyboard patterns
const keyboardPatterns = [
  'qwerty', 'qwertz', 'azerty', 'asdfgh', 'zxcvbn', 'qweasd', 'wasd',
  '!qaz', '1qaz', '2wsx', '3edc', '4rfv', '5tgb', '6yhn', '7ujm', '8ik,', '9ol.', '0p;/'
]

function hasRepeatedChars(password: string): boolean {
  return /(.)\1{2,}/.test(password)
}

function hasSequentialChars(password: string): boolean {
  const lower = password.toLowerCase()
  for (const pattern of [...sequentialPatterns, ...keyboardPatterns]) {
    if (lower.includes(pattern)) return true
  }
  // Check for reversed patterns
  for (const pattern of sequentialPatterns) {
    if (lower.includes(pattern.split('').reverse().join(''))) return true
  }
  return false
}

function calculateEntropy(password: string): number {
  let charsetSize = 0
  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32
  
  if (charsetSize === 0) return 0
  return password.length * Math.log2(charsetSize)
}

function estimateCrackTime(entropy: number): string {
  // Assuming 10 billion guesses per second (high-end GPU cracking)
  const guessesPerSecond = 10_000_000_000
  const totalCombinations = Math.pow(2, entropy)
  const seconds = totalCombinations / guessesPerSecond / 2 // Average case

  if (seconds < 0.001) return 'Instantly'
  if (seconds < 1) return 'Less than a second'
  if (seconds < 60) return `${Math.ceil(seconds)} seconds`
  if (seconds < 3600) return `${Math.ceil(seconds / 60)} minutes`
  if (seconds < 86400) return `${Math.ceil(seconds / 3600)} hours`
  if (seconds < 2592000) return `${Math.ceil(seconds / 86400)} days`
  if (seconds < 31536000) return `${Math.ceil(seconds / 2592000)} months`
  if (seconds < 315360000) return `${Math.ceil(seconds / 31536000)} years`
  if (seconds < 3153600000) return `${Math.ceil(seconds / 31536000)} years`
  if (seconds < 31536000000000) return `${Math.ceil(seconds / 31536000)} years`
  return 'Centuries+'
}

export function analyzePassword(password: string): PasswordAnalysis {
  if (!password) {
    return {
      password: '',
      score: 0,
      strength: 'Very Weak',
      entropy: 0,
      crackTime: 'Instantly',
      length: 0,
      hasUppercase: false,
      hasLowercase: false,
      hasNumbers: false,
      hasSymbols: false,
      hasRepeated: false,
      hasSequential: false,
      isCommon: false,
      vulnerabilities: ['No password entered'],
      suggestions: ['Enter a password to analyze']
    }
  }

  const length = password.length
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumbers = /[0-9]/.test(password)
  const hasSymbols = /[^a-zA-Z0-9]/.test(password)
  const hasRepeated = hasRepeatedChars(password)
  const hasSequential = hasSequentialChars(password)
  const isCommon = commonPasswords.has(password.toLowerCase())

  let score = 0
  const vulnerabilities: string[] = []
  const suggestions: string[] = []

  // Length scoring (up to 30 points)
  if (length >= 16) score += 30
  else if (length >= 12) score += 25
  else if (length >= 10) score += 20
  else if (length >= 8) score += 15
  else if (length >= 6) score += 10
  else score += 5

  if (length < 8) {
    vulnerabilities.push('Password is too short')
    suggestions.push('Use at least 12 characters for better security')
  } else if (length < 12) {
    suggestions.push('Consider using 16+ characters for maximum security')
  }

  // Character diversity scoring (up to 40 points)
  const charTypes = [hasUppercase, hasLowercase, hasNumbers, hasSymbols].filter(Boolean).length
  score += charTypes * 10

  if (!hasUppercase) {
    vulnerabilities.push('No uppercase letters')
    suggestions.push('Add uppercase letters (A-Z)')
  }
  if (!hasLowercase) {
    vulnerabilities.push('No lowercase letters')
    suggestions.push('Add lowercase letters (a-z)')
  }
  if (!hasNumbers) {
    vulnerabilities.push('No numbers')
    suggestions.push('Add numbers (0-9)')
  }
  if (!hasSymbols) {
    vulnerabilities.push('No special characters')
    suggestions.push('Add special characters (!@#$%^&*)')
  }

  // Pattern penalties
  if (hasRepeated) {
    score -= 15
    vulnerabilities.push('Contains repeated characters')
    suggestions.push('Avoid repeating characters (e.g., aaa, 111)')
  }

  if (hasSequential) {
    score -= 15
    vulnerabilities.push('Contains sequential patterns')
    suggestions.push('Avoid sequential patterns (e.g., abc, 123, qwerty)')
  }

  // Common password penalty
  if (isCommon) {
    score -= 40
    vulnerabilities.push('This is a commonly used password')
    suggestions.push('Use a unique password that is not in common password lists')
  }

  // Bonus for length with diversity
  if (length >= 12 && charTypes >= 3) score += 10
  if (length >= 16 && charTypes >= 4) score += 10

  // Clamp score
  score = Math.max(0, Math.min(100, score))

  // Calculate entropy
  const entropy = calculateEntropy(password)
  const crackTime = estimateCrackTime(entropy)

  // Determine strength
  let strength: PasswordAnalysis['strength']
  if (score >= 80) strength = 'Very Strong'
  else if (score >= 60) strength = 'Strong'
  else if (score >= 40) strength = 'Medium'
  else if (score >= 20) strength = 'Weak'
  else strength = 'Very Weak'

  // Override if common password
  if (isCommon) {
    strength = 'Very Weak'
    score = Math.min(score, 10)
  }

  return {
    password,
    score,
    strength,
    entropy: Math.round(entropy * 10) / 10,
    crackTime,
    length,
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSymbols,
    hasRepeated,
    hasSequential,
    isCommon,
    vulnerabilities,
    suggestions
  }
}

// Cryptographically secure password generator
export function generateSecurePassword(options: {
  length: number
  includeUppercase: boolean
  includeLowercase: boolean
  includeNumbers: boolean
  includeSymbols: boolean
}): string {
  const { length, includeUppercase, includeLowercase, includeNumbers, includeSymbols } = options

  let charset = ''
  const requiredChars: string[] = []

  if (includeLowercase) {
    charset += 'abcdefghijklmnopqrstuvwxyz'
    requiredChars.push('abcdefghijklmnopqrstuvwxyz')
  }
  if (includeUppercase) {
    charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    requiredChars.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  }
  if (includeNumbers) {
    charset += '0123456789'
    requiredChars.push('0123456789')
  }
  if (includeSymbols) {
    charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    requiredChars.push('!@#$%^&*()_+-=[]{}|;:,.<>?')
  }

  if (charset.length === 0) {
    charset = 'abcdefghijklmnopqrstuvwxyz'
  }

  // Use crypto.getRandomValues for cryptographic randomness
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)

  let password = ''
  for (let i = 0; i < length; i++) {
    password += charset[array[i] % charset.length]
  }

  // Ensure at least one character from each required set
  const passwordArray = password.split('')
  for (let i = 0; i < requiredChars.length && i < length; i++) {
    const charSet = requiredChars[i]
    const randomArray = new Uint32Array(1)
    crypto.getRandomValues(randomArray)
    passwordArray[i] = charSet[randomArray[0] % charSet.length]
  }

  // Shuffle the password
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const randomArray = new Uint32Array(1)
    crypto.getRandomValues(randomArray)
    const j = randomArray[0] % (i + 1)
    ;[passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]]
  }

  return passwordArray.join('')
}
