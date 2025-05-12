import { Box, Fade, Image, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PinglifyLogo from "../assets/pinglify-logo.png";

const ringAnimation = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-15deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(15deg); }
  100% { transform: rotate(0deg); }
`;

export const WelcomePage = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade
      in={visible}
      unmountOnExit
      transition={{ enter: { duration: 1.5 }, exit: { duration: 0.8 } }}
    >
      <Box
        bg="#1C1036"
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={999}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src={PinglifyLogo}
          alt="Pinglify"
          boxSize="80px"
          width={100}
          height={100}
          animation={`${ringAnimation} .3s ease-in-out 1s`}
        />
      </Box>
    </Fade>
  );
};
