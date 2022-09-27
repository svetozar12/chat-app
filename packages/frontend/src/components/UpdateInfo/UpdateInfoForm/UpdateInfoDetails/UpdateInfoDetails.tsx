import { Flex, FormLabel, VStack } from '@chakra-ui/react';
import React from 'react';
import { GrEdit } from 'react-icons/gr';
import { SingleAvatar } from 'services/chat-ui';

interface IUpdateInfoDetails {
  image: string;
}

function UpdateInfoDetails({ image }: IUpdateInfoDetails) {
  return (
    <>
      <FormLabel textAlign={{ base: 'start', lg: 'center' }} fontWeight="bold" fontSize="xl" mt={1}>
        Profile Avatar
      </FormLabel>
      <VStack align={{ base: 'flex-start', lg: 'center' }} pos="relative">
        <SingleAvatar width="10rem" height="10rem" preview={image} />
        <FormLabel
          w="10rem"
          h="10rem"
          justifyContent="center"
          alignItems="center"
          cursor="pointer"
          pos="absolute"
          top={0}
          transition="0.2s"
          borderRadius="100%"
          border="none"
          _hover={{ opacity: '0.8' }}
          htmlFor="file"
        >
          <Flex
            pos="absolute"
            left={0}
            bottom={0}
            gap={2}
            color="black"
            bg="white"
            justify="center"
            align="center"
            boxShadow="lg"
            px={2}
            py={1}
            borderRadius="5px"
            w="auto"
          >
            <GrEdit />
            Edit
          </Flex>
        </FormLabel>
      </VStack>
    </>
  );
}

export default UpdateInfoDetails;
