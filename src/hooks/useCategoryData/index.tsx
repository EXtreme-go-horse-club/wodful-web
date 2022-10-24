import CategoryContext, { CategoryContextData } from '@/contexts/category';
import { useContext } from 'react';

const useCategoryData = (): CategoryContextData => {
  const context = useContext<CategoryContextData>(CategoryContext);

  return context;
};

export default useCategoryData;
