import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clipboard, Download, ExternalLink, X, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductModalProps } from './types';
import { trackAIProduct } from '../../../utils/analytics';
import promptText from '../../../assets/prompts/itr-copilot-v1.0.0.txt?raw';

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  isDark,
  initialSource,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  const [copied, setCopied] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'architecture' | 'audience'>('features');
  const [showPromptPreview, setShowPromptPreview] = useState(false);

  // Track modal open and Returned Later behavior
  useEffect(() => {
    if (isOpen) {
      setShowSuccessOverlay(false); // Reset to details view on open
      setActiveTab('features');
      setShowPromptPreview(false);

      // Track general modal open
      trackAIProduct(product.name, 'modal_open', { source: initialSource });

      // Track: Returned Later
      try {
        const hasVisitedBefore = localStorage.getItem(`portfolio_ai_product_visited_${product.id}`);
        const visitedThisSession = sessionStorage.getItem(`product_visited_session_${product.id}`);

        if (hasVisitedBefore && !visitedThisSession) {
          trackAIProduct(product.name, 'returned_later');
        }

        // Set flags
        localStorage.setItem(`portfolio_ai_product_visited_${product.id}`, 'true');
        sessionStorage.setItem(`product_visited_session_${product.id}`, 'true');
      } catch (e) { /* ignore */ }
    }
  }, [isOpen, product.id, product.name, initialSource]);

  // Track modal duration on close
  useEffect(() => {
    if (!isOpen) return;

    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpentSeconds = Math.round((endTime - startTime) / 1000);
      trackAIProduct(product.name, 'modal_close', {
        time_spent_seconds: timeSpentSeconds,
      });
    };
  }, [isOpen, product.name]);

  // Focus trap & Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement;

    const focusTimeout = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusableSelectors =
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        const focusableElements = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimeout);
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose]);

  // Copy prompt handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);

      setCopied(true);
      trackAIProduct(product.name, 'prompt_copied');
      trackAIProduct(product.name, 'downloaded', { download_method: 'copy' });

      setTimeout(() => {
        setCopied(false);
        setShowSuccessOverlay(true);
      }, 800);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  // Download prompt handler
  const handleDownload = () => {
    const blob = new Blob([promptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = product.promptFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    trackAIProduct(product.name, 'downloaded', { download_method: 'download' });
    setShowSuccessOverlay(true);
  };

  // LinkedIn article click handler
  const handleArticleClick = () => {
    trackAIProduct(product.name, 'linkedin_article_click');
    window.open(product.articleUrl, '_blank', 'noopener,noreferrer');
  };

  // Tab switch handler
  const handleTabChange = (tab: 'features' | 'architecture' | 'audience') => {
    setActiveTab(tab);
    trackAIProduct(product.name, `${tab}_tab`);
  };

  // Toggle Prompt preview handler
  const togglePromptPreview = () => {
    const nextState = !showPromptPreview;
    setShowPromptPreview(nextState);
    if (nextState) {
      trackAIProduct(product.name, 'prompt_viewed');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] backdrop-blur-md bg-black/60 flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            className={`
              relative 
              w-full 
              max-w-3xl 
              max-h-[90vh] 
              rounded-2xl 
              shadow-2xl 
              overflow-hidden 
              flex 
              flex-col
              border
              border-gray-200
              dark:border-gray-700
              bg-white/95 
              dark:bg-gray-900/95 
              backdrop-blur-xl
              text-gray-900
              dark:text-gray-100
              select-text
            `}
          >
            {/* Modal Header */}
            <div
              className={`
                p-5 md:p-6 
                border-b 
                border-gray-200 
                dark:border-gray-800 
                flex 
                justify-between 
                items-start 
                relative
                ${isDark ? 'bg-gray-800/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}
              `}
            >
              <div className="min-w-0 pr-8">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3
                    id="product-modal-title"
                    className="text-2xl md:text-3xl font-bold flex items-center gap-1.5"
                  >
                    <span className="shrink-0 text-2xl" style={{ textShadow: 'none' }}>🇮🇳</span>
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text dark:from-blue-400 dark:to-purple-400">
                      {product.name.replace('🇮🇳 ', '')}
                    </span>
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-md">
                    {product.edition}
                  </span>
                </div>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 font-mono">
                  Version {product.version} · Released {product.releasedDate}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                  AI-assisted Income Tax Filing Workflow
                </p>
              </div>

              <div className="absolute top-[68px] right-6 hidden sm:flex flex-col items-end text-right">
                <span className="text-[9px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Built by</span>
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Sourav Sadhukhan</span>
              </div>

              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-200 hover:dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Scroll Content */}
            {showSuccessOverlay ? (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-6 flex-1 min-h-[40vh] select-text">
                <motion.div
                  initial={{ scale: 0.5, rotate: -20, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="text-6xl animate-bounce"
                >
                  🎉
                </motion.div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                    Thanks for downloading!
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed font-light">
                    If this workflow saves you time, I'd genuinely love to hear your feedback on LinkedIn. Let me know what you think!
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-2">
                  <button
                    onClick={handleArticleClick}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open LinkedIn Article
                  </button>
                  <button
                    onClick={() => setShowSuccessOverlay(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300/40 dark:border-gray-700 transition-all cursor-pointer"
                  >
                    Back to Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 mobile-skill-scroll">
                
                {/* Custom Tabs Navigation (Premium Glassmorphism Style) */}
                <div className="flex border-b border-gray-200 dark:border-gray-800 gap-6 text-sm font-semibold mb-4">
                  <button
                    onClick={() => handleTabChange('features')}
                    className={`pb-2.5 transition-all relative cursor-pointer ${
                      activeTab === 'features' 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Features
                    {activeTab === 'features' && (
                      <motion.div layoutId="modal-active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleTabChange('architecture')}
                    className={`pb-2.5 transition-all relative cursor-pointer ${
                      activeTab === 'architecture' 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Architecture Flow
                    {activeTab === 'architecture' && (
                      <motion.div layoutId="modal-active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleTabChange('audience')}
                    className={`pb-2.5 transition-all relative cursor-pointer ${
                      activeTab === 'audience' 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    Target Audience
                    {activeTab === 'audience' && (
                      <motion.div layoutId="modal-active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />
                    )}
                  </button>
                </div>

                {/* Tab Content rendering */}
                <AnimatePresence mode="wait">
                  {activeTab === 'features' && (
                    <motion.div
                      key="features-tab"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      {/* Short Introduction */}
                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-2">
                          Overview
                        </h4>
                        <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                          {product.longDescription}
                        </p>
                      </div>

                      {/* How to execute tip box */}
                      <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/40 bg-blue-50/20 dark:bg-blue-950/20 flex gap-3 items-start select-text">
                        <span className="text-lg shrink-0 select-none">💡</span>
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                            How to execute this workflow
                          </h5>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                            Download or copy the workflow, then paste it directly into your preferred AI chat assistant (such as <strong className="text-gray-800 dark:text-gray-200">ChatGPT</strong>, <strong className="text-gray-800 dark:text-gray-200">Claude</strong>, or <strong className="text-gray-800 dark:text-gray-200">Gemini</strong>) to initiate the step-by-step guided filing session.
                          </p>
                        </div>
                      </div>

                      {/* Workflow Features list */}
                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3">
                          Workflow Features
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {product.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <div className="mt-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 p-0.5 text-blue-600 dark:text-blue-400 shrink-0">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-tight">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'architecture' && (
                    <motion.div
                      key="arch-tab"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-2">
                          ITR Copilot Architecture
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-light leading-relaxed">
                          This AI product follows a structured prompt architecture using a zero-assumption model. Here is the process flow for processing tax documents and returns.
                        </p>
                      </div>

                      {/* Flow Diagram */}
                      <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-800 font-mono text-xs text-center space-y-4">
                        <div className="flex flex-col items-center">
                          <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-md">
                            Taxpayer Documents & Query
                          </div>
                          <div className="h-6 border-l-2 border-dashed border-gray-300 dark:border-gray-700" />
                          <div className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md">
                            Zero-Assumption ITR Classifier
                          </div>
                          <div className="h-6 border-l-2 border-dashed border-gray-300 dark:border-gray-700" />
                          <div className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold shadow-md">
                            RAG Check (Indian Tax Code database references)
                          </div>
                          <div className="h-6 border-l-2 border-dashed border-gray-300 dark:border-gray-700" />
                          <div className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold shadow-md">
                            Structured Output Synthesis (AI Copilot response)
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'audience' && (
                    <motion.div
                      key="audience-tab"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase mb-3">
                          Perfect For
                        </h4>
                        <ul className="space-y-2.5">
                          {product.perfectFor.map((audience, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <div className="mt-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 p-0.5 text-emerald-600 dark:text-emerald-400 shrink-0">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-sm text-gray-700 dark:text-gray-300 leading-tight">
                                {audience}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Prompt Preview section (Requirement: Prompt Viewed / Prompt Copied) */}
                <div className="mt-6 border-t border-gray-200 dark:border-gray-800 pt-6">
                  <button
                    onClick={togglePromptPreview}
                    className="flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800/80 dark:hover:bg-gray-800 text-sm font-semibold transition-all cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-500" />
                      {showPromptPreview ? 'Hide Prompt Preview' : 'Show Prompt Preview'}
                    </span>
                    {showPromptPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <AnimatePresence>
                    {showPromptPreview && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mt-3"
                      >
                        <div className="p-4 rounded-xl bg-gray-900 text-gray-100 font-mono text-xs max-h-[160px] overflow-y-auto leading-relaxed select-all">
                          {promptText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            )}

            {/* Modal Actions */}
            {!showSuccessOverlay && (
              <div
                className={`
                  p-5 md:p-6 
                  border-t 
                  border-gray-200 
                  dark:border-gray-800 
                  bg-gray-50/50 
                  dark:bg-gray-900/50
                  flex 
                  flex-col 
                  md:flex-row 
                  items-center 
                  gap-3 
                  md:justify-end
                `}
              >
                {/* Read LinkedIn Article */}
                <button
                  onClick={handleArticleClick}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                  Read LinkedIn Article
                </button>

                {/* Download Workflow */}
                <button
                  onClick={handleDownload}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-700 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-gray-500" />
                  Download Workflow
                </button>

                {/* Copy Workflow */}
                <button
                  onClick={handleCopy}
                  className={`
                    w-full md:w-auto 
                    inline-flex items-center justify-center gap-2 
                    px-6 py-3 rounded-xl 
                    text-sm font-semibold text-white 
                    transition-all duration-300 cursor-pointer
                    ${copied ? 'bg-emerald-600 shadow-emerald-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-md'}
                  `}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Workflow Copied
                    </>
                  ) : (
                    <>
                      <Clipboard className="w-4 h-4" />
                      Copy Workflow
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
