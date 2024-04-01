import { Tag as CTag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';

interface TagProps {
  label: string;
  onRemove: () => void;
}

const Tag: React.FC<TagProps> = ({ label, onRemove }) => {
  return (
    <CTag size={'md'} key={label} borderRadius='full' variant='solid' colorScheme='blackAlpha'>
      <TagLabel>{label.toUpperCase()}</TagLabel>
      <TagCloseButton onClick={onRemove} />
    </CTag>
  );
};

export default Tag;
