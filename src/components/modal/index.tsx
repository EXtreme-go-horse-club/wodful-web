import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

interface CreateChampionshipProps {
  isOpen: boolean;
  modalHeader: string;
  children: React.ReactNode;
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
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ComponentModal;
