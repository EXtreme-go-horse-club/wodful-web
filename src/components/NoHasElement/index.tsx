import { Box, Button, Text } from '@chakra-ui/react';
import { FolderPlus } from 'react-feather';

interface NoHasElementProps {
  text: string;
  contentButton: string;
  onClose: () => void;
}

export const NoHasElement = ({ contentButton, onClose, text }: NoHasElementProps) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='8px' mt='20%'>
      <FolderPlus size={50} opacity='80%' />
      <Text>{text}</Text>
      <Button width='100%' colorScheme='teal' onClick={onClose}>
        {contentButton}
      </Button>
    </Box>
  );
};
