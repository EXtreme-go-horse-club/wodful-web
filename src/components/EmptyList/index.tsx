import { Box, Button, Link, Text } from '@chakra-ui/react';
import { FolderPlus } from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';

interface EmptyListProps {
  text: string;
  linkTo?: string;
  textLinkTo?: string;
  contentButton?: string;
  onClose?: () => void;
}

export const EmptyList = ({ contentButton, onClose, text, linkTo, textLinkTo }: EmptyListProps) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' gap='8px' mt='20%'>
      <FolderPlus size={50} opacity='80%' />
      <Text>{text}</Text>
      {contentButton && (
        <Button width='100%' colorScheme='teal' onClick={onClose}>
          {contentButton}
        </Button>
      )}

      {linkTo && (
        <Link as={RouterLink} color='teal.500' to={linkTo as string}>
          {textLinkTo}
        </Link>
      )}
    </Box>
  );
};
