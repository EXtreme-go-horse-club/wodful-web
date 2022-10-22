import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';

interface CreateChampionshipProps {
  isOpen: boolean;
  children: any;
  size: 'sm' | 'md' | 'lg' | 'xl';
  onClose: () => void;
}

const ComponentModal = ({ isOpen, onClose, children, size }: CreateChampionshipProps) => {
  return (
    <>
      <Modal size={size} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComponentModal;
