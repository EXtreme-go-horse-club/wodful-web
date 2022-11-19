import { Loader } from '@/components/Loader';
import { CategoryProvider } from '@/contexts/category';
import { LeaderboardProvider } from '@/contexts/leaderboard';
import useCategoryData from '@/hooks/useCategoryData';
import useLeaderboardData from '@/hooks/useLeaderboardData';
import { Box, Center, Flex, HStack, Select, Text } from '@chakra-ui/react';
import { Suspense, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ListPublicLeaderboard from './components';
import { ValidateAccess } from './helper/ValidateAccess';

const PublicLeaderboard = () => {
  return (
    <LeaderboardProvider>
      <CategoryProvider>
        <PublicLeaderboardAccess />
      </CategoryProvider>
    </LeaderboardProvider>
  );
};

const PublicLeaderboardAccess = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { PublicList, publicCategories } = useCategoryData();
  const { ListPublic } = useLeaderboardData();
  const [selectedCategory, setSelectedCategory] = useState<string>('Sem categoria');

  useEffect(() => {
    if (code) PublicList(code);
  }, [PublicList, code]);

  useEffect(() => {
    ValidateAccess.verify(code as string, navigate);
  }, [code, navigate]);
  return (
    <Suspense fallback={<Loader title='Carregando ...' />}>
      <Center as='main' role='main'>
        <Box
          w='100%'
          maxW='1280px'
          display='flex'
          flexDirection='column'
          alignItems='center'
          as='section'
          px={10}
        >
          <HStack as='section' role='textbox' w='100%' mt={4} justifyContent='space-between'>
            <Flex as='article' role='textbox' direction='column' gap='0.75rem'>
              <Text fontSize='2xl' as='b' role='heading'>
                Leaderboard
              </Text>
              <Text
                as='b'
                role='textbox'
                fontSize='0.75rem'
                color='gray.500'
                border='1px'
                borderColor='gray.500'
                borderRadius='4px'
                padding='2px 8px'
                textTransform='capitalize'
              >
                Categoria: {selectedCategory}
              </Text>
            </Flex>
            <Flex as='article' gap='1rem'>
              <Select
                as='select'
                id='category'
                placeholder='Selecione a categoria'
                onChange={(event) => {
                  if (event.target.value) {
                    ListPublic(String(event.target.value));
                    setSelectedCategory(
                      publicCategories.find((selected) => selected.id === event.target.value)!.name,
                    );
                  }
                }}
              >
                {publicCategories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </Flex>
          </HStack>
          <Box as='section' w='100%' maxW='1280px' marginTop={6}>
            <ListPublicLeaderboard />
          </Box>
        </Box>
      </Center>
    </Suspense>
  );
};

export default PublicLeaderboard;
