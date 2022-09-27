import React from 'react';
import { Spinner } from '@chakra-ui/react';

function Loading({ size }: { size?: 'sm' | 'md' | 'lg' | 'xl' | 'xs' }) {
  return <Spinner thickness="2px" speed="0.80s" emptyColor="gray.200" color="blue.500" size={size || 'md'} />;
}

export default Loading;
