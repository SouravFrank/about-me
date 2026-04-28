export interface AITool {
  name: string;
  logo: string; // URL or emoji fallback
  category: 'Chat & Reasoning' | 'Coding' | 'IDE & Agents';
  story: string;
  badge?: string; // e.g. "Day-1 user", "Early access"
  since?: string;
  color: string; // gradient classes
}

export const aiTools: AITool[] = [
  {
    name: 'ChatGPT',
    logo: 'https://svgl.app/library/openai_dark.svg',
    category: 'Chat & Reasoning',
    story: 'Adopted within a week of public release. Daily driver for ideation, debugging, architecture reviews, and content shaping.',
    badge: 'Week-1 adopter',
    since: 'Dec 2022',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'ChatGPT Codex (Mac)',
    logo: 'https://svgl.app/library/openai_dark.svg',
    category: 'Coding',
    story: 'Running the native macOS Codex app since day one of launch — terminal-grade agentic coding inside my daily workflow.',
    badge: 'Day-1 user',
    color: 'from-emerald-500 to-cyan-500',
  },
  {
    name: 'Cursor',
    logo: 'https://svgl.app/library/cursor_dark.svg',
    category: 'IDE & Agents',
    story: 'Early adopter when Cursor was still a niche AI-first IDE. Composer, agent mode, and inline edits power my fastest builds.',
    badge: 'Early adopter',
    color: 'from-zinc-500 to-slate-700',
  },
  {
    name: 'GitHub Copilot',
    logo: 'https://svgl.app/library/copilot_dark.svg',
    category: 'Coding',
    story: 'In since the invite-only technical preview. Watched it evolve from autocomplete to a full agent across PRs and chat.',
    badge: 'Invite-only beta',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    name: 'Claude',
    logo: 'https://svgl.app/library/claude-ai-icon.svg',
    category: 'Chat & Reasoning',
    story: 'Go-to model for long-context reasoning, code review, and nuanced writing. Claude Code as a CLI agent in heavy rotation.',
    color: 'from-orange-400 to-amber-600',
  },
  {
    name: 'Gemini',
    logo: 'https://svgl.app/library/gemini.svg',
    category: 'Chat & Reasoning',
    story: 'Multimodal workflows, deep research, and Google-stack integrations. Sharp at long-document and visual reasoning tasks.',
    color: 'from-blue-400 to-sky-500',
  },
  {
    name: 'Grok',
    logo: 'https://svgl.app/library/grok-dark.svg',
    category: 'Chat & Reasoning',
    story: 'Real-time pulse on tech and a wittier second opinion when comparing model outputs.',
    color: 'from-neutral-500 to-zinc-800',
  },
  {
    name: 'DeepSeek',
    logo: 'https://svgl.app/library/deepseek.svg',
    category: 'Chat & Reasoning',
    story: 'Open-weight powerhouse for reasoning and code — a strong cost-efficient counterpart to frontier closed models.',
    color: 'from-blue-500 to-indigo-700',
  },
  {
    name: 'Perplexity',
    logo: 'https://svgl.app/library/perplexity.svg',
    category: 'Chat & Reasoning',
    story: 'Answer engine of choice for sourced research, comparisons, and quick technical lookups with citations.',
    color: 'from-teal-500 to-cyan-600',
  },
  {
    name: 'NotebookLM',
    logo: 'https://notebooklm.google/favicon.ico',
    category: 'Chat & Reasoning',
    story: 'Source-grounded research notebooks and audio overviews — turns dense docs into digestible briefings.',
    color: 'from-sky-400 to-blue-600',
  },
  {
    name: 'Antigravity IDE',
    logo: 'https://svgl.app/library/antigravity.svg',
    category: 'IDE & Agents',
    story: 'Hands-on since the early days — exploring agent-first IDE paradigms beyond traditional editors.',
    badge: 'Early days',
    color: 'from-fuchsia-500 to-violet-600',
  },
  {
    name: 'Firebase Studio',
    logo: 'https://svgl.app/library/firebase.svg',
    category: 'IDE & Agents',
    story: 'Building with Firebase Studio (formerly Project IDX) since launch — full-stack AI workspaces in the browser.',
    badge: 'Early days',
    color: 'from-amber-500 to-orange-600',
  },
  {
    name: 'Lovable',
    logo: 'https://svgl.app/library/lovable.svg',
    category: 'IDE & Agents',
    story: 'AI-native app builder for shipping production-grade React + Cloud apps in record time. This site lives here.',
    color: 'from-pink-500 to-rose-500',
  },
  {
    name: 'Bolt',
    logo: 'https://svgl.app/library/bolt-new_dark.svg',
    category: 'IDE & Agents',
    story: 'In-browser full-stack prototyping — spin up runnable apps from a prompt in seconds.',
    color: 'from-yellow-400 to-amber-600',
  },
  {
    name: 'Trae IDE',
    logo: 'https://www.trae.ai/favicon.ico',
    category: 'IDE & Agents',
    story: 'Agentic IDE in the rotation for multi-file refactors and exploratory builds across stacks.',
    color: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Comet Browser',
    logo: 'https://svgl.app/library/perplexity.svg',
    category: 'IDE & Agents',
    story: "Perplexity's agentic browser — delegating real web tasks instead of just searching them.",
    color: 'from-cyan-500 to-teal-600',
  },
  {
    name: 'LM Studio',
    logo: 'https://lmstudio.ai/favicon.ico',
    category: 'Coding',
    story: 'Local-first LLM runtime for offline experimentation and private, on-device inference.',
    color: 'from-slate-500 to-gray-700',
  },
  {
    name: 'v0',
    logo: 'https://svgl.app/library/v0_dark.svg',
    category: 'IDE & Agents',
    story: "Vercel's generative UI tool for rapid React/Tailwind component drafts and design exploration.",
    color: 'from-neutral-700 to-black',
  },
];


export const aiArsenalIntro = {
  titleBold: 'My ',
  titleLight: 'AI Arsenal',
  description:
    "From day-one ChatGPT to invite-only Copilot and the latest agentic IDEs — a living timeline of the AI tools I've adopted, shipped with, and pushed to their limits.",
};
