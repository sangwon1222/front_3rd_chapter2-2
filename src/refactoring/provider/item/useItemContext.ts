import { useContext } from 'react';
import { ItemContext } from './Context';

export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (!context) throw new Error('useItem must be used within a ItemProvider');
  return context;
};
