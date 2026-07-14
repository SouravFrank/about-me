export interface AIProduct {
  id: string;
  name: string;
  version: string;
  edition: string;
  description: string;
  status: string;
  longDescription: string;
  features: string[];
  promptFilename: string; // e.g. 'ITR-Copilot-v1.txt'
  articleUrl: string;
}

export const aiProducts: AIProduct[] = [
  {
    id: 'itr-copilot',
    name: 'ITR Copilot',
    version: '1.0',
    edition: 'Community Edition',
    description: 'AI-assisted Income Tax Filing Workflow for Indian taxpayers. Guided filing checks and validation before submission.',
    status: 'Stable',
    longDescription: 'An AI-assisted workflow designed to help Indian taxpayers file Income Tax Returns more confidently by guiding the process rather than simply answering questions. It walks you through regime selection, deduction validations, and cross-checks with Form 16, AIS, and Form 26AS data to prevent costly filing mistakes.',
    features: [
      'Step-by-step workflow',
      'Zero-assumption AI approach',
      'Document validation before filing',
      'Cross-check guidance',
      'AI-assisted decision flow',
      'Designed to reduce mistakes',
    ],
    promptFilename: 'itr-copilot-v1.0.0.txt',
    articleUrl: 'https://www.linkedin.com/in/sourav-sadhukhan/', // Placeholder for LinkedIn article
  },
];
