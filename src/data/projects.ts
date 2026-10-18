export interface Project {
  name: string
  category: string
  subtitle: string
  description: string
  tech: string[]
  details: string[]
  color: string
  repo?: string
  demo?: string
}

export const projects: Project[] = [
  {
    name: 'DataGuard',
    category: 'FULL-STACK / CLOUD',
    subtitle: 'Good data. Better decisions.',
    color: 'mint',
    repo: 'https://github.com/ArnavGurao/DataGaurd',
    description:
      'A full-stack data validation and quality reporting platform that turns messy CSV datasets into useful, trustworthy data.',
    tech: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'AWS'],
    details: [
      'Customizable rules detect missing values, duplicates, schema inconsistencies, and invalid records.',
      'Asynchronous Python processing with persistent job tracking, quality reports, and downloadable validated and rejected datasets.',
      'Built with Vite, Pandas, and SQLAlchemy; AWS architecture uses EC2, RDS, S3, SQS, SNS, IAM, and CloudWatch.',
    ],
  },
  {
    name: 'Cardexa',
    category: 'MOBILE / HACKATHON',
    subtitle: 'A little clarity for recurring costs.',
    color: 'lavender',
    repo: 'https://github.com/ArnavGurao/CARDEXA',
    description:
      'A mobile app for organizing credit cards and subscriptions, designed to make recurring expenses easier to understand.',
    tech: ['React Native', 'Expo', 'SQLite'],
    details: [
      'A centralized mobile interface for organizing financial accounts, credit cards, and subscription information.',
      'Led development in a hackathon collaboration with Team Cache Me If You Can at the Summer Hackathon Nationwide Competition 2026.',
    ],
  },
  {
    name: 'RoadSOS',
    category: 'MOBILE / AI',
    subtitle: 'Help, when it matters.',
    color: 'blue',
    description:
      'An emergency-response app connecting users with nearby services and guidance through a conversational triage assistant.',
    tech: ['React Native', 'Flask', 'Node.js', 'Python'],
    details: [
      'Location-based discovery and routing to nearby hospitals and police services.',
      'Flask and Node.js backend components connect the mobile interface to emergency-service data.',
      'NLP-based conversational triage support; developed for the IIT Madras Road Safety Hackathon 2026.',
    ],
  },
]
