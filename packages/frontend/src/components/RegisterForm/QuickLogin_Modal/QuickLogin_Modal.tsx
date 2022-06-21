import React from "react";
import { css, cx } from "@emotion/css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import Loading from "../../Loading";
import { Button, GridItem, HStack, SimpleGrid, Spacer } from "@chakra-ui/react";
import { useAuth } from "../../../utils/SessionProvider";

const QuickLogin_Modal = ({ quickLogin }: { quickLogin: () => Promise<boolean> }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <HStack w="full" h="100vh" alignItems="center" justifyContent="center" zIndex="200" pos="absolute" top={0}>
      <SimpleGrid
        gap={4}
        placeItems="center"
        columns={2}
        w={{ base: "95%", md: "80%", lg: "50%", xl: "30%" }}
        bg="white"
        h="40%"
        p={4}
        boxShadow="default"
      >
        <GridItem w="full" colSpan={{ base: 2, md: 1 }}>
          <Button
            colorScheme="blue"
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
            <Button colorScheme="blue" w="full" onClick={() => dispatch({ type: "QUICK_LOGIN", payload: false })}>
              Sign up
            </Button>
          </Link>
        </GridItem>
      </SimpleGrid>
    </HStack>
  );
};

export default QuickLogin_Modal;
