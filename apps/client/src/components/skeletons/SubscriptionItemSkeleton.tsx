import { Box, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

export const SubscriptionItemSkeleton = () => {
  return (
    <Box
      bg="#2A1D4E"
      borderRadius="xl"
      p={4}
      w="330px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      boxShadow="md"
    >
      <Flex justify="space-between" w="100%">
        <Flex align="flex-start" minWidth="190px">
          <SkeletonCircle size="10" />
          <Box ml={3}>
            <Skeleton height="16px" width="80px" mb={2} />
            <Skeleton height="14px" width="60px" mb={1} />
            <Skeleton height="14px" width="100px" />
          </Box>
        </Flex>

        <Flex align="center" gap={2} ml={3}>
          <Skeleton height="32px" width="32px" borderRadius="md" />
          <Skeleton height="32px" width="32px" borderRadius="md" />
        </Flex>
      </Flex>
    </Box>
  );
};
