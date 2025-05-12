import { Box } from "@chakra-ui/react";
import useCreateUserData from "./hooks/queries/useCreateUserData";
import { useTelegramInitials } from "./hooks/useTelegramInitials";
import { WelcomePage } from "./pages/WelcomePage";
import ErrorPage from "./pages/ErrorPage";
import { SubscriptionsPage } from "./pages/SubscriptionsPage";
import { useState, useEffect } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const App = () => {
  const telegramInitials = useTelegramInitials();
  const { result, loading, error } = useCreateUserData(telegramInitials);

  const [showWelcomePage, setShowWelcomePage] = useState(true);
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePage(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (error && !loading) {
    return <ErrorPage onRetry={() => window.location.reload()} />;
  }

  return (
    <Box
      bg="#1C1036"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={6}
    >
      {isExploding && (
        <Box
          position="absolute"
          top="65%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <ConfettiExplosion duration={3000} />
        </Box>
      )}
      {showWelcomePage ? (
        <WelcomePage />
      ) : (
        <SubscriptionsPage
          setIsExploding={setIsExploding}
          userId={result?.id}
        />
      )}
    </Box>
  );
};

export default App;
