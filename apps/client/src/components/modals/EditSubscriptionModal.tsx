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
import { useEffect } from "react";
import { Subscription } from "../../hooks/queries/useFetchSubscriptions";
import { useEditSubscription } from "../../hooks/queries/useEditSubscription";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: Subscription | null;
  onEdited: () => void;
}

export const EditSubscriptionModal = ({
  isOpen,
  onClose,
  subscription,
  onEdited,
}: AddSubscriptionModalProps) => {
  const toast = useToast();
  const {
    editSubscription,
    loading,
    error,
    isSuccess,
    setError,
    setIsSuccess,
  } = useEditSubscription();

  const handleSubmit = async (values: SubscriptionFormValues) => {
    console.log("values", values);
    const nextPayment = new Date(values.nextPayment).toISOString();
    editSubscription({
      id: subscription?.id,
      name: values.name,
      price: Number(values.price),
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
  }, [error, onEdited, toast]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Subscription edited successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      handleClose();
      onEdited();
    }
  }, [handleClose, isSuccess, onEdited, toast]);

  if (!subscription) {
    return null;
  }

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={handleClose}
      isCentered
      size="sm"
    >
      <ModalOverlay bg="transparent" backdropFilter="blur(10px)" />
      <ModalContent bg="#2A1D4E" color="white">
        <ModalHeader>Edit Subscription</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SubscriptionForm
            subscription={subscription}
            isSubmitting={loading}
            onSubmit={handleSubmit}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
