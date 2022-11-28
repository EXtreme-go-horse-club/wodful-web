import { Flex, Spinner, Text } from '@chakra-ui/react';

interface LoaderProps {
  title: string;
  description?: string;
}

const Loader = ({ title, description }: LoaderProps) => (
  <Flex
    h='100%'
    w='100%'
    position='fixed'
    top='0px'
    left='0px'
    bg='rgba(255,255,255,0.9)'
    zIndex='1000'
    align='center'
    justify='center'
    flexDirection='column'
  >
    <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
    <Text fontWeight='bold'>{title} </Text>
    {description && <Text>{description} </Text>}
  </Flex>
);

export { Loader };
