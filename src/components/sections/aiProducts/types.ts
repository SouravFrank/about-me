import { AIProduct } from '../../../data/aiProducts';

export interface ProductCardProps {
  product: AIProduct;
  onLearnMore: (product: AIProduct) => void;
}

export interface ProductModalProps {
  product: AIProduct;
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
  initialSource: 'click' | 'deep_link';
}
