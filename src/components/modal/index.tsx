import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface CreateChampionshipProps {
  modalHeader: string;
  isOpen: boolean;
  children: any;
  size: 'sm' | 'md' | 'lg' | 'xl';
  onClose: () => void;
}

const ComponentModal = ({
  isOpen,
  onClose,
  children,
  size,
  modalHeader,
}: CreateChampionshipProps) => {
  return (
    <>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader> {modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <HStack pt={4} w='100%' align='start' justify='space-between'>
              <Heading as='h4' size='md'>
                {modalTitle}
              </Heading>

              <X onClick={onClose} cursor='pointer' size={18} />
            </HStack> */}
            {children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComponentModal;
