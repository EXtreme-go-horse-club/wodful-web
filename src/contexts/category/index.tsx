import { AxiosAdapter } from '@/adapters/AxiosAdapter';
import { ICategory, ICategoryDTO, IPublicCategory } from '@/data/interfaces/category';
import { IPageResponse } from '@/data/interfaces/pageResponse';
import { CategoryService } from '@/services/Category';
import { PublicCategoryService } from '@/services/Public/Category';
import { categoryMessages } from '@/utils/messages';
import { useToast } from '@chakra-ui/react';
import { createContext, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';

interface CategoryProviderProps {
  children: React.ReactNode;
  onClose?: () => void;
}

export interface CategoryContextData {
  categories: ICategory[];
  categoriesPages: IPageResponse<ICategory>;
  publicCategories: IPublicCategory[];
  isLoading: boolean;
  isError: boolean;
  limit: number;
  setLimit: (value: number) => void;
  page: number;
  setPage: (value: number) => void;
  Delete: (id: string) => Promise<void>;
  PublicList: (code: string) => Promise<void>;
  List: (id: string) => Promise<void>;
  ListPaginated: (id: string) => Promise<void>;
  Create: ({ championshipId, description, members, name }: ICategoryDTO) => Promise<void>;
}

const CategoryContext = createContext({} as CategoryContextData);

const axios = new AxiosAdapter();

export const CategoryProvider = ({ children, onClose }: CategoryProviderProps) => {
  const { id } = useParams();
  const toast = useToast();
  const [categoriesPages, setCategoriesPages] = useState<IPageResponse<ICategory>>(
    {} as IPageResponse<ICategory>,
  );
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [categories, setCategories] = useState<ICategory[]>([] as ICategory[]);
  const [publicCategories, setPublicCategories] = useState<IPublicCategory[]>(
    [] as IPublicCategory[],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError] = useState<boolean>(false);

  const List = useCallback(async (id: string) => {
    setIsLoading(true);
    await new CategoryService(axios)
      .listAll(id)
      .then((categories) => {
        setCategories(categories as ICategory[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const PublicList = useCallback(async (code: string) => {
    setIsLoading(true);
    await new PublicCategoryService(axios)
      .list(code)
      .then((categories) => {
        setPublicCategories(categories as IPublicCategory[]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const ListPaginated = useCallback(
    async (id: string) => {
      setIsLoading(true);
      await new CategoryService(axios)
        .listAll(id, limit, page)
        .then((paginatedCategories) => {
          setCategoriesPages(paginatedCategories as IPageResponse<ICategory>);
        })
        .finally(() => setIsLoading(false));
    },
    [limit, page],
  );

  const Create = useCallback(
    async ({ championshipId, name, description, members }: ICategoryDTO) => {
      setIsLoading(true);
      await new CategoryService(axios)
        .create({ championshipId, description, members, name })
        .then(() => {
          toast({
            title: categoryMessages['success'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(championshipId);
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
    [toast, ListPaginated, onClose],
  );

  const Delete = useCallback(
    async (idCat: string) => {
      setIsLoading(true);
      await new CategoryService(axios)
        .delete(idCat)
        .then(() => {
          toast({
            title: categoryMessages['remove'],
            status: 'success',
            isClosable: true,
          });
          ListPaginated(String(id));
        })
        .catch(() => {
          toast({
            title: categoryMessages['remove_err'],
            status: 'error',
            isClosable: true,
          });
        })
        .finally(() => setIsLoading(false));
    },
    [ListPaginated, id, toast],
  );

  return (
    <CategoryContext.Provider
      value={{
        categories,
        categoriesPages,
        isLoading,
        isError,
        limit,
        page,
        Delete,
        publicCategories,
        PublicList,
        setLimit,
        setPage,
        Create,
        List,
        ListPaginated,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContext;
