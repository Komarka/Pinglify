import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Fade,
  Flex,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  Subscription,
  useFetchSubscriptions,
} from "../hooks/queries/useFetchSubscriptions";
import ErrorPage from "./ErrorPage";
import EmptyList from "../components/EmptyList";
import AddSubscriptionModal from "../components/modals/AddSubscriptionModal";
import { SubscriptionItem } from "../components/SubscriptionItem";
import { SubscriptionItemSkeleton } from "../components/skeletons/SubscriptionItemSkeleton";
import { AddIcon } from "@chakra-ui/icons";
import { ConfirmationDialog } from "../components/modals/ConfirmationDialog";
import { useEffect, useState } from "react";
import { useDeleteSubscription } from "../hooks/queries/useDeleteSubscription";
import { EditSubscriptionModal } from "../components/modals/EditSubscriptionModal";

interface Props {
  userId?: string;
  setIsExploding: (isExploding: boolean) => void;
}

export const SubscriptionsPage = ({ userId, setIsExploding }: Props) => {
  const toast = useToast();
  const { data, loading, error, refetch } = useFetchSubscriptions(userId);
  const {
    isSuccess,
    loading: isLoadingDelete,
    error: errorDelete,
    deleteSubscription,
  } = useDeleteSubscription();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenedConfirmation,
    onOpen: onOpenConfirmation,
    onClose: onCloseConfirmation,
  } = useDisclosure();

  const {
    isOpen: isOpenedEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const [target, setTarget] = useState<Subscription | null>(null);

  const onDelete = (subscription: Subscription) => () => {
    setTarget(subscription);
    onOpenConfirmation();
  };

  const onEdit = (subscription: Subscription) => () => {
    setTarget(subscription);
    onOpenEdit();
  };

  const onEdited = () => {
    setTarget(null);
    refetch();
  };

  const onConfirm = () => {
    if (target) {
      deleteSubscription(target.id);
      setTarget(null);
    }
    onCloseConfirmation();
  };

  useEffect(() => {
    if (errorDelete) {
      toast({
        title: "Error",
        description: errorDelete,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [errorDelete, toast]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast({
        title: "Success",
        description: "Subscription deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess, toast]);

  if (loading || isLoadingDelete) {
    return (
      <Fade
        in
        transition={{ enter: { duration: 1.5 }, exit: { duration: 0.8 } }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Flex direction="column" alignItems="center" gap={5}>
            <SubscriptionItemSkeleton />
            <SubscriptionItemSkeleton />
            <SubscriptionItemSkeleton />
          </Flex>
        </Box>
      </Fade>
    );
  }

  if (error) {
    return (
      <Fade
        in
        transition={{ enter: { duration: 1.5 }, exit: { duration: 0.8 } }}
      >
        <ErrorPage onRetry={() => window.location.reload()} />
      </Fade>
    );
  }

  if (data && data.length === 0 && userId) {
    return (
      <>
        <EmptyList onAddClick={onOpen} />
        <AddSubscriptionModal
          onCreated={() => {
            setIsExploding(true);
            refetch();
          }}
          userId={userId}
          isOpen={isOpen}
          onClose={onClose}
        />
      </>
    );
  }

  return (
    <Fade in transition={{ enter: { duration: 1.5 }, exit: { duration: 0.8 } }}>
      <Box p={4} alignContent="center" textAlign="center" alignItems="center">
        <Flex direction="column" alignItems="center" gap={5}>
          {data?.map((subscription) => (
            <SubscriptionItem
              onEditSubscription={onEdit}
              onDeleteSubscription={onDelete}
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </Flex>
        <Box position="fixed" bottom="0" left="0" width="100%" zIndex="10">
          {data?.length === 3 ? (
            <Alert status="info">
              <AlertIcon />
              You can only add up to 3 subscriptions during the alpha version.
              Thank you for your understanding!
            </Alert>
          ) : (
            <Button
              colorScheme="purple"
              type="submit"
              width="100%"
              onClick={onOpen}
              isLoading={loading}
              leftIcon={<AddIcon />}
            >
              Add Subscription
            </Button>
          )}
        </Box>
      </Box>
      {userId && (
        <AddSubscriptionModal
          onCreated={() => {
            refetch();
          }}
          userId={userId}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
      <ConfirmationDialog
        isLoading={isLoadingDelete}
        isOpen={isOpenedConfirmation}
        onClose={onCloseConfirmation}
        onConfirm={onConfirm}
        title="Do you really want to delete this subscription?"
      />
      <EditSubscriptionModal
        onEdited={onEdited}
        onClose={onCloseEdit}
        isOpen={isOpenedEdit}
        subscription={target}
      />
    </Fade>
  );
};
