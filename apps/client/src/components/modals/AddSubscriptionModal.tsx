import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  ModalOverlay,
} from "@chakra-ui/react";
import { SubscriptionFormValues } from "../forms/schemas";
import { SubscriptionForm } from "../forms/SubscriptionForm";
import { useCreateSubscription } from "../../hooks/queries/useCreateSubscription";
import { useEffect } from "react";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
  userId: string;
}

const AddSubscriptionModal = ({
  isOpen,
  onClose,
  onCreated,
  userId,
}: AddSubscriptionModalProps) => {
  const toast = useToast();
  const {
    createSubscription,
    loading,
    error,
    isSuccess,
    setError,
    setIsSuccess,
  } = useCreateSubscription();

  const handleSubmit = async (values: SubscriptionFormValues) => {
    const nextPayment = new Date(values.nextPayment).toISOString();
    createSubscription({
      ...values,
      price: Number(values.price),
      userId: userId,
      nextPayment,
    });
  };

  const handleClose = () => {
    onClose();
    if (error) {
      toast.closeAll();
    }
    setError(null);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setError(null);
    }
  }, [error, toast]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Subscription added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      handleClose();
      onCreated();
    }
  }, [isSuccess, toast]);

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size="sm"
    >
      <ModalOverlay bg="rgba(42, 29, 78, 0.8)" backdropFilter="blur(10px)" />
      <ModalContent bg="#2A1D4E" color="white">
        <ModalHeader>Add Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SubscriptionForm isSubmitting={loading} onSubmit={handleSubmit} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSubscriptionModal;
