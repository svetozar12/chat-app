import { Button } from '@chat-app/button';
import { Typography } from '@chat-app/typography';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
const oauthProviderList = { google: 'google' } as const;
const Auth = () => {
  const oauthProviders = [{ name: oauthProviderList.google, Icon: FcGoogle }];
  return (
    <div>
      {oauthProviders.map(({ name, Icon }) => {
        return (
          <Typography>
            <Button className="flex justify-center items-center">
              Login with {name}
              <Icon size={25} />
            </Button>
          </Typography>
        );
      })}
    </div>
  );
};

export default Auth;
