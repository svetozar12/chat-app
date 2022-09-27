import React from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Loading from "../../Loading";
import { Button, GridItem, HStack, SimpleGrid } from "@chakra-ui/react";
import useThemeColors from "hooks/useThemeColors";

const QuickLogin_Modal = ({ quickLogin }: { quickLogin: () => Promise<boolean> }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    colors: { chat_bg, form_button },
  } = useThemeColors();

  return (
    <HStack w="full" h="100vh" alignItems="center" justifyContent="center" zIndex="200" pos="absolute" top={0}>
      <SimpleGrid
        gap={4}
        placeItems="center"
        columns={2}
        w={{ base: "95%", md: "80%", lg: "50%", xl: "30%" }}
        bg={chat_bg}
        h="40%"
        p={4}
        boxShadow="default"
      >
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Button
            colorScheme={form_button}
            w="full"
            isLoading={isLoading}
            spinner={<Loading />}
            onClick={async () => {
              setIsLoading(await quickLogin());
            }}
          >
            Click me to Quick login
          </Button>
        </GridItem>
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Link href="/" passHref>
            <Button colorScheme={form_button} w="full" onClick={() => dispatch({ type: "QUICK_LOGIN", payload: false })}>
              Sign up
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </HStack>
  );
};

export default QuickLogin_Modal;
