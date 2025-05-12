import { Avatar, Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Subscription } from "../hooks/queries/useFetchSubscriptions";
import { format } from "date-fns";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface Props {
  subscription: Subscription;
  onDeleteSubscription: (target: Subscription) => () => void;
  onEditSubscription: (target: Subscription) => () => void;
}

const getCompanyLogo = (companyName: string): string => {
  const formattedName = companyName.toLowerCase().replace(/\s+/g, "-");
  return `https://logo.clearbit.com/${formattedName}.com`;
};

export const SubscriptionItem = ({
  subscription,
  onDeleteSubscription,
  onEditSubscription,
}: Props) => {
  const { name, price, nextPayment } = subscription;

  const formattedNextPayment = nextPayment
    ? format(new Date(nextPayment), "MMM d")
    : "N/A";

  return (
    <Box
      bg="#2A1D4E"
      borderRadius="xl"
      p={4}
      w="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="md"
    >
      <Flex justifyItems="space-between" w="100%">
        <Flex align="center">
          <Avatar name={name} src={getCompanyLogo(name)} size="md" />
          <Flex
            direction="column"
            alignItems="start"
            justifyContent="start"
            ml={4}
          >
            <Heading size="sm" color="white">
              {name}
            </Heading>
            <Text fontSize="sm" color="gray.300">
              ${price} / month
            </Text>
            <Text fontSize="sm" color="gray.400">
              Next payment: {formattedNextPayment}
            </Text>
          </Flex>
        </Flex>

        <Flex align="center" ml={3}>
          <IconButton
            onClick={onEditSubscription(subscription)}
            size="md"
            variant="surface"
            aria-label="Edit"
            icon={<EditIcon />}
            rounded="full"
            color="gray.100"
            title="Edit subscription"
          />
          <IconButton
            onClick={onDeleteSubscription(subscription)}
            size="md"
            variant="surface"
            aria-label="Delete"
            icon={<DeleteIcon />}
            rounded="full"
            title="Delete subscription"
            color="red.400"
          />
        </Flex>
      </Flex>
    </Box>
  );
};
