import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCardProps } from './types';

export interface ProductCardRef {
  focus: () => void;
  scrollIntoView: (options?: ScrollIntoViewOptions) => void;
}

export const ProductCard = forwardRef<ProductCardRef, ProductCardProps>(
  ({ product, onLearnMore }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        buttonRef.current?.focus();
      },
      scrollIntoView: (options) => {
        cardRef.current?.scrollIntoView(options || { behavior: 'smooth', block: 'center' });
      },
    }));

    return (
      <article
        ref={cardRef}
        className={`
          relative
          mx-auto
          mb-8
          w-full
          max-w-md
          bg-white 
          dark:bg-gray-900/80 
          rounded-2xl 
          shadow-lg 
          dark:shadow-[0_0_20px_rgba(0,255,255,0.1)] 
          overflow-hidden 
          group 
          hover:shadow-2xl 
          dark:hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] 
          transition-all 
          duration-300 
          hover:-translate-y-2 
          border 
          border-gray-200 
          dark:border-gray-700/50 
          hover:border-purple-300/50 
          dark:hover:border-purple-500/50
        `}
        data-no-animation-mobile
        style={{ contentVisibility: 'auto' }}
      >
        {/* Conic gradient border halo */}
        <div
          className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
          style={{
            background: 'conic-gradient(from var(--ang,0deg), #3b82f6, #a855f7, #ec4899, #3b82f6)',
            filter: 'blur(14px)',
            animation: 'productSpin 6s linear infinite',
          }}
        />
        <style>{`
          @keyframes productSpin { to { --ang: 360deg; } }
          @property --ang { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
        `}</style>

        {/* Inner wrapper */}
        <div className="relative z-10 bg-white/95 dark:bg-gray-900/90 rounded-2xl p-6 flex flex-col h-full select-text">
          {/* Header row: Status badges */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2 items-center">
              <span className="inline-flex items-center justify-center h-6 px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 rounded-full leading-none">
                {product.status}
              </span>
              <span className="inline-flex items-center justify-center h-6 px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800/40 rounded-full leading-none">
                FREE
              </span>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {product.edition}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-2xl font-bold mb-1 leading-tight flex items-center gap-1.5">
            <span className="shrink-0 text-xl" style={{ textShadow: 'none' }}>🇮🇳</span>
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-transparent bg-clip-text dark:from-blue-400 dark:to-purple-400">
              {product.name.replace('🇮🇳 ', '')}
            </span>
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse shrink-0" />
          </h3>

          {/* Version */}
          <div className="text-xs font-mono font-semibold text-purple-600 dark:text-purple-400 mb-3">
            Version {product.version} · Released {product.releasedDate}
          </div>

          {/* Meta tags list for visual weight */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-medium text-gray-600 dark:text-gray-400 border-t border-b border-gray-100 dark:border-gray-800/60 py-3">
            <div className="flex items-center gap-1.5">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="truncate">Community Tool</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>📅</span>
              <span className="truncate">2026 Tax Season</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>💼</span>
              <span className="truncate">Finance Category</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🚀</span>
              <span className="truncate"> AI Product</span>
            </div>
          </div>

          {/* Small description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed flex-1">
            {product.description}
          </p>

          {/* CTA: Explore Product */}
          <button
            ref={buttonRef}
            onClick={() => onLearnMore(product)}
            className="relative w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white overflow-hidden group/btn shadow-md hover:shadow-[0_8px_24px_-6px_rgba(168,85,247,0.5)] transition-all duration-300 cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)',
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="relative z-10 flex items-center gap-2">
              Explore Product
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </span>
          </button>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = 'ProductCard';
