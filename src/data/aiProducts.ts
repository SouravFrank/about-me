export interface AIProduct {
  id: string;
  name: string;
  version: string;
  releasedDate: string;
  edition: string;
  description: string;
  status: string;
  longDescription: string;
  features: string[];
  perfectFor: string[];
  promptFilename: string; // e.g. 'itr-copilot-v1.0.0.txt'
  articleUrl: string;
}

export const aiProducts: AIProduct[] = [
  {
    id: 'itr-copilot',
    name: '🇮🇳 ITR Copilot',
    version: '1.0',
    releasedDate: 'Jul 2026',
    edition: 'Community Edition',
    description: 'AI-assisted Income Tax Filing Workflow for Indian taxpayers. Guided filing checks and validation before submission.',
    status: 'Stable',
    longDescription: 'Instead of answering isolated tax questions, ITR Copilot guides the entire filing journey—from document collection to final validation—helping reduce mistakes before submission.',
    features: [
      'Step-by-step workflow',
      'Zero-assumption AI approach',
      'Document validation before filing',
      'Cross-check guidance',
      'AI-assisted decision flow',
      'Designed to reduce mistakes',
    ],
    perfectFor: [
      'Salaried Employees',
      'First-time Filers',
      'Freelancers',
      'Developers',
    ],
    promptFilename: 'itr-copilot-v1.0.0.txt',
    articleUrl: 'https://www.linkedin.com/posts/souravsadhukhan_every-tax-season-i-see-the-same-pattern-ugcPost-7482893657616834560-yAyl/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACWoe4ABguERs55CSbsLiGbp8sTQQfL8bek',
  },
];
