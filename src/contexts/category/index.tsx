import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ICategory, ICategoryDTO } from '@/data/interfaces/category';
import { CategoryService } from '@/services/Category';
import { createContext, useCallback, useState } from 'react';

interface CategoryProviderProps {
  children: React.ReactNode;
}

export interface CategoryContextData {
  categories: ICategory[];
  isLoading: boolean;
  isError: boolean;
  List: (id: string) => Promise<void>;
  Create: ({ championshipId, description, members, name }: ICategoryDTO) => Promise<void>;
}

const CategoryContext = createContext({} as CategoryContextData);

const axios = new AxiosAdapter();

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const Create = useCallback(
    async ({ championshipId, name, description, members }: ICategoryDTO) => {
      setIsLoading(true);
      await new CategoryService(axios)
        .create({ championshipId, description, members, name })
        .then((newCategory: ICategory) => {
          setCategories([...categories, newCategory]);
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new CategoryService(axios)
      .listAll(id)
      .then((allCategories) => {
        setCategories(allCategories);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, isLoading, isError, Create, List }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
