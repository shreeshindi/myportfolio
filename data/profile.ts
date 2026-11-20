// data/profile.ts
// Single source of truth for the Neon Terminal portfolio.

export const profile = {
  name: 'Shreenidhi',
  fullName: 'Shreenidhi MC',
  title: 'Senior Software Engineer - Backend',
  availability: 'Open across any domain or stack',
  focus: 'Backend development & system architecture',
  years: '6.5+',
  website: 'https://mc-shreenidhi.in',
  websiteLabel: 'mc-shreenidhi.in',
  summary:
    'Backend engineer and system architect with about 6.5 years building Java and Spring Boot platforms across aviation, hospitality, fintech, and IoT. Strong on service design and shared platform pieces. Recent work includes the AlphaStar microservice layout for ground handling, Medivac, Medgate, manifests, catering, and invoicing, with a shared PDF generator.',
  description:
    'Senior Software Engineer (Backend). Java + Spring Boot. I build clean, secure, production-ready APIs that hold up in production.',
  resumePath: '/image/shreenidhi.pdf',
  heroImage: '/image/Capture1.png',
  logo: '/image/12.png',
  contact: {
    email: 'shreenidhi.mc.vernekar@gmail.com',
    phone: '7760428021',
    phoneHref: 'tel:+917760428021',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/shreenidhi-mc-vernekar-29a050259/',
    github: 'https://github.com/shreeshindi',
  },
  highlights: [
    {
      title: 'Secure by default',
      desc: 'OAuth2, JWT, 2FA, SSO, RBAC, and shared identity flows across services.',
    },
    {
      title: 'Performance first',
      desc: 'Indexes, query tuning, and caching for stable latency under load.',
    },
    {
      title: 'Ops ready',
      desc: 'Dockerized multi-service stacks, CI/CD, and environments that new developers can run fast.',
    },
  ],
  skillGroups: [
    {
      label: 'Languages',
      items: ['Java', 'Python'],
    },
    {
      label: 'Backend',
      items: [
        'Spring Boot',
        'Spring MVC',
        'Spring Security',
        'FastAPI',
        'Flask',
        'Django',
        'REST APIs',
        'Microservices',
        'Event-driven systems',
      ],
    },
    {
      label: 'Data',
      items: ['MySQL', 'PostgreSQL', 'Redis', 'MongoDB (basic)'],
    },
    {
      label: 'Infra & Auth',
      items: [
        'Docker',
        'CI/CD',
        'Nginx',
        'RabbitMQ',
        'Kafka',
        'OAuth2',
        'JWT',
        'SSO',
        'RBAC',
        'Cookie-based auth',
      ],
    },
    {
      label: 'Frontend & AI',
      items: ['React.js', 'Next.js', 'Cursor', 'Claude', 'Antigravity'],
    },
  ],
  certifications: [
    {
      name: 'Generative AI with Large Language Models (DeepLearning.AI, Coursera)',
      url: 'https://www.coursera.org/account/accomplishments/verify/N1VO5U4TDYGD',
    },
  ],
  experience: [
    {
      role: 'Senior Software Engineer',
      company: 'Flycatch Tech',
      period: 'Aug 2024 – Present',
      stack: ['Java', 'Spring Boot', 'MySQL', 'Docker', 'Redis', 'RabbitMQ'],
      bullets: [
        'Lead backend for AlphaStar and AwayTogether in an aviation and hospitality stack of 8 to 10 microservices.',
        'Shipped AlphaStar services for ground handling, Medivac, Medgate, passenger manifests, catering, and invoicing.',
        'Built a shared PDF generator used for invoices and ops documents.',
        'Set up Docker multi-service local environments so new developers can run the stack without long setup.',
        'Built Jukebox, Activity Scheduler, and Toristry to cut manual resort work, and moved legacy modules onto Strapi CMS.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Hanriver',
      period: 'May 2023 – Jul 2024',
      stack: ['Java', 'Spring Boot', 'Docker', 'PostgreSQL', 'IoT'],
      bullets: [
        'Owned SmartFarm and SmartRoot end to end, from design and APIs through database, IoT flows, and delivery.',
        'Added SSO with Spring Security so several apps share one login.',
        'Built Java, PostgreSQL, and Docker microservices that keep automation workflows stable day to day.',
        'Cut API response time by about 20% with query tuning, indexes, and caching.',
        'Fixed gaps in IoT ingestion and validation so sensor data and alerts stay trustworthy.',
      ],
    },
    {
      role: 'Backend Developer',
      company: 'Kingston Info Solution Services',
      period: 'Apr 2020 – Apr 2023',
      stack: ['Java', 'Spring Boot', 'Hibernate', 'MySQL'],
      bullets: [
        'Built the MFS Bulk Payment system for high-volume financial transfers.',
        'Added Log4J and Spring AOP logging and tracing so support could debug issues faster.',
        'Tuned SQL and selective caching to make bulk runs finish sooner under load.',
        'Shipped REST APIs with validation and clear error handling through release and QA cycles.',
      ],
    },
  ],
  projects: [
    {
      name: 'AlphaStar',
      context: 'Flycatch Tech',
      desc: 'Aviation operations platform with linked microservices for ground handling, Medivac, Medgate, passenger manifests, catering, and invoicing, plus a team-wide PDF generator.',
      stack: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
    },
    {
      name: 'AwayTogether',
      context: 'Flycatch Tech',
      desc: 'Hotel and guest engagement platform: activities, schedules, Toristry listings, menu booking, kitchen billing, and guest-to-guest messaging.',
      stack: ['Spring Boot', 'MySQL', 'Docker', 'Redis', 'RabbitMQ'],
    },
    {
      name: 'SmartFarm + SmartRoot',
      context: 'Hanriver',
      desc: 'Agriculture ERP and IoT stack for farm tasks, crop workflows, worker routing, sensor ingestion, validation, and alerts.',
      stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'IoT'],
    },
    {
      name: 'MFS Bulk Payment',
      context: 'Kingston Info Solution Services',
      desc: 'High-volume financial payment APIs with SQL tuning and caching under heavy load.',
      stack: ['Java', 'Spring Boot', 'MySQL', 'Log4J', 'Spring AOP'],
    },
  ],
  additionalWork:
    'Also built Python backends with FastAPI and Django: warehouse inventory and GRN/dispatch, greenhouse car-service appointments and payments, an invoice tool for tax and discount logic, and an ESP8266 Telegram drip irrigation setup live at 4 to 5 greenhouse sites.',
  education: [
    {
      school: 'RNSIT',
      degree: 'Bachelor of Engineering (Information Science)',
      year: '2020',
    },
    {
      school: 'PES University',
      degree: 'Diploma in Computer Science',
      year: '2016',
    },
  ],
} as const;

export type Profile = typeof profile;
