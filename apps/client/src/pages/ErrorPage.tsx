import { Button, Heading, Text, VStack, Image, Box } from "@chakra-ui/react";
import { FC } from "react";
import PinglifyLogo from "../assets/pinglify-logo.png";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorPage: FC<ErrorPageProps> = ({
  message = "Something went wrong.",
  onRetry,
}) => {
  return (
    <Box
      bg="#1C1036"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      <VStack>
        <Image
          src={PinglifyLogo}
          alt="Pinglify Logo"
          boxSize="80px"
          opacity={0.8}
          width={100}
          height={100}
        />
        <Heading color="white" size="lg" textAlign="center">
          Oops!
        </Heading>
        <Text color="gray.300" fontSize="md" textAlign="center" maxW="300px">
          {message}
        </Text>
        {onRetry && (
          <Button onClick={onRetry} colorScheme="purple" size="md">
            Try Again
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default ErrorPage;
