import React, { useEffect, useRef, useState } from 'react';
import { SectionWrapper } from '../../common';
import { ProductCard, ProductCardRef } from './ProductCard';
import { ProductModal } from './ProductModal';
import { aiProducts, AIProduct } from '../../../data/aiProducts';
import { sectionData } from '../../../data/sectionData';
import { trackEvent } from '../../../utils/analytics';

interface Props {
  isDark: boolean;
  isAppLoaded: boolean;
}

export const AIProductsSection: React.FC<Props> = ({ isDark, isAppLoaded }) => {
  const [selectedProduct, setSelectedProduct] = useState<AIProduct | null>(null);
  const [modalSource, setModalSource] = useState<'click' | 'deep_link'>('click');
  const cardRef = useRef<ProductCardRef>(null);

  // Handle deep linking check
  useEffect(() => {
    if (!isAppLoaded) return;

    const checkHashRoute = () => {
      const hash = window.location.hash;
      // Match "#product=itr-copilot"
      if (hash === '#product=itr-copilot') {
        const product = aiProducts.find((p) => p.id === 'itr-copilot');
        if (product) {
          // Scroll smoothly to card
          cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

          // Wait for scroll animation to complete, then open modal
          const scrollTimeout = setTimeout(() => {
            setModalSource('deep_link');
            setSelectedProduct(product);
          }, 800);

          return () => clearTimeout(scrollTimeout);
        }
      }
    };

    // Run on transition to loaded state
    checkHashRoute();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHashRoute);
    return () => window.removeEventListener('hashchange', checkHashRoute);
  }, [isAppLoaded]);

  const handleLearnMore = (product: AIProduct) => {
    trackEvent('product_card_click', {
      product_name: product.name,
      product_version: product.version,
    });
    setModalSource('click');
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);

    // Clean up hash query param if modal was deep-linked
    if (window.location.hash.includes('product=')) {
      window.history.replaceState(
        null,
        '',
        window.location.pathname + window.location.search + '#ai-products'
      );
    }
  };

  // Find the single Phase 1 product
  const singleProduct = aiProducts[0];

  return (
    <SectionWrapper
      isDark={isDark}
      titleBold={sectionData.aiProducts.titleBold}
      titleLight={sectionData.aiProducts.titleLight}
      description={sectionData.aiProducts.description}
    >
      <div className="max-w-7xl mx-auto px-4 py-6 select-text">
        {/* Render centered product card */}
        {singleProduct && (
          <div className="flex justify-center">
            <ProductCard
              ref={cardRef}
              product={singleProduct}
              onLearnMore={handleLearnMore}
            />
          </div>
        )}

        {/* Modal display */}
        {singleProduct && (
          <ProductModal
            product={singleProduct}
            isOpen={selectedProduct !== null}
            onClose={handleCloseModal}
            isDark={isDark}
            initialSource={modalSource}
          />
        )}
      </div>
    </SectionWrapper>
  );
};

export default AIProductsSection;
