import { VStack, Image, Text, Button, Fade } from "@chakra-ui/react";
import React from "react";
import PinglifyLogo from "../assets/pinglify-logo.png";

interface EmptyListProps {
  onAddClick: () => void;
}

const EmptyList: React.FC<EmptyListProps> = ({ onAddClick }) => {
  return (
    <Fade in transition={{ enter: { duration: 1.5 }, exit: { duration: 0.8 } }}>
      <VStack spacing={6} textAlign="center">
        <Image
          src={PinglifyLogo}
          alt="Logo"
          boxSize="100px"
          width={100}
          height={100}
          opacity={0.8}
        />

        <Text fontSize="xl" fontWeight="bold" color="white">
          No subscriptions yet
        </Text>

        <Text fontSize="md" color="gray.300" maxW="260px">
          Start tracking your subscriptions and get payment reminders.
        </Text>

        <Button
          onClick={onAddClick}
          colorScheme="purple"
          size="lg"
          px={8}
          rounded="lg"
          fontWeight="semibold"
        >
          Add your first subscription
        </Button>
      </VStack>
    </Fade>
  );
};

export default EmptyList;
