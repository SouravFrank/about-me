import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/* ======================================================
   ASCII Art + Console Branding
   ====================================================== */
const isProd = import.meta.env.PROD;

const ascii = `
   ███████╗ ██████╗ ██╗   ██╗██████╗  █████╗ ██╗   ██╗
   ██╔════╝██╔═══██╗██║   ██║██╔══██╗██╔══██╗██║   ██║
   ███████╗██║   ██║██║   ██║██████╔╝███████║██║   ██║
   ╚════██║██║   ██║██║   ██║██╔══██╗██╔══██║╚██╗ ██╔╝
   ███████║╚██████╔╝╚██████╔╝██║  ██║██║  ██║ ╚████╔╝
   ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝
`;

try {
  // eslint-disable-next-line no-console
  console.log(
    `%c${ascii}`,
    'color:#a855f7;font-family:monospace;font-weight:bold;font-size:11px;line-height:1.1;text-shadow:0 0 6px rgba(168,85,247,.5)'
  );
  // eslint-disable-next-line no-console
  console.log(
    '%c👋 Hey curious dev!%c\nLike what you see? Let’s connect → https://www.linkedin.com/in/sourav-sadhukhan/',
    'color:#ec4899;font-size:14px;font-weight:bold;',
    'color:#9ca3af;font-size:12px;'
  );
} catch { /* ignore */ }

/* Silence console noise in production builds (keep errors visible during dev) */
if (isProd) {
  const noop = () => { /* noop */ };
  // eslint-disable-next-line no-console
  console.warn = noop;
  // eslint-disable-next-line no-console
  console.error = noop;
  // eslint-disable-next-line no-console
  console.debug = noop;
  // eslint-disable-next-line no-console
  console.info = noop;
  window.addEventListener('error', (e) => e.preventDefault());
  window.addEventListener('unhandledrejection', (e) => e.preventDefault());
}

/* Block copy & context menu outside the #contact section */
const isInsideContact = (target: EventTarget | null) => {
  return target instanceof Element && !!target.closest('#contact');
};
['copy', 'cut', 'contextmenu'].forEach((evt) => {
  document.addEventListener(evt, (e) => {
    if (!isInsideContact(e.target)) e.preventDefault();
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
