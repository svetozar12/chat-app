// eslint-disable-next-line import/named
import { Center, CenterProps, Link as AnchorLink } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/dist/client/link';
import { IBaseComponent } from 'services/chat-ui/types';

type Base = IBaseComponent<CenterProps>;
interface IDefaultLink extends Base {
  text: string;
  href: string;
}

function DefaultLink(props: IDefaultLink) {
  const { href, text, baseProps, chakraProps, style } = props;
  return (
    <Center w="full" {...chakraProps} {...style} {...baseProps}>
      <Link href={href}>
        <AnchorLink textAlign="center" w="full" color="blue.500" fontWeight="bold" href="#">
          {text}
        </AnchorLink>
      </Link>
    </Center>
  );
}

export default DefaultLink;
