import React from 'react';

export interface IBaseComponent<ChakraPropsType> {
  style?: React.CSSProperties;
  baseProps?: React.ComponentPropsWithRef<any>;
  chakraProps?: ChakraPropsType;
}
