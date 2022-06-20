import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

interface IUpdateInfo {
  children: JSX.Element | JSX.Element[];
}

const UpdateInfo = ({ children }: IUpdateInfo) => {
  return (
    <SimpleGrid columns={3} w="80%">
      {children}
    </SimpleGrid>
  );
};

export default UpdateInfo;
