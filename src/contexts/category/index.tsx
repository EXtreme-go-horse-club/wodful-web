import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ICategory, ICategoryDTO } from '@/data/interfaces/category';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { CategoryService } from '@/services/Category';
import { categoryMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';

interface CategoryProviderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface CategoryContextData {
  categories: ICategory[];
  categoriesPages: IPageResponse<ICategory>;
  isLoading: boolean;
  isError: boolean;
  List: (id: string) => Promise<void>;
  ListAll: (id: string) => Promise<void>;
  Create: ({ championshipId, description, members, name }: ICategoryDTO) => Promise<void>;
}

const CategoryContext = createContext({} as CategoryContextData);

const axios = new AxiosAdapter();

export const CategoryProvider = ({ children, onClose }: CategoryProviderProps) => {
  const toast = useToast();
  //adicionar novo estado para separar categoria paginada e listagem da
  const [categoriesPages, setCategoriesPages] = useState<IPageResponse<ICategory>>(
    {} as IPageResponse<ICategory>,
  );
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const Create = useCallback(
    async ({ championshipId, name, description, members }: ICategoryDTO) => {
      setIsLoading(true);
      await new CategoryService(axios)
        .create({ championshipId, description, members, name })
        .then((newCategory: ICategory) => {
          toast({
            title: categoryMessages['success'],
            status: 'success',
            isClosable: true,
          });
          // setCategories((categories) => [...categories, newCategory]);
          // let results = categories.results.push(newCategory)
          setCategories((categories) => ({
            results: [...categories.results, newCategory],
          }));

          // setCategories({
          //   results: [...categories.results, newCategory]
          // });

          // setCategories((categories) => results: [...categories.results, newCategory]);
          onClose!();
        })
        .catch(() => {
          toast({
            title: categoryMessages['error'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [],
  );
  const ListAll = useCallback(async (id: string) => {
    setIsLoading(true);
    await new CategoryService(axios)
      .listAll(id)
      .then((allCategories: ICategory[]) => {
        setCategories(allCategories);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new CategoryService(axios)
      .listAll(id)
      .then((allCategories: IPageResponse<ICategory>) => {
        setCategoriesPages(allCategories);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <CategoryContext.Provider
      value={{ categories, categoriesPages, isLoading, isError, Create, List, ListAll }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
