import { Center, Link as AnchorLink } from "@chakra-ui/react";
import React from "react";
import Link from "next/dist/client/link";

interface IDefaultLink {
  text: string;
  href: string;
}

const DefaultLink = ({ text, href }: IDefaultLink) => {
  return (
    <Center w="full">
      <Link href={href}>
        <AnchorLink textAlign="center" w="full" color="blue.500" fontWeight="bold" href="#">
          {text}
        </AnchorLink>
      </Link>
    </Center>
  );
};

export default DefaultLink;
