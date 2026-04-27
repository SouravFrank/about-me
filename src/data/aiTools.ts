export interface AITool {
  name: string;
  logo: string; // URL or emoji fallback
  category: 'Chat & Reasoning' | 'Coding' | 'IDE & Agents' | 'Creative & Multimodal';
  story: string;
  badge?: string; // e.g. "Day-1 user", "Early access"
  since?: string;
  color: string; // gradient classes
}

export const aiTools: AITool[] = [
  {
    name: 'ChatGPT',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Chat & Reasoning',
    story: 'Adopted within a week of public release. Daily driver for ideation, debugging, architecture reviews, and content shaping.',
    badge: 'Week-1 adopter',
    since: 'Dec 2022',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'ChatGPT Codex (Mac)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Coding',
    story: 'Running the native macOS Codex app since day one of launch — terminal-grade agentic coding inside my daily workflow.',
    badge: 'Day-1 user',
    color: 'from-emerald-500 to-cyan-500',
  },
  {
    name: 'Cursor',
    logo: 'https://www.cursor.com/apple-touch-icon.png',
    category: 'IDE & Agents',
    story: 'Early adopter when Cursor was still a niche AI-first IDE. Composer, agent mode, and inline edits power my fastest builds.',
    badge: 'Early adopter',
    color: 'from-zinc-500 to-slate-700',
  },
  {
    name: 'GitHub Copilot',
    logo: 'https://github.githubassets.com/assets/copilot-2cb6f8f3a0ed.png',
    category: 'Coding',
    story: 'In since the invite-only technical preview. Watched it evolve from autocomplete to a full agent across PRs and chat.',
    badge: 'Invite-only beta',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'Claude',
    logo: 'https://claude.ai/images/claude_app_icon.png',
    category: 'Chat & Reasoning',
    story: 'Go-to model for long-context reasoning, code review, and nuanced writing. Claude Code as a CLI agent in heavy rotation.',
    color: 'from-orange-400 to-amber-600',
  },
  {
    name: 'Gemini',
    logo: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    category: 'Chat & Reasoning',
    story: 'Multimodal workflows, deep research, and Google-stack integrations. Sharp at long-document and visual reasoning tasks.',
    color: 'from-blue-400 to-sky-500',
  },
  {
    name: 'Grok',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Grok_logo.svg',
    category: 'Chat & Reasoning',
    story: 'Real-time pulse on tech and a wittier second opinion when comparing model outputs.',
    color: 'from-neutral-500 to-zinc-800',
  },
  {
    name: 'Antigravity IDE',
    logo: 'https://antigravity.google/favicon.ico',
    category: 'IDE & Agents',
    story: 'Hands-on since the early days — exploring agent-first IDE paradigms beyond traditional editors.',
    badge: 'Early days',
    color: 'from-fuchsia-500 to-violet-600',
  },
  {
    name: 'Firebase Studio',
    logo: 'https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/firebase/images/touchicon-180.png',
    category: 'IDE & Agents',
    story: 'Building with Firebase Studio (formerly Project IDX) since launch — full-stack AI workspaces in the browser.',
    badge: 'Early days',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Lovable',
    logo: 'https://lovable.dev/favicon.ico',
    category: 'IDE & Agents',
    story: 'AI-native app builder for shipping production-grade React + Cloud apps in record time. This site lives here.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'v0 by Vercel',
    logo: 'https://v0.dev/favicon.ico',
    category: 'IDE & Agents',
    story: 'Generative UI prototyping straight to shadcn/Tailwind components — perfect for design-to-code spikes.',
    color: 'from-gray-700 to-black',
  },
  {
    name: 'Perplexity',
    logo: 'https://www.perplexity.ai/favicon.ico',
    category: 'Chat & Reasoning',
    story: 'Answer engine of choice for sourced research, comparisons, and quick technical lookups with citations.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    name: 'Midjourney',
    logo: 'https://www.midjourney.com/apple-touch-icon.png',
    category: 'Creative & Multimodal',
    story: 'Concept art, hero imagery, and brand exploration when pixels need to feel cinematic.',
    color: 'from-indigo-500 to-purple-700',
  },
  {
    name: 'DALL·E',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Creative & Multimodal',
    story: 'In-flow image generation inside ChatGPT for quick visual mocks and explorations.',
    color: 'from-emerald-500 to-green-700',
  },
  {
    name: 'Sora',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg',
    category: 'Creative & Multimodal',
    story: 'Exploring text-to-video for storytelling, motion mocks, and product narratives.',
    color: 'from-slate-600 to-zinc-900',
  },
  {
    name: 'Notion AI',
    logo: 'https://www.notion.so/front-static/favicon.ico',
    category: 'Chat & Reasoning',
    story: 'Embedded AI for docs, specs, and meeting synthesis right where the team already works.',
    color: 'from-stone-500 to-neutral-700',
  },
];

export const aiArsenalIntro = {
  titleBold: 'My ',
  titleLight: 'AI Arsenal',
  description:
    "From day-one ChatGPT to invite-only Copilot and the latest agentic IDEs — a living timeline of the AI tools I've adopted, shipped with, and pushed to their limits.",
};
