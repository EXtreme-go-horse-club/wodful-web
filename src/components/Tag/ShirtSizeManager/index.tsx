import { Button, FormControl, FormLabel, HStack, Input, Stack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Plus } from 'react-feather';
import Tag from '..';

interface IShirtSizeManager {
  sizes: string[];
  setSizes: (sizes: string[]) => void;
}

const ShirtSizeManager = ({ sizes, setSizes }: IShirtSizeManager) => {
  const [size, setSize] = useState('');

  const addSize = () => {
    if (size && !sizes.includes(size)) {
      setSizes([...sizes, size]);
      setSize('');
    }
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  return (
    <VStack align='start' w='100%'>
      <HStack width='100%' align={'end'}>
        <FormControl alignItems='center' justifyContent={'end'}>
          <FormLabel mb={2}>Tamanhos</FormLabel>
          <Input
            w={'100%'}
            type='text'
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder='Adicione um tamanho'
          />
        </FormControl>
        <Button disabled={size === ''} colorScheme='teal' type='button' onClick={addSize}>
          <Plus />
        </Button>
      </HStack>

      <Stack flexWrap={'wrap'} direction={['row']} gap={'8px'} mt='1.0rem !important' w={'100%'}>
        {sizes.map((s, index) => (
          <Tag key={index} label={s} onRemove={() => removeSize(index)} />
        ))}
      </Stack>
    </VStack>
  );
};

export default ShirtSizeManager;
